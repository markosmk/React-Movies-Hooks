import { useState } from 'react';

import ItemsCrewPerson from './ItemsCrewPerson';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

function ListCreditsPerson({ cast, crew }) {
  const [showMore, setShowMore] = useState(false);
  const countAll = cast.length + crew.length;

  return (
    <>
      <div
        className={`relative block text-slate-700 ${
          !showMore && countAll > 8
            ? 'h-72 overflow-hidden after:absolute after:bottom-0 after:left-0 after:w-full after:bg-gradient-to-t after:from-white dark:after:from-slate-900 after:h-20'
            : 'h-auto'
        }`}
      >
        {cast.length > 0 && (
          <ItemsCrewPerson title="Casting / Interpretacion" credits={cast} />
        )}
        {crew.length > 0 && <ItemsCrewPerson title="Crew / Produccion" credits={crew} />}
      </div>

      {countAll > 8 && (
        <div className="flex items-center justify-center">
          <button
            className="mt-4 text-slate-400 hover:scale-105 transition-transform"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? (
              <ChevronUpIcon className="h-6 w-6" />
            ) : (
              <ChevronDownIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      )}
    </>
  );
}

export default ListCreditsPerson;
