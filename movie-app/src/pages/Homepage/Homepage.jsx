import React from "react";
import HomepageBanner from "./components/HomepageBanner/HomepageBanner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlide/TopRatedMovieSlide";
import UpcomingMovieSlide from "./components/UpcomingMovieSlide/UpcomingMovieSlide";

const Homepage = () => {
  return (
    <>
      <HomepageBanner />
      <PopularMovieSlide />
      <TopRatedMovieSlide />
      <UpcomingMovieSlide />
    </>
  );
};

export default Homepage;
