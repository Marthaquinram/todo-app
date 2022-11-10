import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context/globalContext";

const Header = () => {
  const { user, logout } = useGlobalContext();
  const { pathname } = useLocation();

  return (
    <div className="main-header">
      <div className="main-header__inner">
        <div className="main-header__left">
          <Link to="/">ToDo List</Link>
        </div>

        <div className="main-header__right">
          {/* if there is a user so the logout user.  */}
          {user ? (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          ) : pathname === "/" ? (
            <Link to="/register" className="btn">
              Register
            </Link>
          ) : (
            <Link to="/" className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
