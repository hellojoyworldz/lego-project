import React from "react";
import { Alert } from "react-bootstrap";
import Lodingspinner from "../../../../common/components/Lodings/Lodings";
import { useRecommendedMoveiesQuery } from "../../../../hooks/useRecommendedMovies";
import MovieSlider from "../../../../common/components/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const RecommendedMovies = ({ id }) => {
  const { data, isLoading, isError, error } = useRecommendedMoveiesQuery(id);
  return isLoading ? (
    <Lodingspinner />
  ) : isError ? (
    <Alert>{error.message}</Alert>
  ) : (
    <section className="px-4 mt-4">
      <MovieSlider
        title="Recommended Movies"
        movies={data.results}
        responsive={responsive}
      />
    </section>
  );
};

export default RecommendedMovies;
