import React from "react";
import "./MovieCard.style.css";
import { Badge } from "react-bootstrap";

const MovieCard = ({ movie }) => {
  let totalPoint = 10;
  let pointAvarage = movie.vote_average.toFixed(1);
  let starAvarage = Math.round(movie.vote_average / 2);
  let totalStar = "";

  (function () {
    for (let i = 0; i < starAvarage; i++) totalStar += "⭐️";
    for (let j = 0; j < 5 - starAvarage; j++) totalStar += "★";
  })();

  return (
    <div className="card_item">
      <div className="card_thumb">
        <img
          src={
            "https://media.themoviedb.org/t/p/w600_and_h900_bestv2" +
            movie?.poster_path
          }
          width={"600px"}
          alt=""
        />
      </div>
      <div className="card_info">
        <h4 className="card_tit">{movie?.title}</h4>
        <div className="card_genre">
          {movie?.genre_ids.map((id, idx) => (
            <Badge key={idx}>{id}</Badge>
          ))}
        </div>
        <div className="card_point">
          {pointAvarage}
          <span>/{totalPoint}</span>
        </div>
        <div className="card_star">{totalStar}</div>
        <div
          className={`card_filmrating${movie.adult ? " icon_rating_18" : ""}`}>
          <span>{movie.adult ? "청소년 관람불기" : "전연령 시청가능"}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
