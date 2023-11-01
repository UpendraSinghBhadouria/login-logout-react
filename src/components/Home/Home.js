import React, { useContext, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import AuthContext from '../store/auth-context';
import Button from '../UI/Button/Button';

const Home = (props) => {

  const authCtx = useContext(AuthContext);

  var timerID = null;
  function createTimer() {
    timerID = setTimeout(() => {
      authCtx.onLogout();
    }, 10000)
  }

  function deleteTimer() {
    clearTimeout(timerID);
  }

  useEffect(() => {
    createTimer();
    function handleEvent() {
      deleteTimer();
      createTimer();
    }

    window.addEventListener('click', handleEvent)
    window.addEventListener('mousemove', handleEvent)
    window.addEventListener('keydown', handleEvent)

    return () => {
      window.removeEventListener('click', handleEvent)
      window.removeEventListener('mousemove', handleEvent)
      window.removeEventListener('keydown', handleEvent)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={authCtx.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
