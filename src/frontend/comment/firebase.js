import { initializeApp } from 'firebase/app';

let config = {
  apiKey: 'AIzaSyB0CIlCISQJxYGCjVfgpLbLnxKjuzn9Rtk',
  authDomain: 'blog-chanh-day.firebaseapp.com',
  databaseURL: 'https://blog-chanh-day.firebaseio.com',
  projectId: 'blog-chanh-day',
  storageBucket: 'blog-chanh-day.appspot.com',
  messagingSenderId: '344695729502'
};

let app = initializeApp(config);

export {
  app,
};
