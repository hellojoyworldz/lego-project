import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const showDetail = () => {
    navigate(`/product/${item.id}`);
  };
  return (
    <div className="card_item" onClick={showDetail}>
      <div className="thumb mb-2">
        <img src={item?.img} width={300} height={450} alt="" />
      </div>
      <div className="choice">{item?.choice ? "Conscious choice" : ""}</div>
      <div className="title">{item?.title}</div>
      <div className="price">{item?.price}</div>
      <div className="new">{item?.new ? "NEW" : ""}</div>
    </div>
  );
};

export default ProductCard;
