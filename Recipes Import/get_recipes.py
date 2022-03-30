import requests
from bs4 import BeautifulSoup
import json
import re
from elasticsearch import Elasticsearch
from globals import URLS, USERNAME, PASSWORD, INDEX


def format_document(soup):
    data = {
        "title": get_title(soup),
        "category": get_category(soup),
        "instructions": get_instructions(soup),
        "ingredients": get_ingredients(soup),
        "notes": get_notes(soup),
        "meta": get_meta(soup),
        "nutrition": get_nutrition(soup),
        "calories": get_calories(soup),
        "image": get_image_src(soup)
    }

    # debug
    print(data['title'])
    if data['image'] == "":
        print(f"No image available")
    else:
        print(f"{data['image']}")
    
    # serialize to json string
    json_data = json.dumps(data)

    return json_data


def get_title(soup):
    title = soup.find("h1", class_="headline heading-content elementFont__display")
    return title.text.strip()


def get_category(soup):
    category = soup.find_all("span", class_="breadcrumbs__title")
    return category[2].text.strip()


def get_author(soup):
    author = soup.find("span", class_="author-name authorName linkHoverStyle")

    if author is None or len(author) == 0:
        return ""
    else:
        return author.text.strip()


def get_meta(soup):
    div = soup.find_all("div", class_="recipe-meta-item")
    meta = {
        "prep": "",
        "cook": "",
        "additional": "",
        "total": "",
        "servings": "",
        "yield": ""
    }
    pattern = r"([A-Za-z]*: )"

    for item in div:
        result = re.split(pattern, item.text.strip())
        
        while "" in result:
            result.remove("")

        if "prep" in result[0]:
            meta["prep"] = result[1]
        elif "cook" in result[0]:
            meta["cook"] = result[1]
        elif "additional" in result[0]:
            meta["additional"] = result[1]
        elif "total" in result[0]:
            meta["total"] = result[1]
        elif "Servings" in result[0]:
            meta["servings"] = result[1]
        elif "Yield" in result[0]:
            meta["yield"] = result[1]

    return meta


def get_ingredients(soup):
    span = soup.find_all("span", class_="ingredients-item-name")
    ingredients = []

    for ingredient in span:
        ingredients.append(f"{ingredient.text.strip()}")

    return separate_ingredients(ingredients)


def get_instructions(soup):
    recipe_instructions = soup.find_all("li", class_="subcontainer instructions-section-item")
    return separate_directions(recipe_instructions)


def get_notes(soup):
    recipe_notes = soup.find_all("div", class_="recipe-note container")

    if recipe_notes is None or len(recipe_notes) == 0:
        return ""
    else:
        pattern = r"(['?A-Z a-z]*:    )"
        for note in recipe_notes:
            result = re.split(pattern, note.text.strip())
            while "" in result:
                result.remove("")
            return result[-1]


def get_calories(soup):
    calories = soup.find_all("div", class_="nutrition-top light-underline elementFont__subtitle")
    pattern = r"(\bCalories\b: )"

    for item in calories:
        result = re.split(pattern, item.text.strip())
        return result[-1]


def get_nutrition(soup):
    # nutrition info grabbed from dialog box
    div = soup.find_all("div", class_="nutrition-row")
    nutrition = {"protein": "", "carbs": "", "fiber": "", "sugar": "", "fat": "", "sodium": ""}
    pattern = r"([:]?  [ ]?)"

    for nutrient in div:
        result = re.split(pattern, nutrient.text.strip())

        while "" in result:
            result.remove("")

        # i hate this...
        if "protein" in result[0]:
            nutrition["protein"] = result[2]
        elif "carbohydrates" in result[0]:
            nutrition["carbs"] = result[2]
        elif "dietary fiber" in result[0]:
            nutrition["fiber"] = result[2]
        elif "sugar" in result[0]:
            nutrition["sugar"] = result[2]
        elif "fat" in result[0]:
            nutrition["fat"] = result[2]
        elif "sodium" in result[0]:
            nutrition["sodium"] = result[2]

    return nutrition


def separate_ingredients(ingredients_list):
    tmp = []
    ingredients_list = [sub.replace('\u2009', ' ') for sub in ingredients_list]

    # replace vulgar fraction chars with decimal equivalents
    for item in ingredients_list:
        item = item.replace('\u2009', ' ')  # 'small space'
        item = item.replace('\u00BD', '0.500')
        item = item.replace('\u00BC', '0.250')
        item = item.replace('\u00BE', '0.750')
        item = item.replace('\u2153', '0.333')
        item = item.replace('\u2154', '0.667')
        item = item.replace('\u2155', '0.200')
        item = item.replace('\u2156', '0.400')
        item = item.replace('\u2157', '0.600')
        item = item.replace('\u2158', '0.800')
        item = item.replace('\u2159', '0.167')
        item = item.replace('\u215A', '0.833')
        item = item.replace('\u215B', '0.125')
        item = item.replace('\u215C', '0.375')
        item = item.replace('\u215D', '0.625')
        item = item.replace('\u215E', '0.875')

        tmp.append(item)

    return tmp


def separate_directions(directions):
    directions_list = []
    pattern = r'(\bStep\b [0-9]?[0-9]   )'

    for direction in directions:
        result = re.split(pattern, direction.text.strip())
        while "" in result:
            result.remove("")
        directions_list.append(result[-1])

    return directions_list


def get_image_src(soup):
    # check for image in main container
    div = soup.find('div', class_="image-container")

    # some recipes display videos as primary focus in main container
    if div != None:
        # if primary focus is an image, use it
        src = div.div.img['src']
    else:
        # otherwise, thumbnails exist for those with videos, use that instead
        src = get_thumbnail_image(soup)
    
    return src


def get_thumbnail_image(soup):
    aside = soup.find('aside', attrs={'class': lambda e: e.startswith('recipe-tout-image') if e else False})
    return aside("img")[0]["src"]


def post_to_index(es):
    id_num = 10001

    for url in URLS:
        try:
            # request url
            resp = requests.get(url)
            
            # parse the html elements
            soup = BeautifulSoup(resp.content, "html.parser")
            
            # serialize to json
            data = format_document(soup)
            
            # put document in es cluster
            create_document(es, id_num, data)
            
        except Exception as err:
            print(err)

        id_num += 1


def authenticate_http():
    """
    Authenticate cluster access via http
    :return: authenticated elasticsearch instance
    """
    es = Elasticsearch(
        "http://localhost:9200",
        http_auth=(USERNAME, PASSWORD)
    )

    return es


def create_document(es, id_num, doc):
    res = es.index(index=INDEX, id=id_num, document=doc)

    # debug
    print(f"Document {id_num} was {res['result']} successfully\n\n")


if __name__ == '__main__':
    es = authenticate_http()
    post_to_index(es)
