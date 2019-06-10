from flask import Flask, request, Response
from flask_cors import CORS
from movie_recommender import MovieRecommender
import os
import json

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "https://dnarvaez27.github.io/MovieRecommender"])

rec = MovieRecommender()


def list_to_response(li):
    return Response(json.dumps(li), content_type='application/json')


@app.route('/', methods=['GET'])
def home():
    return 'Movie Recommender'


@app.route('/movies', methods=['GET'])
def get_movies():
    df = rec.get_movies()
    res = list(zip(df['title'], df['genres']))
    return list_to_response(res)


@app.route('/rec', methods=['GET'])
def recommend_by_movie():
    movie = request.args.get('movie')
    if movie:
        return list_to_response(rec.get_similar(movie))
    else:
        return 'Select a movie'


@app.errorhandler(Exception)
def handle_invalid_usage(error):
    return Response(json.dumps(error), status_code=error.status_code)


if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 5000))
    DEBUG = False
    app.run(port=PORT, debug=DEBUG, threaded=True)
