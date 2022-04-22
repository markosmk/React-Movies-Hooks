import {
  login,
  register,
  loginWithGoogle,
  logout,
  getStatus,
} from 'store/actions/authActions';
import {
  addFavorite,
  getFavoritesFirebase,
  removeFavorite,
} from 'store/actions/favoriteActions';
import { removeObject } from 'helpers';

const user = JSON.parse(localStorage.getItem('user'));
const favoritesDB = JSON.parse(localStorage.getItem('favorites'));

const authSlice = (set, get) => ({
  auth: {
    user: user ? user : null,
    favorites: favoritesDB ? favoritesDB : [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  setLoadingAuth: (data) =>
    set(({ auth }) => ({
      auth: { ...auth, isLoading: data, message: data ? '' : auth.message },
    })),
  setUser: (data) => set(({ auth }) => ({ auth: { ...auth, user: data } })),
  getStatusUser: () => {
    if (getStatus()) {
      set(({ auth }) => ({ auth: { ...auth, user: getStatus() } }));
    }
  },
  registerUser: async (email, password) => {
    get().setLoadingAuth(true);
    try {
      const newUser = await register(email, password);
      set(({ auth }) => ({ auth: { ...auth, user: newUser } }));
    } catch (error) {
      console.log(error.message);
      set(({ auth }) => ({ auth: { ...auth, message: error.message } }));
    } finally {
      get().setLoadingAuth(false);
    }
  },
  loginUser: async (type, email = '', password = '') => {
    // type - credentials -> google -> github -> etc
    try {
      get().setLoadingAuth(true);
      set(({ auth }) => ({ auth: { ...auth, isLoading: true, message: '' } }));
      let user;
      if (type === 'google') {
        user = await loginWithGoogle();
      } else {
        user = await login(email, password);
      }
      const favorites = await getFavoritesFirebase();
      if (user) {
        set(({ auth }) => ({ auth: { ...auth, user, isLoading: false, favorites } }));
      }
    } catch (error) {
      console.log(error.message);
      set(({ auth }) => ({ auth: { ...auth, message: error.message } }));
    } finally {
      get().setLoadingAuth(false);
    }
  },
  logoutUser: async () => {
    try {
      await logout();
      set(({ auth }) => ({ auth: { ...auth, user: null, favorites: [] } }));
    } catch (error) {
      console.log(error.message);
      set(({ auth }) => ({ auth: { ...auth, message: error.message } }));
    }
  },
  // favorites
  checkFavorite: (identifier, type) => {
    // only in the state
    const uid = get().auth.user?.uid;
    if (uid) {
      return get().auth.favorites.some(
        (item) => item.id === identifier && item.type === type
      );
    } else {
      // no esta logeado, deberia redirigir a login
      return false;
    }
  },
  setFavorite: async (newObj) => {
    const uid = get().auth.user?.uid;
    try {
      if (uid) {
        const existFavorite = get().auth.favorites.find(
          (item) => item.id === newObj.id && item.type === newObj.type
        );
        if (existFavorite) {
          // si existe en favoritos lo eliminamos de bd y del estado
          await removeFavorite(existFavorite, uid);
          set(({ auth }) => ({
            auth: {
              ...auth,
              favorites: removeObject(auth.favorites, newObj, 'id', 'type'),
            },
          }));
        } else {
          // sino existe lo creamos y agregamos al estado
          const favorite = await addFavorite(newObj, uid); // pasa el favorito formateado
          set(({ auth }) => ({
            auth: { ...auth, favorites: [...auth.favorites, favorite] },
          }));
        }
      } else {
        // no esta logeado, deberia redirigir a login
        return false;
      }
    } catch (error) {
      // controlar error de firebase
      console.log(error.message);
    }
  },
  getFavorites: async () => {
    const uid = get().auth.user?.uid;
    try {
      if (uid) {
        const favorites = await getFavoritesFirebase(uid);
        set(({ auth }) => ({ auth: { ...auth, favorites } }));
      } else {
        // no esta logeado, deberia redirigir a login
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  },
});

export default authSlice;
