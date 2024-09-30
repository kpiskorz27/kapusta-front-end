import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Container from './Container';
import Header from './Header';
import Loader from './Loader';
import React from 'react';

const BackgroundShared = () => {
  const isRefreshingUser = useSelector(state => state.auth.isRefreshingUser);

  return (
    <Container>
      <Header />
      {isRefreshingUser ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      )}
    </Container>
  );
};

export default BackgroundShared;
