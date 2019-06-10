import React, { useEffect, useState } from 'react';
import Movie, { MovieModel } from "./Movie";
import './movies.css';

const pag = 10;

const API = 'https://dn-movie-recommender.herokuapp.com';

export default function Movies() {

  const [movies, setMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [range, setRange] = useState([0, pag]);
  const [actualMovie, setActualMovie] = useState(undefined);

  const moveRange = (factor) => setRange([Math.max(range[0] + (factor * pag), 0), Math.min(range[1] + (factor * pag, pag))]);

  useEffect(() => {
    setLoaded(false);
    (async (range) => {
      try {
        const req = await fetch(`${API}/movies?start=${range[0]}&end=${range[1]}`);
        const data_movies = await req.json();

        setMovies(data_movies.map(m => new MovieModel(m)))
      } catch (error) {
        console.error(error);
      }
    })(range);
  }, [range]);


  const seeRecommend = (movie) => {
    setActualMovie(movie);
    setLoaded(false);
    (async () => {
      try {
        const req = await fetch(`${API}/rec?movie=${movie.title}`);
        const data_movies = await req.json();
        setMovies(data_movies.map(m => new MovieModel(m)))
      } catch (error) {
        console.error(error);
      }
    })();
  }

  useEffect(() => setLoaded(!!movies.length), [movies]);

  let toRender = (
    <div id="loader">
      <svg xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 100 100"
        style={{ animationPlayState: 'running', animationDelay: '0s', background: 'none' }}>
        <defs
          style={{ animationPlayState: 'running', animationDelay: '0s' }}>
          <filter
            id="gooey"
            colorInterpolationFilters="sRGB"
            style={{ animationPlayState: 'running', animationDelay: '0s' }}>

            <feGaussianBlur in="SourceGraphic" stdDeviation="2" style={{ animationPlayState: 'running', animationDelay: '0s' }} />
            <feComponentTransfer result="cutoff" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
              <feFuncA type="linear" slope="10" intercept="-5" style={{ animationPlayState: 'running', animationDelay: '0s' }} />
            </feComponentTransfer>
          </filter>
        </defs>
        <g filter="url(#gooey)" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
          <g transform="translate(50 50)" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
            <g transform="rotate(258)" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
              <circle cx="25" cy="0" r="10.5333" fill="#fcb711" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
                <animate attributeName="r" keyTimes="0;0.5;1" values="6;14;6" dur="4s" repeatCount="indefinite" begin="-4s" style={{ animationPlayState: 'running', animationDelay: '0s' }} />
              </circle>
              <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="4s" repeatCount="indefinite" begin="0s" style={{ animationPlayState: 'running', animationDelay: '0s' }} />
            </g>
          </g>
          <g transform="translate(50 50)" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
            <g transform="rotate(276)" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
              <circle cx="25" cy="0" r="7.6" fill="#f37021" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
                <animate attributeName="r" keyTimes="0;0.5;1" values="6;14;6" dur="2s" repeatCount="indefinite" begin="-3.3333333333333335s" style={{ animationPlayState: 'running', animationDelay: '0s' }} />
              </circle>
              <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="2s" repeatCount="indefinite" begin="-0.6666666666666666s" style={{ animationPlayState: 'running', animationDelay: '0s' }} />
            </g>
          </g>
          <g transform="translate(50 50)" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
            <g transform="rotate(54)" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
              <circle cx="25" cy="0" r="8.4" fill="#cc004c" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
                <animate attributeName="r" keyTimes="0;0.5;1" values="6;14;6" dur="1.3333333333333333s" repeatCount="indefinite" begin="-2.6666666666666665s" style={{ animationPlayState: 'running', animationDelay: '0s' }}></animate>
              </circle>
              <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="1.3333333333333333s" repeatCount="indefinite" begin="-1.3333333333333333s" style={{ animationPlayState: 'running', animationDelay: '0s' }}></animateTransform>
            </g>
          </g>
          <g transform="translate(50 50)" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
            <g transform="rotate(312)" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
              <circle cx="25" cy="0" r="8.13333" fill="#6460aa" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
                <animate attributeName="r" keyTimes="0;0.5;1" values="6;14;6" dur="1s" repeatCount="indefinite" begin="-2s" style={{ animationPlayState: 'running', animationDelay: '0s' }}></animate>
              </circle>
              <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="1s" repeatCount="indefinite" begin="-2s" style={{ animationPlayState: 'running', animationDelay: '0s' }}></animateTransform>
            </g>
          </g>
          <g transform="translate(50 50)" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
            <g transform="rotate(330)" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
              <circle cx="25" cy="0" r="10" fill="#0089d0" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
                <animate attributeName="r" keyTimes="0;0.5;1" values="6;14;6" dur="0.8s" repeatCount="indefinite" begin="-1.3333333333333333s" style={{ animationPlayState: 'running', animationDelay: '0s' }}></animate>
              </circle>
              <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="0.8s" repeatCount="indefinite" begin="-2.6666666666666665s" style={{ animationPlayState: 'running', animationDelay: '0s' }}></animateTransform>
            </g>
          </g>
          <g transform="translate(50 50)" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
            <g transform="rotate(108)" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
              <circle cx="25" cy="0" r="10.8" fill="#0db14b" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
                <animate attributeName="r" keyTimes="0;0.5;1" values="6;14;6" dur="0.6666666666666666s" repeatCount="indefinite" begin="-0.6666666666666666s" style={{ animationPlayState: 'running', animationDelay: '0s' }}></animate>
              </circle>
              <animateTransform attributeName="transform" type="rotate" keyTimes="0;1" values="0;360" dur="0.6666666666666666s" repeatCount="indefinite" begin="-3.3333333333333335s" style={{ animationPlayState: 'running', animationDelay: '0s' }}></animateTransform>
            </g>
          </g>
        </g>
      </svg>
      <div>Searching movies in Hollywood...📽 </div>
    </div>
  );

  if (loaded) {

    let title = (
      <div className="title">
        <h1>Movies you may like</h1>
        <span>Select a movie to see similar movies</span>
      </div>
    );
    let button = (
      <div id="movies-pagination-btns" className="down-btns">
        <button onClick={() => moveRange(-1)}>{'<'}</button>
        <button onClick={() => moveRange(1)}>{'>'}</button>
      </div>
    );

    if (actualMovie) {
      title = (
        <h1 className="title">{`Movies like "${actualMovie.title}"`}</h1>
      );
    }
    if (actualMovie) {
      button = (
        <div className="down-btns">
          <button id="btn-all" onClick={() => setRange([0, pag])}>See All</button>
        </div>
      );
    }

    toRender = (
      <>
        {title}
        <div id="movies-list">
          {movies.map((m, k) => (
            <Movie key={k} movie={m} api={API} seeRecommend={seeRecommend} />
          ))}
        </div>
        {button}
      </>
    );
  }

  return (
    <div id="movies-container">
      {toRender}
    </div>
  );
}