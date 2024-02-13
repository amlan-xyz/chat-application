import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginAsync,
  logout,
  updateAvatarAsync,
} from "../../features/auth/authSlice";
import { clearChatState } from "../../features/chat/chatSlice";
import { clearMessageState } from "../../features/message/messageSlice";

import "./Navbar.css";

export const Navbar = () => {
  const [showMenu, setshowMenu] = useState(false);
  const { loggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const avatars = [
    "/avatar/user0.png",
    "/avatar/user1.png",
    "/avatar/user2.png",
    "/avatar/user3.png",
    "/avatar/user4.png",
    "/avatar/user5.png",
  ];

  const toggleMenu = () => {
    setshowMenu(!showMenu);
  };
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    dispatch(loginAsync({ username: "guest_user", password: "12345" })).then(
      () => navigate("/")
    );
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearChatState());
    dispatch(clearMessageState());
    toggleMenu();
  };

  return (
    <div className="nav">
      <div className="container nav__body">
        <header onClick={() => navigate("/")} className="nav__header">
          <IoChatboxEllipses className="nav__logo" /> ChatterBox
        </header>
        <div className="nav__list">
          {loggedIn ? (
            <>
              {" "}
              <div className="nav__item">
                <img
                  className="profile__img"
                  src={user?.avatar}
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
            </>
          ) : (
            <button onClick={handleGuestLogin} className="guest__mode-btn">
              Guest Mode
            </button>
          )}
        </div>

        <div className={showMenu ? "nav__links" : "nav__links-hide"}>
          <button
            className="nav__link "
            onClick={() => {
              setShowModal(!showModal);
              toggleMenu();
            }}
          >
            Avatar <FaRegUser />
          </button>
          {loggedIn && (
            <button className="nav__link " onClick={handleLogout}>
              Logout <CiLogout />
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal_wrapper"></div>
          <div className="modal_container">
            <button
              className="modal__close-btn"
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              <IoMdClose />
            </button>
            <div className="avatar__modal">
              <p>Choose an avatar</p>
              <ul className="avatar__modal-ul">
                {avatars?.map((avatar) => (
                  <li
                    onClick={() => {
                      dispatch(updateAvatarAsync(avatar));
                      setShowModal(!showModal);
                    }}
                    key={avatar}
                  >
                    <img
                      className="avatar__modal-img"
                      src={avatar}
                      alt="avatar"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
