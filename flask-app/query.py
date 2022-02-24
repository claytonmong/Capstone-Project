from elasticsearch import Elasticsearch
from globals import URLS, USERNAME, PASSWORD, INDEX
import pprint
from queryBuilder import QueryBuilder


def authenticate_http():
	"""
	Authenticate cluster access via http
	"New line here"
	:return: authenticated elasticsearch instance
	"""
	es = Elasticsearch(
		"http://localhost:9200",
		http_auth=(USERNAME, PASSWORD)
	)

	return es


def Query(userInputString):

	es = authenticate_http()
	q = QueryBuilder(userInputString)
	res = es.search(index=INDEX, query=q, sort="_score")
	
	for hit in res['hits']['hits']:
		pprint.pprint(hit)

	print("\n\nTHIS WAS YOUR QUERY:")
	pprint.pprint(q)

	return res