import { initializeApp } from 'firebase/app';
import config from '../../../config.json';

let app = initializeApp(config.firebase);

export {
  app,
};
