import pandas
import warnings
warnings.filterwarnings('ignore')


class MovieRecommender:
    def __init__(self):
        df = pandas.read_csv('./data/ratings.csv', sep=',', names=['userId', 'movieId', 'rating', 'timestamp'], header=0)
        self.movie_titles = pandas.read_csv('./data/movies.csv', sep=',', names=['movieId', 'title', 'genres'], header=0)

        df = pandas.merge(df, self.movie_titles, on='movieId')

        self.ratings = pandas.DataFrame(df.groupby('title')['rating'].mean())
        self.ratings['count_ratings'] = df.groupby('title')['rating'].count()

        self.movie_matrix = df.pivot_table(index='userId', columns='title', values='rating')

    def get_movies(self):
        return self.movie_titles

    def get_similar(self, movie_title, min_ratings=50, min_correlation=0.5):
        movie_rating = self.movie_matrix[movie_title]
        similar_to = self.movie_matrix.corrwith(movie_rating)

        corr_movie = pandas.DataFrame(similar_to, columns=['correlation'])
        corr_movie.dropna(inplace=True)
        corr_movie = corr_movie.join(self.ratings['count_ratings'])

        res = corr_movie[(corr_movie['count_ratings'] > min_ratings) & (corr_movie['correlation'] >= min_correlation)].sort_values(by='correlation', ascending=False)
        serie = res['correlation']

        return list(zip(serie.index, serie))
