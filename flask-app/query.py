from elasticsearch import Elasticsearch
from globals import URLS, USERNAME, PASSWORD, INDEX
#import pprint
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


def Query(userInput):
    es = authenticate_http()
    # separate include_list and not_include_list by ';'
    two_list = userInput.split(";")
    include_list = two_list[0]
    not_include_list = two_list[1]
    q = QueryBuilder(include_list, not_include_list)
    res = es.search(index=INDEX, query=q)
    
    for hit in res['hits']['hits']:
        print(hit)

    print("\n\nTHIS WAS YOUR QUERY:")
    print(q)

    return res
