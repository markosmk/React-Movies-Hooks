import { useState } from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import ItemSocial from './ItemSocial';
import ItemDetails from './ItemDetails';

function PresentationPerson({ detail, external_ids }) {
  const [showBiography, setShowBiography] = useState(false);

  return (
    <div className="flex gap-6 mt-8">
      <div className="h-full w-96 hidden lg:block overflow-hidden">
        <img src={detail.avatar} alt="avatar actor" className="rounded-2xl" />
      </div>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            src={detail.avatar}
            alt="avatar actor"
            className="rounded-lg h-full w-3/4 mx-auto sm:mx-0 sm:w-1/4 sm:order-1 lg:hidden"
          />
          <div className="order-1 sm:order-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center flex-col sm:flex-row">
              {detail.name}
              <span className="ml-3 flex items-center gap-1">
                {external_ids.imdb && <ItemSocial url={external_ids.imdb} type="imdb" />}
                {external_ids.facebook && (
                  <ItemSocial url={external_ids.facebook} type="facebook" />
                )}
                {external_ids.instagram && (
                  <ItemSocial url={external_ids.instagram} type="instagram" />
                )}
                {external_ids.twitter && (
                  <ItemSocial url={external_ids.twitter} type="twitter" />
                )}
              </span>
            </h1>

            <div className="mb-4">
              <h2 className="text-lg mb-2 font-bold">Biography</h2>
              <div
                className={`relative text-slate-700 ${
                  showBiography || detail.biography.length < 580
                    ? 'max-h-auto'
                    : 'max-h-52 overflow-hidden after:absolute after:bottom-0 after:left-0 after:w-full after:bg-gradient-to-t after:from-white dark:after:from-slate-900 after:h-20'
                }`}
              >
                <p className="text-slate-500 dark:text-slate-400 leading-7">
                  {detail.biography}
                </p>
              </div>
              {detail.biography.length > 580 && (
                <div className="flex items-center justify-center">
                  <button
                    className="mt-2 text-slate-400 hover:scale-105 transition-transform"
                    onClick={() => setShowBiography(!showBiography)}
                  >
                    {showBiography ? (
                      <ChevronUpIcon className="h-6 w-6" />
                    ) : (
                      <ChevronDownIcon className="h-6 w-6" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <hr className="my-4 border-slate-100 dark:border-slate-600" />

        <div className="grid grid-cols-2">
          <ItemDetails title="Gender" description={detail.gender} />
          <ItemDetails title="Birthday" description={detail.birthday} />
          <ItemDetails title="Place of birth" description={detail.place_of_birth} />
          <ItemDetails title="Known for" description={detail.known_for} />
        </div>

        <ItemDetails
          title="Also known as"
          description={detail.also_known_as.map((item, idx) => (
            <span key={idx}>{item}</span>
          ))}
        />
      </div>
    </div>
  );
}

export default PresentationPerson;
