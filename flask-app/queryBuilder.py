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
        # insert ingredients into query
        insert_items(query, "should", "ingredients", include_ingredients_list)
        insert_items(query, "must_not", "ingredients", not_include_ingredients_list)                
        return query
