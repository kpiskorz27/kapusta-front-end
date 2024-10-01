// src/pages/Register.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authOperations from "../redux/slices/authOperations";
import eyeOpened from "../images/eye.svg";
import eyeClosed from "../images/eye-blocked.svg";
import s from "../assets/styles/Login.module.css";

export default function Register() {
  const [isPswdShown, setIsPswdShown] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changePswdVisibility = () => {
    setIsPswdShown(!isPswdShown);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.email || !formData.password) {
      setErrorMessage("Email and password are required.");
      return;
    }
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    try {
      await dispatch(authOperations.register(formData)).unwrap();
      navigate("/login");
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <form className={s.loginForm} onSubmit={handleSubmit}>
      <p className={s.formText}>Please register using an email and password:</p>
      <label htmlFor="email" className={s.formLabel}>
        Email:
      </label>
      <input
        className={s.formInput}
        type="email"
        name="email"
        placeholder="your@email.com"
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
        type={isPswdShown ? "text" : "password"}
        name="password"
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
          type="button"
          onClick={handleLoginRedirect}
          className={s.formBtn}
        >
          LOGIN
        </button>
        <button type="submit" className={s.formBtn}>
          REGISTRATION
        </button>
      </div>
    </form>
  );
}
