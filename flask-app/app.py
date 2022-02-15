#from urllib import request
from flask import Flask
from flask import request
import json
import pprint
from queryBuilder import QueryBuilder
from query import Query

	




app = Flask(__name__)


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
	res = Query(userInputString[:-1])
	return res

if __name__ == '__main__':
	app.run(debug=True)
	app.run(host='0.0.0.0', port=5000)