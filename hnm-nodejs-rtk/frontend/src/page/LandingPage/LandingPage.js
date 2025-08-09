import React, { useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../features/product/productSlice";
import LoadingSpinner from "../../common/component/LoadingSpinner";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.product.productList);
  const totalPageNum = useSelector((state) => state.product.totalPageNum);
  const loading = useSelector((state) => state.product.loading);
  const [query] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    page: query.get("page") || 1,
    name: query.get("name") || "",
  });

  useEffect(() => {
    dispatch(
      getProductList({
        ...searchQuery,
      })
    );
  }, [dispatch, searchQuery]);

  useEffect(() => {
    setSearchQuery({
      page: query.get("page") || 1,
      name: query.get("name") || "",
    });
  }, [query]);

  useEffect(() => {
    if (searchQuery.name === "") {
      delete searchQuery.name;
    }

    if (searchQuery.page === "") {
      delete searchQuery.page;
    }

    const params = new URLSearchParams(searchQuery);
    const query = params.toString();
    navigate(`?${query}`);
  }, [searchQuery, navigate]);

  const handlePageClick = ({ selected }) => {
    setSearchQuery({ ...searchQuery, page: selected + 1 });
  };

  return (
    <Container>
      <Row>
        {loading ? (
          <LoadingSpinner />
        ) : productList.length > 0 ? (
          <>
            {productList.map((item) => (
              <Col md={3} sm={12} key={item._id}>
                <ProductCard item={item} />
              </Col>
            ))}

            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={totalPageNum}
              forcePage={searchQuery.page - 1}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
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
              className="display-center list-style-none"
            />
          </>
        ) : (
          <div className="text-align-center empty-bag">
            {searchQuery.name === "" ? (
              <h2>등록된 상품이 없습니다!</h2>
            ) : (
              <h2>{searchQuery.name}과 일치한 상품이 없습니다!`</h2>
            )}
          </div>
        )}
      </Row>
    </Container>
  );
};

export default LandingPage;
