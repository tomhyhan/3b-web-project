import { firebaseAuth, googleProvider } from './firebase';

class AuthProvider {
  login = () => {
    return firebaseAuth.signInWithPopup(googleProvider);
  };

  logout = () => {
    firebaseAuth.signOut();
  };

  onAuthChange = (userChangeCallback) => {
    firebaseAuth.onAuthStateChanged((user) => {
      userChangeCallback(user);
    });
  };
}

export default AuthProvider;
