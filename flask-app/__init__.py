import json
from flask import Flask, request
from elasticsearch import Elasticsearch
from query import Query


app = Flask(__name__)
es = Elasticsearch(host="es-container")

@app.route('/')
def defalt():
	return {'Hello World!': ['Hello World!', 'test', 'test2']}

@app.route('/recipes')
def recipes():
	return {"recipes": ["Welcome to the recipes endpoint!", "test", "test2"]}

@app.route('/home')
def home():
	return {'Home Endpoint': ['Welcome to the home endpoint!', 'test', 'test2']}

@app.route('/search', methods=['POST'], strict_slashes=False)
def search():
	request_data = json.loads(request.data)
	userInputString = request_data['content']
	res = Query(userInputString)#[:-1])
	return {"results" : dict(res)}


if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000, debug=True)

