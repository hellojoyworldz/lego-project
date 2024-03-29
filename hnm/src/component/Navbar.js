import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({
  authenticate,
  setAuthenticate,
  cate,
  setCate,
  keyword,
  setKeyword,
}) => {
  const menuList = ["All", "New", "Conscious choice"];

  const navigate = useNavigate();

  const changeCate = (menu) => {
    setCate(menu);
    setKeyword("");
    navigate("/");
  };

  const changeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const search = (e) => {
    if (e.key === "Enter") {
      let keyword = e.target.value;
      setKeyword(keyword);
      navigate(`/?q=${keyword}`);
    }
  };

  const logout = () => {
    setAuthenticate(false);
    setCate("All");
    setKeyword("");
    navigate("/");
  };

  return (
    <div>
      <div>
        <div className="login-button">
          {authenticate ? (
            <button type="button" onClick={logout}>
              <FontAwesomeIcon icon={faUser} />
              로그아웃
            </button>
          ) : (
            <Link to="/login">
              <FontAwesomeIcon icon={faUser} />
              로그인
            </Link>
          )}
        </div>
      </div>
      <div className="nav-section">
        <Link to="/" onClick={() => changeCate("All")}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/2560px-H%26M-Logo.svg.png"
            width={100}
            height={65}
            alt=""
          />
        </Link>
      </div>
      <div className="menu-area">
        <ul className="menu-list">
          {menuList.map((menu, idx) => (
            <li
              key={idx}
              onClick={() => changeCate(menu)}
              className={cate === menu ? "active" : ""}>
              {menu}
            </li>
          ))}
        </ul>
        <div className="search-bar">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            type="text"
            value={keyword}
            onChange={changeKeyword}
            onKeyPress={(e) => search(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
