import { app } from './firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

let fireauth = { getAuth, GoogleAuthProvider, signInWithPopup };

let auth = fireauth.getAuth(app);
let ggProvider = new fireauth.GoogleAuthProvider();

let listeners = {};
let currentUser = null;

const AuthState = {
  Unknown: 'U',
  Ok: 'Y',
  No: 'N'
};
let authState = AuthState.Unknown;

const broadcast = () => {
  Object.keys(listeners).forEach(k => {
    listeners[k](authState, currentUser);
  });
};

const unregisterAuthObserver = auth.onAuthStateChanged(user => {
  currentUser = user;
  authState = currentUser == null ? AuthState.No : AuthState.Ok;
  broadcast();
});

const unregister = key => {
  delete listeners[key];
  if (Object.keys(listeners).length === 0) {
    unregisterAuthObserver();
  }
};

export default {
  loginWithGoogle() {
    fireauth.signInWithPopup(auth, ggProvider)
      .then(() => {
      }).catch(err => {
        console.error(err.message, err);
      });
  },

  onAuthStateChanged(key, cb) {
    listeners[key] = cb;
    cb(authState, currentUser);
    return () => unregister(key);
  },

  AuthState,
};
