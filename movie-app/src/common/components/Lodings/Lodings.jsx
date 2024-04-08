import React from "react";
import { BeatLoader } from "react-spinners";

const Lodings = () => {
  return (
    <BeatLoader
      color={"#fff"}
      loading={true}
      cssOverride={{
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-29px",
        marginLeft: "-17px",
      }}
      size={15}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Lodings;
