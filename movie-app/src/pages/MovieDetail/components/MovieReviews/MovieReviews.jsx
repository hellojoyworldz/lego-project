import React from "react";
import "./MovieReviews.style.css";
import { Alert } from "react-bootstrap";
import Lodingspinner from "../../../../common/components/Lodings/Lodings";
import { useMovieReviewsQuery } from "../../../../hooks/useMovieReviews";
import ReviewCard from "../../../../common/components/ReviewCard/ReviewCard";
import { Row, Col } from "react-bootstrap";

const MovieReviews = ({ id }) => {
  const { data, isLoading, isError, error } = useMovieReviewsQuery(id);

  return isLoading ? (
    <Lodingspinner />
  ) : isError ? (
    <Alert>{error.message}</Alert>
  ) : (
    <section className="px-4 mt-4">
      <h3>Reviews</h3>
      {data?.total_results === 0 ? (
        <div key={0}>등록된 리뷰가 없습니다.</div>
      ) : (
        <Row>
          {data?.results.map((review, index) => (
            <Col lg={4}>
              <ReviewCard
                key={index + 1}
                author={review.author}
                content={review.content}
                created={review.created_at}
                rating={review.author_details.rating}
                contentLimit={300}
              />
            </Col>
          ))}
        </Row>
      )}
    </section>
  );
};

export default MovieReviews;
