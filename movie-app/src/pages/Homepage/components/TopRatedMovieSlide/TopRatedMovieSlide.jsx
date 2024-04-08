import React from "react";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies";
import { Alert } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import MovieSlider from "../../../../common/components/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import Lodingspinner from "../../../../common/components/Lodings/Lodings";

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

  return isLoading ? (
    <Lodingspinner />
  ) : isError ? (
    <Alert variant="danger">{error.message}</Alert>
  ) : (
    <section className="px-4 mt-4">
      <MovieSlider
        title="Top Rated Movies"
        movies={data.results}
        responsive={responsive}
        isRanking={true}
      />
    </section>
  );
};

export default TopRatedMovieSlide;
