import { Link } from 'react-router-dom';

function ItemsCrewPerson({ title, credits }) {
  if (credits.length === 0) return null;

  return (
    <>
      <h3 className="font-medium text-sm bg-slate-100 dark:bg-slate-800 text-slate-500 border-b-2 border-slate-300 dark:border-slate-500 p-2 mt-6 mb-2 rounded-t-lg">
        {title}
      </h3>
      <ul className="space-y-2 text-slate-500 dark:text-slate-400 overflow-x-auto">
        {credits.map((item) => (
          <div key={item.credit_id} className="flex gap-4 items-center whitespace-nowrap">
            <div className="w-28 bg-cyan-600 text-cyan-50 px-2 py-1 font-medium rounded-md">
              {item.date}
            </div>

            <div>
              <span className="capitalize font-semibold">{item.media_type}: </span>
              <Link
                to={`/${item.media_type}/${item.id}`}
                className="text-cyan-600 hover:text-cyan-500 transition-colors"
              >
                {item.title}
              </Link>
            </div>

            {item.episodes && (
              <span>
                <b>Episodes: </b>
                {item.episodes}
              </span>
            )}

            <span>
              <span className="italic font-semibold">as: </span>{' '}
              {item.character || item.job}
            </span>
          </div>
        ))}
      </ul>
    </>
  );
}

export default ItemsCrewPerson;
