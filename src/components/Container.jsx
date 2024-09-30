import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import authOperations from '../redux/slices/authOperations';
import userOperations from '../redux/slices/userOperations';
import s from '../assets/styles/Container.module.css';

export default function Container({ children }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const sid = useSelector(state => state.auth.sid);

  useEffect(() => {
    if (!isLoggedIn && sid) {
      dispatch(authOperations.refreshUser());
    }
    if (isLoggedIn) {
      dispatch(userOperations.getUser());
    }
  }, [dispatch, isLoggedIn, sid]);

  const { pathname } = useLocation();

  const containerClass =
    pathname === '/login' ? s.containerLoggedOut : s.containerLoggedIn;

  return <div className={containerClass}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node,
};
