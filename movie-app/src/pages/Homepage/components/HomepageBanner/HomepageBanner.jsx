import React from "react";
import { usePopularMOviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import Lodingspinner from "../../../../common/components/Lodings/Lodings";
import Banner from "../../../../common/components/Banner/Banner";

const HomepageBanner = () => {
  const { data, isLoading, isError, error } = usePopularMOviesQuery();

  if (isLoading) {
    return <Lodingspinner />;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Banner
      imgpath={data?.results[0].backdrop_path}
      title={data?.results[0].title}
      overview={data?.results[0].overview}
    />
  );
};

export default HomepageBanner;
