from elasticsearch import Elasticsearch
from globals import URLS, USERNAME, PASSWORD, INDEX
#import pprint
import re

'''
Insert each content into its category
# include_type: "should", "must_not"
# category: "ingredients"
# content_list: ["egg","chicken"]
'''
def insert_items(query, include_type, category, content_list):
        for ingredient in content_list:
                if ingredient != '':    
                        query["bool"][include_type].append({
                                "match": {
                                        category: ingredient
                                }
                        })
"""
Builds a query for the given ingredients
:param ingredients: string of ingredients (commma separated)
:return: query
"""             

#list of meats
meats = ["chicken", "beef", "pork", "turkey", "veal", "lamb", "bacon", "ham", "sausage", "steak", "fish", "salmon", "tuna", "mackerel", "cod", "halibut", "lobster", "shrimp", "crab", "scallop", "octopus", "squid", "oyster", "clam", "mussel"]
meats_plural = [s + "s" for s in meats]
dairy = ["milk", "butter", "cheese", "yogurt", "cream", "whey", "casein", "custard"]
dairy_plural = [s + "s" for s in dairy]
vegetables = ["broccoli", "cabbage", "carrot", "cauliflower", "celery", "corn", "cucumber", "green bean", "lettuce", "mushroom", "onion", "pea", "potato", "radish", "spinach", "sweet potato", "tomato", "zucchini"]
vegetables_plural = [s + "s" for s in vegetables]
carbs = ["pasta", "bread", "spaghetti", "rice", "fettuccine", "potato", "sweet potato", "sugar"]
carbs_plural = [s + "s" for s in carbs]
def QueryBuilder(include_ingredients, not_include_ingredients):
        # remove special chars in ingredients except ',' and ' '
        include_ingredients_m = ''.join(char for char in include_ingredients if (char == ',' or char ==' ' or char.isalpha()))
        not_include_ingredients_m = ''.join(char for char in not_include_ingredients if (char == ',' or char ==' ' or char.isalpha()))
        # sparate ingredients by ','
        include_ingredients_list = include_ingredients_m.split(",")
        not_include_ingredients_list = not_include_ingredients_m.split(",")
        print(include_ingredients_list)
        print(not_include_ingredients_list)
        # create blank query
        query = {    
                "bool":{
                        "should": [
                                ],
                        "must_not": [
                                ]
                                
                        }
                        
                }
        if "meat" in (s.lower() for s in include_ingredients_list):
                # include_ingredients_list.remove("meat")
                # include_ingredients_list.remove("meats")
                include_ingredients_list.extend(meats)
                include_ingredients_list.extend(meats_plural)
        if "meat" in (s.lower() for s in not_include_ingredients_list):
                # not_include_ingredients_list.remove("meat")
                # not_include_ingredients_list.remove("meats")
                not_include_ingredients_list.extend(meats)
                not_include_ingredients_list.extend(meats_plural)
        if "dairy" in (s.lower() for s in include_ingredients_list):
                # include_ingredients_list.remove("dairy")
                # include_ingredients_list.remove("dairies")
                include_ingredients_list.extend(dairy)
                include_ingredients_list.extend(dairy_plural)
        if "dairy" in (s.lower() for s in not_include_ingredients_list):
                # not_include_ingredients_list.remove("dairy")
                # not_include_ingredients_list.remove("dairies")
                not_include_ingredients_list.extend(dairy)
                not_include_ingredients_list.extend(dairy_plural)
        if "vegetable" in (s.lower() for s in include_ingredients_list):
                # include_ingredients_list.remove("vegetable")
                # include_ingredients_list.remove("vegetables")
                include_ingredients_list.extend(vegetables)
                include_ingredients_list.extend(vegetables_plural)
        if "vegetable" in (s.lower() for s in not_include_ingredients_list):
                # not_include_ingredients_list.remove("vegetable")
                # not_include_ingredients_list.remove("vegetables")
                not_include_ingredients_list.extend(vegetables)
                not_include_ingredients_list.extend(vegetables_plural)
        if "carb" in (s.lower() for s in include_ingredients_list):
                # include_ingredients_list.remove("carb")
                # include_ingredients_list.remove("carbs")
                include_ingredients_list.extend(carbs)
                include_ingredients_list.extend(carbs_plural)
        if "carb" in (s.lower() for s in not_include_ingredients_list):
                # not_include_ingredients_list.remove("carb")
                # not_include_ingredients_list.remove("carbs")
                not_include_ingredients_list.extend(carbs)
                not_include_ingredients_list.extend(carbs_plural)
        # insert ingredients into query
        insert_items(query, "should", "ingredients", include_ingredients_list)
        insert_items(query, "must_not", "ingredients", not_include_ingredients_list)                
        return query
