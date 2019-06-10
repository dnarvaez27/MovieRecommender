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
    start = request.args.get('start') or 0
    end = request.args.get('end') or 100

    df = rec.get_movies()
    res = list(zip(df['title'], df['genres'], df['imdbId']))
    return list_to_response(res[start:end])


@app.route('/rec', methods=['GET'])
def recommend_by_movie():
    movie = request.args.get('movie')
    if movie:
        try:
            return list_to_response(rec.get_similar(movie))
        except Exception as e:
            return 'No movie found'
    else:
        return 'Select a movie'


@app.errorhandler(Exception)
def handle_invalid_usage(error):
    return Response(json.dumps(error), status_code=error.status_code)


if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 5000))
    DEBUG = False
    app.run(port=PORT, debug=DEBUG, threaded=True)
