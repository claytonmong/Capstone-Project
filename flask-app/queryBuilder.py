from elasticsearch import Elasticsearch
from globals import URLS, USERNAME, PASSWORD, INDEX
import pprint
import re


def QueryBuilder(ingredients):

	"""
	Builds a query for the given ingredients
	:param ingredients: string of ingredients (commma separated)
	:return: query
	"""
	regex = re.compile('[^A-Za-z ]+')
	ingredients = regex.sub('', ingredients)
	ingredients = ingredients.split()
	str = ""
	for i in ingredients:
		str += i + " "
	query = {
		"match": {
			"ingredients": {
				"query": str[:-1],
				"minimum_should_match": "60%",
			}
		}
	}	
			
	return query