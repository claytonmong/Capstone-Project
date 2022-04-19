# from flask import Flask, url_for, jsonify, request
import json
from flask import Flask, request
from elasticsearch import Elasticsearch
from datetime import datetime
from elasticsearch import Elasticsearch

# es = Elasticsearch([es_host])
# 510a3280f02a

es = Elasticsearch("http://elasticsearch:9200")
es_index = "index"
app = Flask(__name__)


# check if elasticsearch is up
@app.route('/info')
def api_info():
    return es.info()


# check elasticsearch cluster health
@app.route('/health')
def api_health():
    return es.cluster.health()


# home endpoint
@app.route('/')
def api_root():
    doc = {
        'author': 'kimchy',
        'text': 'Elasticsearch: cool. bonsai cool.',
        'timestamp': datetime.now(),
    }
    res = es.index(index=es_index, id=id, document=doc)
    print(res)
    es.indices.refresh(index=es_index)
    return res


@app.route('/search', methods=['POST'], strict_slashes=False)
def search():
	request_data = json.loads(request.data)
	userInputString = request_data['content']
	res = Query(userInputString)#[:-1])
	return {"results" : dict(res)}


def Query(userInput):
    # separate include_list and not_include_list by ';'
    two_list = userInput.split(";")
    include_list = two_list[0]
    not_include_list = two_list[1]
    q = QueryBuilder(include_list, not_include_list)
    res = es.search(index=es_index, query=q)
    
    for hit in res['hits']['hits']:
        print(hit)

    print("\n\nTHIS WAS YOUR QUERY:")
    print(q)

    return res


'''
Insert each content into its category
# include_type: "should", "must_not"
# category: "ingredients"
# content_list: ["egg","chicken"]
'''
def insert_items(query, include_type, category, content_list):
    for ingredient in content_list:
        if ingredient != '':    
            query["bool"][include_type].append({ "match": { category: ingredient } })


"""
Builds a query for the given ingredients
:param ingredients: string of ingredients (commma separated)
:return: query
"""               
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
    query = { "bool": { "should": [], "must_not": [] } }
    # insert ingredients into query
    insert_items(query, "should", "ingredients", include_ingredients_list)
    insert_items(query, "must_not", "ingredients", not_include_ingredients_list)                
    return query


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

