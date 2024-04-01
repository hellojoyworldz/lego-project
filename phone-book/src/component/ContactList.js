import React, { useState, useEffect } from "react";
import Item from "./Item";
import Search from "./Search";
import { useSelector } from "react-redux";

const ContactList = () => {
  const contactList = useSelector((state) => state.contactList);
  const keyword = useSelector((state) => state.keyword);

  let [filterConcatList, setFilterConcatList] = useState([]);
  useEffect(() => {
    keyword !== ""
      ? setFilterConcatList(
          contactList.filter((val) => val.name.includes(keyword))
        )
      : setFilterConcatList(contactList);
  }, [contactList, keyword]);

  return (
    <div>
      <Search />
      total: {filterConcatList.length}
      {filterConcatList.map((item, idx) => (
        <Item item={item} key={idx} />
      ))}
    </div>
  );
};

export default ContactList;
