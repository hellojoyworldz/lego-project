import React from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMoviesy";
import { Alert } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/components/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import Lodingspinner from "../../../../common/components/Lodings/Lodings";

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

  return isLoading ? (
    <Lodingspinner />
  ) : isError ? (
    <Alert>{error.message}</Alert>
  ) : (
    <section className="px-4 mt-4">
      <MovieSlider
        title="Upcoming Movies"
        movies={data.results}
        responsive={responsive}
      />
    </section>
  );
};

export default UpcomingMovieSlide;
