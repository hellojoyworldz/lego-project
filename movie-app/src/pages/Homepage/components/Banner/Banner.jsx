import React from "react";
import "./Banner.style.css";
import { usePopularMOviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import Lodingspinner from "../../../../components/Lodingspinner";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMOviesQuery();

  if (isLoading) {
    return <Lodingspinner />;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div
      className="main-banner"
      style={{
        backgroundImage:
          "url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2" +
          data?.results[0].backdrop_path +
          ")",
      }}>
      <div className="main-banner-info">
        <h1 className="title">{data?.results[0].title}</h1>
        <p className="overview">{data?.results[0].overview}</p>
      </div>
    </div>
  );
};

export default Banner;
