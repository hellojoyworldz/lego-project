import React, { useState, useEffect } from "react";
import InputText from "./InputText";
import Button from "./Button";
import { useDispatch } from "react-redux";

const Search = () => {
  let [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const searchKeyword = (event) => {
    event.preventDefault();
    dispatch({ type: "SEARCH_KEYWORD", payload: { keyword } });
  };

  useEffect(() => {
    console.log(keyword);
  }, [keyword]);

  return (
    <form onSubmit={searchKeyword}>
      <div className="flex flex-row gap-4">
        <div className="basis-5/6">
          <InputText
            title="Search"
            instructions="name"
            titlehidden
            setKeyword={setKeyword}
            setChange={(event) => setKeyword(event.target.value)}
          />
        </div>
        <div className="basis-1/6">
          <Button title="search"></Button>
        </div>
      </div>
    </form>
  );
};

export default Search;
