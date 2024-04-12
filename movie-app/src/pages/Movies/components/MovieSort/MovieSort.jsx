import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const MovieSort = ({ className, filterSort, setFilterSort }) => {
  const sortList = [
    { id: 0, name: "기본 정렬순" },
    { id: 1, name: "인기 많은순" },
    { id: 2, name: "인기 적은순" },
  ];
  const selectFilterSort = (event) => {
    setFilterSort([event.target.innerText, event.target.dataset.id]);
  };
  return (
    <DropdownButton
      variant="danger"
      title={filterSort[0]}
      className={className}>
      {sortList.map((val, idx) => (
        <Dropdown.Item
          onClick={(event) => selectFilterSort(event)}
          eventKey={idx + 1}
          key={idx + 1}
          data-id={val.id}>
          {val.name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default MovieSort;
