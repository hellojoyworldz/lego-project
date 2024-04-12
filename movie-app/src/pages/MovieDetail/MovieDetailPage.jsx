import React from "react";
import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import Alert from "react-bootstrap/Alert";
import Lodingspinner from "../../common/components/Lodings/Lodings";
import Banner from "../../common/components/Banner/Banner";

const MovieDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useMovieDetailQuery(id);

  if (isLoading) {
    return <Lodingspinner />;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div className="movie-detail">
      <Banner
        imgpath={data?.backdrop_path}
        title={data.title}
        overview={data.tagline}
      />
    </div>
  );
};

export default MovieDetailPage;
