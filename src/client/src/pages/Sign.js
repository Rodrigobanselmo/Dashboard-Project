import React from 'react';
import SignIn from '../components/Initial/Sign';
import useScrollToTop from '../hooks/useScrollToTop';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function SignInPage() {

  useScrollToTop()
  const query = useQuery()

  return (
    <>
      <SignIn emailQuery={query.get('email')} />
    </>
  );
}

export default SignInPage;
