import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ authenticate, setAuthenticate }) => {
  const menuList = [
    "여성",
    "Divided",
    "남성",
    "신생아/유아",
    "아동",
    "H&M Home",
    "Sale",
    "지속가능성",
  ];

  const navigate = useNavigate();

  const search = (e) => {
    if (e.key === "Enter") {
      let keyword = e.target.value;
      navigate(`/?q=${keyword}`);
    }
  };

  const logout = () => {
    setAuthenticate(false);
    navigate("/");
  };

  return (
    <div>
      <div>
        <div className="login-button">
          {authenticate ? (
            <div onClick={logout}>
              <FontAwesomeIcon icon={faUser} />
              로그아웃
            </div>
          ) : (
            <Link to="/login">
              <FontAwesomeIcon icon={faUser} />
              로그인
            </Link>
          )}
        </div>
      </div>
      <div className="nav-section">
        <Link to="/">
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
            <li key={idx}>{menu}</li>
          ))}
        </ul>
        <div className="search-bar">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input type="text" onKeyPress={(e) => search(e)} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
