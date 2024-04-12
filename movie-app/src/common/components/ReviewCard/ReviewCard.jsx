import React, { useState, useEffect } from "react";
import "./ReviewCard.style.css";
import ProfileImage from "../ProfileImage/ProfileImage";

const ReviewCard = ({
  author,
  content,
  created,
  rating,
  contentLimit = null,
}) => {
  const [filterContent, setFilterContent] = useState(
    contentLimit !== null && content.length > contentLimit
      ? content.substring(0, contentLimit - 3) + "..."
      : content
  );
  const createDate = new Date(created);

  const toggleContent = (e) => {
    const buttonChangeState = {
      open: {
        title: "접기",
        type: "close",
        text: content.substring(0, contentLimit - 3) + "...",
      },
      close: {
        title: "더 보기",
        type: "open",
        text: content,
      },
    };

    const target = e.target;
    changeButtonType(e, target, buttonChangeState);
    changeContent(target, buttonChangeState);
  };

  const changeButtonType = (e, target, buttonChangeState) => {
    let { title, type } = buttonChangeState[target.dataset.button];
    target.innerText = title;
    target.dataset.button = type;
  };

  const changeContent = (target, buttonChangeState) => {
    setFilterContent(buttonChangeState[target.dataset.button].text);
  };

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
      <p className="review_content">{filterContent}</p>
      {contentLimit !== null && content.length > contentLimit ? (
        <button
          type="button"
          data-button="open"
          className="reviw_content_button"
          onClick={(e) => toggleContent(e)}>
          더보기
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default ReviewCard;
