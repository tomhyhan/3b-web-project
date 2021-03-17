import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import styles from './board.module.css';

const Board = ({ authProvider, database }) => {
  const formRef = useRef();

  const history = useHistory();
  const historyState = useHistory().location.state;
  const [userId, setuserId] = useState(historyState && historyState.userId);

  const [userName, setuserName] = useState(
    historyState && historyState.userName
  );
  const [content, setConetent] = useState('');

  const [messages, setMessages] = useState({});

  const logout = useCallback(() => {
    authProvider.logout();
  }, [authProvider]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      id: Date.now(),
      message: content,
      date: new Date(Date.now()).toDateString(),
      useId: userId,
      userName: userName,
    };

    database.writeData(message, Date.now());

    setMessages((messages) => {
      const newMessages = { ...messages };
      newMessages[message.id] = message;
      return newMessages;
    });

    e.target.reset();
  };

  useEffect(() => {
    console.log(messages);
    if (!userId) {
      return;
    }

    const stopListender = database.readData((messages) => {
      setMessages(messages);
    });

    return () => stopListender();
  }, [database, userId]);

  useEffect(() => {
    let mounted = true;

    authProvider.onAuthChange((user) => {
      if (user) {
        mounted && setuserId(user.uid);
        mounted && setuserName(user.displayName);
      } else {
        history.push('/');
      }
    });
  });
  return (
    <div className={styles.mainstyle}>
      <header className={styles.header}>
        <h2 className={styles.headerTitle}>
          <i className='fas fa-headset'></i> R-Chat
        </h2>
        <button onClick={logout} className={styles.logout}>
          logout
        </button>
      </header>
      <main className={styles.main}>
        <ul className={styles.messageList}>
          {Object.keys(messages).map((key) => {
            const currentUser =
              messages[key].userName === userName ? styles.myMessage : null;
            return (
              <div className={currentUser}>
                <li className={`${styles.message}`} key={messages[key].id}>
                  <h4 className={`${styles.userName} ${currentUser}`}>
                    {messages[key].userName}{' '}
                    <span className={styles.date}> {messages[key].date} </span>
                  </h4>

                  <p className={`${styles.content} ${currentUser}`}>
                    {messages[key].message}
                  </p>
                </li>
              </div>
            );
          })}
        </ul>
      </main>
      <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          onChange={(e) => setConetent(e.target.value)}
          type='text'
          name=''
          placeholder='Message'
        />
        <button className={styles.inputBtn} type='submit'>
          Send
        </button>
      </form>
    </div>
  );
};

export default Board;
