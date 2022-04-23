import { useState } from 'react';
import useStore from 'store';

function Profile() {
  const user = useStore((state) => state.auth.user);
  const [form, setForm] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('update this:', form);
  };

  const handleInput = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container">
      <div className="text-center my-12 space-y-2">
        <h1 className="font-bold uppercase text-2xl">My Account</h1>
        <p className="text-base text-slate-400">
          Here you can edit data of your account in <i>FavMovie</i>
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="displayName"
            placeholder="Name"
            defaultValue={user.name || ''}
            onChange={handleInput}
            className="px-4 py-3 rounded-md bg-slate-100 focus:bg-white focus:outline-none border-2 border-slate-100 focus:border-cyan-600 transition-colors mb-4 w-full dark:border-slate-600 dark:bg-slate-800 dark:focus:border-cyan-600 dark:text-white"
          />
          <input
            disabled
            type="file"
            name="photoURL"
            placeholder="Upload your Avatar"
            className="px-4 py-3 rounded-md bg-slate-100 focus:bg-white focus:outline-none border-2 border-slate-100 focus:border-cyan-600 transition-colors mb-4 w-full dark:border-slate-600 dark:bg-slate-800 dark:focus:border-cyan-600 dark:text-white"
          />
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            autoComplete="off"
            onChange={handleInput}
            placeholder="Email Address"
            className="px-4 py-3 rounded-md bg-slate-100 focus:bg-white focus:outline-none border-2 border-slate-100 focus:border-cyan-600 transition-colors mb-4 w-full dark:border-slate-600 dark:bg-slate-800 dark:focus:border-cyan-600 dark:text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            onChange={handleInput}
            className="px-4 py-3 rounded-md bg-slate-100 focus:bg-white focus:outline-none border-2 border-slate-100 focus:border-cyan-600 transition-colors mb-4 w-full dark:border-slate-600 dark:bg-slate-800 dark:focus:border-cyan-600 dark:text-white"
          />
          <input
            type="password"
            name="repassword"
            autoComplete="new-password"
            placeholder="Confirm Password"
            onChange={handleInput}
            className="px-4 py-3 rounded-md bg-slate-100 focus:bg-white focus:outline-none border-2 border-slate-100 focus:border-cyan-600 transition-colors mb-4 w-full dark:border-slate-600 dark:bg-slate-800 dark:focus:border-cyan-600 dark:text-white"
          />

          <button
            type="submit"
            disabled
            className="bg-cyan-600 px-4 py-3 w-full text-white rounded-md hover:bg-cyan-500 transition-colors disabled:opacity-40 disabled:pointer-events-none"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
