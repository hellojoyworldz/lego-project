import React from "react";
import "./ReviewCard.style.css";
import ProfileImage from "../ProfileImage/ProfileImage";

const ReviewCard = ({ author, content, created, rating }) => {
  const createDate = new Date(created);
  console.log(createDate.getFullYear());

  return (
    <div className="review-card">
      <div className="review-profile">
        <ProfileImage className="me-2" />
        <h4 className="review_title">{author}</h4>
      </div>
      <span className="review_rating">평점 : {rating} / 10</span>
      <p className="reivew_date">
        작성일 :{createDate.getFullYear()}년 {createDate.getMonth()}월
        {createDate.getDate()}일
      </p>
      <p className="review_content">{content}</p>
    </div>
  );
};

export default ReviewCard;
