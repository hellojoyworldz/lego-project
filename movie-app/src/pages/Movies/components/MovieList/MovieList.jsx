import React from "react";
import { Row, Col } from "react-bootstrap";
import MovieCard from "../../../../common/components/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";

const MovieList = ({ data, page, setPage, filterGenre }) => {
  const filterData = [];

  data?.results.filter((val) => {
    val.genre_ids.map((id) => {
      if (id === Number(filterGenre[1])) filterData.push(val);
    });
  });

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  return (
    <>
      <Row>
        {filterGenre[1] === 0
          ? data?.results.map((movie, idx) => (
              <Col key={idx} lg={3} xs={6} className="mt-4 mb-4">
                <MovieCard movie={movie} />
              </Col>
            ))
          : filterData.map((movie, idx) => (
              <Col key={idx} lg={3} xs={6} className="mt-4 mb-4">
                <MovieCard movie={movie} />
              </Col>
            ))}
      </Row>
      <Row>
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          pageCount={data.total_pages}
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={page - 1}
        />
      </Row>
    </>
  );
};

export default MovieList;
