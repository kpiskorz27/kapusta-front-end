import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import authSelectors from "../redux/slices/authSelectors";
import authOperations from "../redux/slices/authOperations";
import KapustaLogo from "../images/logo.svg";
import UserMenu from "./UserMenu";
import LogOutModal from "./ModalLogOut";
import s from "../assets/styles/Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const handleLogout = () => {
    dispatch(authOperations.logOut())
      .unwrap()
      .then(() => {
        setModalVisible(false);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <>
      <header className={s.header}>
        <Link to="/">
          <img
            className={s.logo}
            src={KapustaLogo}
            alt="Kapusta-logo"
            height="31"
            width="90"
          />
        </Link>
        {isLoggedIn && <UserMenu onLogout={showModal} />}
      </header>
      {modalVisible && (
        <LogOutModal
          text="Do you really want to leave?"
          onClose={hideModal}
          onConfirm={handleLogout}
        />
      )}
    </>
  );
};

export default Header;
