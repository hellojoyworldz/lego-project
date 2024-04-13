import React from "react";
import { Badge } from "react-bootstrap";
import { formatMondy } from "../../../../utils/regex";
import { useMovieGenreQuery } from "../../../../hooks/useMovieGenre";
import "./MovieInfo.style.css";

const MovieInfo = ({ data }) => {
  return (
    <section className="px-4 mt-4 movie-detail">
      <h3>Details</h3>
      <div className="detail_layout">
        <div className="detail_thumb">
          <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${data?.poster_path}`}
            width={600}
            alt=""
          />
        </div>
        <div className="detail_desc">
          <p className="mb-0 detail_subtitle">{data?.tagline}</p>
          <h4 className="mb-4 detail_title">{data?.title}</h4>

          <div class="detial_info">
            <span className="me-2">👍 {Math.floor(data?.vote_average)} 점</span>
            <span className="me-2">🙋🏻 {data?.vote_count} 명</span>
            <span>
              <img
                src={
                  data?.adult === false
                    ? "/images/icon_rating_all.png"
                    : "/images/icon_rating_18.png"
                }
                alt=""
                width={24}
              />
            </span>
          </div>

          <p className="mt-4 mb-4 detail_overview">{data?.overview}</p>

          <div className="detail_list">
            <dl>
              <dt>장르</dt>
              <dd>
                {data?.genres.map((genre, idx) => (
                  <Badge className="me-2" key={idx}>
                    {genre.name}
                  </Badge>
                ))}
              </dd>
            </dl>
            <dl>
              <dt>예산</dt>
              <dd>{formatMondy(data?.budget)} 달러</dd>
            </dl>
            <dl>
              <dt>수익</dt>
              <dd>{formatMondy(data?.revenue)} 달러</dd>
            </dl>
            <dl>
              <dt>개봉일</dt>
              <dd>{data?.release_date}</dd>
            </dl>
            <dl>
              <dt>상영시간</dt>
              <dd>{data?.runtime} 분</dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieInfo;
