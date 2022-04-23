function ItemDetails({ title, description }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-slate-500 dark:text-slate-400 leading-7 space-x-3">
        {description}
      </p>
    </div>
  );
}
export default ItemDetails;
