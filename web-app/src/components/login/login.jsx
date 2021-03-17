import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import styles from './login.module.css';

const Login = ({ authProvider }) => {
  const history = useHistory();

  const handleLogin = () => {
    authProvider
      .login() //
      .then((result) => {
        traverseToBoard(result.user);
      });
  };

  const traverseToBoard = (user) => {
    history.push({
      pathname: '/board',
      state: {
        userName: user.displayName,
        userId: user.uid,
      },
    });
  };

  useEffect(() => {
    console.log('logged in !!');
  }, []);

  return (
    <div className={styles.loginStyle}>
      <main className={styles.login}>
        <h2 className={styles.title}>
          <i className='fas fa-headset'></i> Welcome to R-Chat
        </h2>

        <h3 className={styles.description}>Chat with anyone freely!</h3>
        <button className={styles.button} onClick={handleLogin}>
          Sign in with Google
        </button>
      </main>
    </div>
  );
};

export default Login;
