function HeaderPage({ title, description, children }) {
  return (
    <div className="p-12 bg-slate-100 dark:bg-slate-700 text-center">
      <h2 className="mb-3 text-5xl font-bold text-black dark:text-white uppercase">
        {title}
      </h2>
      <p className="mb-0 py-4 text-slate-600 dark:text-slate-400">{description}</p>
      {children && (
        <div className="container mt-4">
          <div className="max-w-lg mx-auto">{children}</div>
        </div>
      )}
    </div>
  );
}

export default HeaderPage;
