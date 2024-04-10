import React, { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import Lodingspinner from "../../common/components/Lodings/Lodings";
import { Alert } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import MovieList from "./components/MovieList/MovieList";
import MovieFilters from "./components/MovieFilters/MovieFilters";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [filterGenre, setFilterGenre] = useState(["장르", 0]);
  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  return isLoading ? (
    <Lodingspinner />
  ) : isError ? (
    <Alert variant="danger">{error.message}</Alert>
  ) : (
    <Container className="pt-4 mt-4">
      <Row>
        <Col lg={12} xs={12}>
          <MovieFilters
            filterGenre={filterGenre}
            setFilterGenre={setFilterGenre}
          />
        </Col>
        <Col lg={12}>
          <MovieList
            data={data}
            page={page}
            setPage={setPage}
            filterGenre={filterGenre}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
