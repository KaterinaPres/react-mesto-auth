import React from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  let { email } = props.userData || {};
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта" />
      <div className="header__info">
        <p>{email}</p>
        <Link
          onClick={props.onClick}
          to={props.toLink}
          className="header__link"
        >
          {props.nameLink}
        </Link>
      </div>
    </header>
  );
}

export default Header;