import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  Timestamp,
} from 'firebase/firestore/lite';
import { db } from 'services/firebase';

const getFavoritesFirebase = async (uid) => {
  const refCollection = collection(db, `users/${uid}/favorites`);
  const favoritesInFS = await getDocs(refCollection);
  const favorites = favoritesInFS.docs
    .map((doc) => ({
      ...doc.data(),
      idFav: doc.id,
      created_at: new Date(doc.data().created_at?.toDate()).getTime(),
    }))
    .sort((a, b) => {
      return a.created_at < b.created_at ? 1 : -1;
    }); // para ordenar por desc created_at
  if (favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return favorites;
  } else {
    return [];
  }
};

const addFavorite = async (itemMovie, uid) => {
  const refCollection = collection(db, `users/${uid}/favorites`);
  const itemSaved = await addDoc(refCollection, {
    ...itemMovie,
    created_at: Timestamp.fromDate(new Date()),
  }); // genera un nuevo id dentro de la collection

  const item = {
    ...itemMovie,
    created_at: new Date(Timestamp.fromDate(new Date()).toDate()).getTime(),
    idFav: itemSaved.id,
  };
  // guardamos en localStorage la nueva lista
  const favorites = JSON.parse(localStorage.getItem('favorites'));
  localStorage.setItem('favorites', JSON.stringify([...favorites, item]));

  return item;
};

const removeFavorite = async (itemMovie, uid) => {
  const ref = doc(db, `users/${uid}/favorites`, itemMovie.idFav);
  await deleteDoc(ref);

  // guardamos en localStorage la nueva lista
  const favorites = JSON.parse(localStorage.getItem('favorites'));
  localStorage.setItem(
    'favorites',
    JSON.stringify([...favorites.filter((item) => item.idFav !== itemMovie.idFav)])
  );
};

export { getFavoritesFirebase, addFavorite, removeFavorite };
