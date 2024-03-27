import React from "react";

const ProductCard = ({ item }) => {
  return (
    <div>
      <img src={item?.img} width={300} alt="" />
      <div>{item?.choice ? "Conscious choice" : ""}</div>
      <div>{item?.title}</div>
      <div>{item?.price}</div>
      <div>{item?.new ? "NEW" : ""}</div>
    </div>
  );
};

export default ProductCard;
