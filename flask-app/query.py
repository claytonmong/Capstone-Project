import requests
import json
import re
from elasticsearch import Elasticsearch
from globals import URLS, USERNAME, PASSWORD, INDEX
import pprint
from queryBuilder import QueryBuilder


def authenticate_http():
    """
    Authenticate cluster access via http
    :return: authenticated elasticsearch instance
    """
    es = Elasticsearch(
        http_auth=(USERNAME, PASSWORD)
    )

    return es


if __name__ == '__main__':

	userInputString = "eggs, vegetable oil, bananas cinnamon"



	es = authenticate_http()
	q = QueryBuilder(userInputString)
	res = es.search(index=INDEX, query=q, sort="_score")
	
	for hit in res['hits']['hits']:
		pprint.pprint(hit)
	print("\n\nTHIS WAS YOUR QUERY:")
	pprint.pprint(q)