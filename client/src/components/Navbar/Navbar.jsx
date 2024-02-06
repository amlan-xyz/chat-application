import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import "./Navbar.css";
export const Navbar = () => {
  const [showMenu, setshowMenu] = useState(false);
  const { loggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setshowMenu(!showMenu);
  };

  return (
    <div className="nav">
      <div className="container nav__body">
        <header className="nav__header">
          <IoChatboxEllipses className="nav__logo" /> Chatter
        </header>
        <div className="nav__list">
          <div className="nav__item">
            <img
              className="profile__img"
              src="/profile.png"
              alt="user profile"
            />
            <span className="profile__details">
              {loggedIn && user.username}
            </span>
          </div>
          <div onClick={toggleMenu} className="nav__item">
            {showMenu ? (
              <IoIosArrowUp className="nav__arrow" />
            ) : (
              <IoIosArrowDown className="nav__arrow" />
            )}
          </div>
        </div>

        <div className={showMenu ? "nav__links" : "nav__links-hide"}>
          <NavLink className="nav__link" to="/profile">
            Profile <FaRegUser />
          </NavLink>
          {loggedIn && (
            <button className="nav__link " onClick={() => dispatch(logout())}>
              Logout <CiLogout />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
