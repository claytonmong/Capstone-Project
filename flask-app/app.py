from flask import Flask

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

if __name__ == '__main__':
	app.run(debug=True)
	app.run(host='0.0.0.0', port=5000)