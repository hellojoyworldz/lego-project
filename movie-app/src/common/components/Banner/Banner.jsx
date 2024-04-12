import React from "react";
import "./Banner.style.css";

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
      </div>
    </div>
  );
};

export default Banner;
