import pandas
import warnings
warnings.filterwarnings('ignore')


class MovieRecommender:
    def __init__(self):
        ratings = pandas.read_csv('./data/ratings.csv', sep=',',
                                  names=['userId', 'movieId', 'rating', 'timestamp'], header=0)
        ratings.drop_duplicates(subset=['userId', 'movieId'], keep='first', inplace=True)

        movie_links = pandas.read_csv('./data/links.csv', sep=',', names=['movieId', 'imdbId', 'tmdbId'], header=0)
        self.movie_titles = pandas.read_csv('./data/movies.csv', sep=',',
                                            names=['movieId', 'title', 'genres'], header=0)
        self.movie_titles = pandas.merge(self.movie_titles, movie_links, on='movieId')
        self.movie_titles['imdbId'] = self.movie_titles.apply

        self.movie_titles.drop_duplicates(subset='title', keep='first', inplace=True)

        ratings = pandas.merge(ratings, self.movie_titles, on='movieId')

        self.ratings = pandas.DataFrame(ratings.groupby('title')['rating'].mean())
        self.ratings['count_ratings'] = ratings.groupby('title')['rating'].count()

        self.movie_matrix = ratings.pivot_table(index='userId', columns='title', values='rating')

    def get_movies(self):
        return self.movie_titles

    def get_similar(self, movie_title, min_ratings=50, min_correlation=0.5):
        movie_rating = self.movie_matrix[movie_title]
        similar_to = self.movie_matrix.corrwith(movie_rating)

        corr_movie = pandas.DataFrame(similar_to, columns=['correlation'])
        corr_movie.dropna(inplace=True)
        corr_movie = corr_movie.join(self.ratings['count_ratings'])

        res = corr_movie[(corr_movie['count_ratings'] > min_ratings) & (corr_movie['correlation']
                                                                        >= min_correlation)].sort_values(by='correlation', ascending=False)
        serie = res['correlation']

        return list(zip(serie.index, serie))
