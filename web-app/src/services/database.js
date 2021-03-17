import { firebaseDatabase } from './firebase';

class Database {
  writeData = (message, date) => {
    firebaseDatabase.ref(`/messages/${date}`).set(message);
  };

  readData = (onUpdateCallback) => {
    const listener = firebaseDatabase.ref(`/messages`);
    listener.limitToLast(25).on('value', (snapshot) => {
      const data = snapshot.val();
      data && onUpdateCallback(data);
    });

    return () => listener.off();
  };
}

export default Database;
