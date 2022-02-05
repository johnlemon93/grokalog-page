import { app } from './firebase';
import { 
  getDatabase, query, ref, orderByChild, 
  onValue, onChildAdded, off, push,
} from 'firebase/database';

const database = { getDatabase, query, ref, orderByChild, onValue, onChildAdded, off, push };

let db = database.getDatabase(app);

export default {
  getAll(dataUrl, orderby, handleLoaded, handleChildAdded) {
    const qr = database.query(
      database.ref(db, dataUrl),
      database.orderByChild(orderby),
    );

    database.onValue(qr, snapshot => handleLoaded(snapshot));
    database.onChildAdded(qr, snapshot => handleChildAdded(snapshot));

    return () => {
      database.off(qr, 'value', handleLoaded);
      database.off(qr, 'child_added', handleChildAdded);
    };
  },

  create(dataUrl, data) {
    const ref = database.ref(db, dataUrl);
    database.push(ref, data);
  },
};
