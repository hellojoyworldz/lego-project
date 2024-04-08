import React from "react";
import { usePopularMOviesQuery } from "../../../../hooks/usePopularMovies";
import { Alert } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/components/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import Lodingspinner from "../../../../common/components/Lodings/Lodings";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMOviesQuery();

  return isLoading ? (
    <Lodingspinner />
  ) : isError ? (
    <Alert variant="danger">{error.message}</Alert>
  ) : (
    <section className="px-4">
      <MovieSlider
        title="Popular Movies"
        movies={data.results}
        responsive={responsive}
      />
    </section>
  );
};

export default PopularMovieSlide;
