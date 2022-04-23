import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SpinnerIcon from 'components/icons/SpinnerIcon';
import useStore from 'store';

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginUser = useStore((state) => state.loginUser);
  const registerUser = useStore((state) => state.registerUser);
  const { isLoading, isSuccess, message } = useStore((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // reviso si hay una location guardada
  let from = location.state?.from?.pathname || '/';

  const signWithGoogle = async () => {
    await loginUser('google');
    if (isSuccess) {
      // redirigo a ruta previa
      navigate(from, { replace: true });
    }
  };
  //TODO: notification message is not same for register and login
  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(email, password);
    if (isSuccess) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-4 w-full max-w-sm mx-auto text-center">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <p className="text-slate-400 mb-4">Create a new account</p>
        {message && (
          <p className="p-4 rounded-md bg-red-200 text-red-800 text-sm">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="py-4">
          <input
            type="email"
            placeholder="Email Adress"
            className="px-4 py-3 rounded-md bg-slate-100 focus:bg-white focus:outline-none border-2 border-slate-100 focus:border-cyan-600 transition-colors mb-4 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-md bg-slate-100 focus:bg-white focus:outline-none border-2 border-slate-100 focus:border-cyan-600 transition-colors mb-4 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="bg-cyan-600 px-4 py-3 w-full text-white rounded-md hover:bg-cyan-500 disabled:opacity-75 transition-all flex items-center justify-center disabled:select-none active:scale-95 disabled:scale-95 disabled:bg-cyan-500"
          >
            {isLoading && <SpinnerIcon measure="h-6 w-6 mr-2" />}
            <span className="text-base mt-[2px]">Create Account</span>
          </button>
        </form>

        <p className="text-sm text-slate-400 mt-4 mb-2">
          Login In with Google to continue
        </p>

        <button
          type="button"
          onClick={signWithGoogle}
          className="border-2 border-orange-600 py-3 px-4 rounded-md hover:bg-orange-600 hover:text-white text-orange-600 w-full disabled:opacity-75 transition-all flex items-center justify-center disabled:select-none active:scale-95 disabled:scale-95 disabled:text-white disabled:bg-orange-600"
        >
          <span className="text-base">
            Sign In with <b>Google</b>
          </span>
        </button>

        <p className="mt-8 mb-4 text-slate-400 text-sm">
          Back to{' '}
          <Link to="/" className="hover:text-cyan-500 transition-colors font-semibold">
            Home
          </Link>
        </p>
        <p className="my-4 text-slate-400 text-sm">
          Do you have account?{' '}
          <Link
            to="/login"
            className="hover:text-cyan-500 transition-colors font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
