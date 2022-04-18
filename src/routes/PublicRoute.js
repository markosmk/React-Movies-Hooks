import { Outlet, Navigate, useLocation } from 'react-router-dom';
import useStore from 'store';

function PublicRoute() {
  const user = useStore((state) => state.auth.user);
  const location = useLocation();
  // reviso si hay una location guardada
  let from = location.state?.from?.pathname || '/';
  return user ? <Navigate to={from} /> : <Outlet />;
}

export default PublicRoute;
