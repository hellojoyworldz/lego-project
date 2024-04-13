import React from "react";
import "./Banner.style.css";
import ModalCard from "../ModalCard/ModalCard";

const Banner = ({ imgpath, title, overview }) => {
  return (
    <div
      className="main-banner"
      style={{
        backgroundImage:
          "url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2" +
          imgpath +
          ")",
      }}>
      <div className="main-banner-info">
        <h1 className="title">{title}</h1>
        <p className="overview">{overview}</p>
        <ModalCard title={"재생"} youtube={true} />
      </div>
    </div>
  );
};

export default Banner;
