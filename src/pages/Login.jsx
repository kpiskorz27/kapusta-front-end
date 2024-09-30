import React, { useState } from 'react';
import GoogleLogo from '../images/googleLogo.svg';
import { useDispatch } from 'react-redux';
import s from '../assets/styles/Login.module.css';
import authOperations from '../redux/slices/authOperations';
import eyeOpened from '../images/eye.svg';
import eyeClosed from '../images/eye-blocked.svg';

export default function LogInForm() {
  const [isPswdShown, setIsPswdShown] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [submitAction, setSubmitAction] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const changePswdVisibility = () => {
    setIsPswdShown(!isPswdShown);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.email || !formData.password) {
      setErrorMessage('Email and password are required.');
      return;
    }
    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (submitAction === 'login') {
      try {
        await dispatch(authOperations.logIn(formData)).unwrap();
      } catch (error) {
        setErrorMessage(error);
      }
    } else if (submitAction === 'registration') {
      try {
        await dispatch(authOperations.register(formData)).unwrap();
      } catch (error) {
        setErrorMessage(error);
      }
    }
  };

  return (
    <>
      <form className={s.loginForm} onSubmit={handleSubmit}>
        <p className={s.googleText}>You can log in with your Google Account:</p>
        <button
          onClick={() => {
            // Google login functionality can be added here
          }}
          className={s.googleBtn}
          type="button"
        >
          <img src={GoogleLogo} alt="Google logo" />
        </button>
        <p className={s.formText}>
          Or log in using an email and password, after registering:
        </p>
        <label htmlFor="email" className={s.formLabel}>
          Email:
        </label>
        <input
          className={s.formInput}
          type="email"
          name="email"
          title="Please enter valid email address, for example 'example@gmail.com'"
          placeholder="your@email.com"
          minLength="6"
          required
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password" className={s.formLabel}>
          Password:
        </label>
        <input
          className={s.formInput}
          type={isPswdShown ? 'text' : 'password'}
          name="password"
          title="Please enter your password. Minimum length 6 characters."
          placeholder="Password"
          minLength="6"
          required
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          className={s.pswdVisBtn}
          onClick={changePswdVisibility}
          type="button"
        >
          <img
            className={s.pswdBtnImg}
            src={isPswdShown ? eyeOpened : eyeClosed}
            alt="Toggle password visibility"
          />
        </button>

        {errorMessage && <div className={s.errorMessage}>{errorMessage}</div>}

        <div className={s.btnCont}>
          <button
            type="submit"
            onClick={() => {
              setSubmitAction('login');
            }}
            className={s.formBtn}
          >
            LOG IN
          </button>
          <button
            type="submit"
            onClick={() => {
              setSubmitAction('registration');
            }}
            className={s.formBtn}
          >
            REGISTRATION
          </button>
        </div>
      </form>
    </>
  );
}
