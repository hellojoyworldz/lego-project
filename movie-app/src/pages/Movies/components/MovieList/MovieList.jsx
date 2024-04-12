import React from "react";
import { Row, Col } from "react-bootstrap";
import MovieCard from "../../../../common/components/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";

const MovieList = ({ data, page, setPage, filterGenre, filterSort }) => {
  const sortData = [...data?.results];
  const filterData = [];

  sortData.sort((a, b) => {
    if (filterSort[1] === "1" && a.vote_average < b.vote_average) return 1;
    if (filterSort[1] === "1" && a.vote_average > b.vote_average) return -1;
    if (filterSort[1] === "2" && a.vote_average > b.vote_average) return 1;
    if (filterSort[1] === "2" && a.vote_average < b.vote_average) return -1;
    return 0;
  });

  sortData.filter((val) => {
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
        {filterGenre[1] === "0" ? (
          sortData.map((movie, idx) => (
            <Col key={idx} lg={3} xs={6} className="mt-4 mb-4">
              <MovieCard movie={movie} />
            </Col>
          ))
        ) : filterData.length === 0 ? (
          <div className="py-4 mt-4 text-center">
            해당 조건에 맞는 목록이 없습니다
          </div>
        ) : (
          filterData.map((movie, idx) => (
            <Col key={idx} lg={3} xs={6} className="mt-4 mb-4">
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
      <Row>
        <div className="my-4 d-flex justify-content-center">
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
        </div>
      </Row>
    </>
  );
};

export default MovieList;
