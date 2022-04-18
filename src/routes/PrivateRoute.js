import { Outlet, Navigate, useLocation } from 'react-router-dom';
import useStore from 'store';
// import useFirebase from 'hooks/useFirebase';

function PrivateRoute() {
  const user = useStore((state) => state.auth.user);
  const location = useLocation();
  // const { authUser } = useFirebase();
  // si redirigimos guardamos desde donde venimos, asi luego redireccionamis alli
  return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;
