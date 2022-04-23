import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'services/firebase';
import useStore from 'store';

function useFirebase() {
  const logoutUser = useStore((state) => state.logoutUser);
  const [authUser, setAuthUser] = useState(auth.currentUser);

  useEffect(() => {
    let isMounted = true;

    const onSubscribe = () => {
      onAuthStateChanged(auth, (userCustomer) => {
        if (userCustomer && isMounted) {
          setAuthUser(userCustomer);
        } else if (!userCustomer && isMounted) {
          logoutUser();
        }
      });
    };
    // const unsubscribe = onAuthStateChanged(auth, (user) => setAuthUser(user));

    // return () => {
    // unsubscribe();
    // };

    onSubscribe();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { authUser };
}

export default useFirebase;
