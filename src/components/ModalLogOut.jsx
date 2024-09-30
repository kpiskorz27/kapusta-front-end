import React from 'react';
import s from '../assets/styles/ModalLogOut.module.css';
import PropTypes from 'prop-types';

const LogOutModal = ({ text, onClose, onConfirm }) => {
  return (
    <div className={s.LogOutModal_container}>
      <svg
        onClick={onClose}
        className={s.LogOutModal_close}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m1 1 12 12M1 13 13 1" />
      </svg>
      <div className={s.LogOutModal_group}>
        <span className={s.LogOutModal_text}>{text}</span>
        <button onClick={onConfirm} type="button" className={s.ButtonModal}>
          Yes
        </button>
        <button onClick={onClose} type="button" className={s.ButtonModal}>
          No
        </button>
      </div>
    </div>
  );
};

LogOutModal.propTypes = {
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default LogOutModal;
