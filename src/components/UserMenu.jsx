import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import s from '../assets/styles/UserMenu.module.css';
import LogOutLogo from '../images/logout-mobile.svg';

const UserMenu = ({ onLogout }) => {
  const emailFromState = useSelector(state => state.auth.userData.email);

  return (
    <div className={s.userMenu}>
      <div className={s.userName_cont}>
        <h2 className={s.userName_letter}>
          {emailFromState?.charAt(0).toUpperCase()}
        </h2>
      </div>
      <h2 className={s.userName_full}>{emailFromState?.split('@')[0]}</h2>
      <button onClick={onLogout} className={s.btnExitMob} type="button">
        <img src={LogOutLogo} alt="Log out" />
      </button>
      <button onClick={onLogout} className={s.btnExit} type="button">
        Exit
      </button>
    </div>
  );
};

UserMenu.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default UserMenu;
