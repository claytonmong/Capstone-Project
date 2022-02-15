from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
#Set up Flask:
app = Flask(__name__)
#Set up Flask to bypass CORS at the front end:
cors = CORS(app)
#Run the app:

    
@app.route("/postRecipies", methods=["POST"])
def postME():
 data = request.get_json()
 dataForQuery = jsonify(data)
 
 # query builder code goes here
 
 return dataForQuery

# res = requests.post('http://127.0.0.1:5000/postRecipies', json={"mytext":"lalala"})
# if res.ok:
#     print(res.json())


if __name__ == "__main__":
 app.run(port = 1000)
 