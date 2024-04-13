import React from "react";
import Banner from "../../../../common/components/Banner/Banner";
import { useMovieVideosQuery } from "../../../../hooks/useMovieVideos";
import Alert from "react-bootstrap/Alert";
import Lodingspinner from "../../../../common/components/Lodings/Lodings";

const DetailBanner = ({ id, imgpath, title, overview }) => {
  const { data, isLoading, isError, error } = useMovieVideosQuery(id);

  return isLoading ? (
    <Lodingspinner />
  ) : isError ? (
    <Alert>{error.message}</Alert>
  ) : (
    <Banner
      imgpath={imgpath}
      title={title}
      overview={overview}
      videodata={data[0].key}
    />
  );
};

export default DetailBanner;
