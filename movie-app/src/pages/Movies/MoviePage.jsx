import React, { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import Lodingspinner from "../../common/components/Lodings/Lodings";
import { Alert } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import MovieList from "./components/MovieList/MovieList";
import MovieFilters from "./components/MovieFilters/MovieFilters";
import MovieSort from "./components/MovieSort/MovieSort";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [filterGenre, setFilterGenre] = useState(["장르별 검색", "0"]);
  const [filterSort, setFilterSort] = useState(["정렬기준", "0"]);
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
    <Container className="py-4 my-4">
      <Row>
        <Col lg={12} xs={12} className="mt-4">
          <MovieFilters
            className="my-2 me-2 d-inline-block"
            filterGenre={filterGenre}
            setFilterGenre={setFilterGenre}
          />
          <MovieSort
            className="d-inline-block"
            filterSort={filterSort}
            setFilterSort={setFilterSort}
          />
        </Col>
        <Col lg={12}>
          <MovieList
            data={data}
            page={page}
            setPage={setPage}
            filterGenre={filterGenre}
            filterSort={filterSort}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
