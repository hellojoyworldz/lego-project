import React from "react";
import { useMovieGenreQuery } from "../../../../hooks/useMovieGenre";
import Lodingspinner from "../../../../common/components/Lodings/Lodings";
import { Alert, Dropdown, DropdownButton } from "react-bootstrap";

const MovieFilters = ({ className, filterGenre, setFilterGenre }) => {
  const { data, isLoading, isError, error } = useMovieGenreQuery();
  const selectFilterGenre = (event) => {
    setFilterGenre([event.target.innerText, event.target.dataset.id]);
  };

  return isLoading ? (
    <Lodingspinner />
  ) : isError ? (
    <Alert variant="danger">{error.message}</Alert>
  ) : (
    <DropdownButton
      variant="danger"
      className={className}
      title={filterGenre[0]}>
      <Dropdown.Item
        onClick={(event) => selectFilterGenre(event)}
        eventKey={0}
        data-id={0}>
        전체
      </Dropdown.Item>
      {data.map((val, idx) => (
        <Dropdown.Item
          onClick={(event) => selectFilterGenre(event)}
          eventKey={idx + 1}
          key={idx + 1}
          data-id={val.id}>
          {val.name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default MovieFilters;
