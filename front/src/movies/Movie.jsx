import React, { useEffect, useState } from "react";

export class MovieModel {
  constructor(data) {
    this.title = data[0];
    this.genres = data[1].split('|');
    this.IMDbID = data[2];
    if (data.length === 4) {
      this.correlation = data[3];
    }
  }
}

export default function Movie({ movie, api, seeRecommend }) {

  const [img, setImg] = useState(undefined);

  useEffect(() => {
    setImg(undefined);
    (async () => {
      const req = await fetch(`${api}/movieimg?IMDbID=${movie.IMDbID}`);
      const data = await req.json();
      setImg(data.img);
    })();
  }, [movie])

  return (
    <div onClick={() => seeRecommend(movie)}>
      <h4>{movie.title}</h4>
      {!!movie.correlation && <span>{(movie.correlation * 100).toFixed(2) + '%'}</span>}
      <div id="poster">
        <img src={img} alt={movie.title} />
      </div>
      <div id="genres">
        {movie.genres.map(g => (
          <span key={g} >{g}</span>
        ))}
      </div>
    </div>
  )
};