import requests
import json
import re
from elasticsearch import Elasticsearch
from globals import URLS, USERNAME, PASSWORD, INDEX
import pprint


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
    # # uncomment if you're curious how long execution takes
    # start = time.time()
	es = authenticate_http()
	res = es.search(index=INDEX, query={
		"fuzzy": {
			"title": "chicken"
		}},
    
	# 	"fuzzy": {
	# 		"ingredients": {
	# 			"value": "chicken",
	# 			"value": "onion",
	# 			"value": "garlic",

	# 		}
	# 	}
	
	# },
	sort= "_score")
	
	for hit in res['hits']['hits']:
		pprint.pprint(hit)