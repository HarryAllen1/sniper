import admin from 'firebase-admin';

const db = admin.firestore();

export const addCoinsToTotal = async (
  userID: string,
  addedCoins: number
): Promise<number | void> => {
  let totalCoins: number;
  return db
    .collection('users')
    .doc(userID)
    .get()
    .then((stuff) => {
      const coins: number = stuff.data()?.coins ? stuff.data()?.coins : 0;
      return db
        .collection('users')
        .doc(userID)
        .set({ coins: coins + addedCoins }, { merge: true })
        .then((result) => {
          return coins + addedCoins;
        });
    });
};

export const getTotalCoins = (userID: string): Promise<number> => {
  return db
    .collection('users')
    .doc(userID)
    .get()
    .then((stuff) => {
      return stuff.data()?.coins ? stuff.data()?.coins : 0;
    });
};
export const getUserData = (userID: string): Promise<any> => {
  return db
    .collection('users')
    .doc(userID)
    .get()
    .then((stuff) => {
      return stuff.data();
    });
};

export const setUserData = (
  userID: string,
  data: Partial<FirebaseFirestore.DocumentData>,
  options: FirebaseFirestore.SetOptions
): Promise<FirebaseFirestore.WriteResult> => {
  return db.collection('users').doc(userID).set(data, options);
};

export const deleteFieldFromUserData = (userID: string, fields: string[]) => {
  let keyDelete: { [field: string]: admin.firestore.FieldValue } = {};
  fields.forEach((field) => {
    keyDelete[field] = admin.firestore.FieldValue.delete();
  });
  return db.collection('users').doc(userID).update(keyDelete);
};
