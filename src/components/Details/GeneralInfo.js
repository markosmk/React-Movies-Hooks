import { Link } from 'react-router-dom';
import { Tab } from '@headlessui/react';

import {
  AnnotationIcon,
  ArrowRightIcon,
  CalendarIcon,
  FilmIcon,
  InformationCircleIcon,
  PhotographIcon,
  ServerIcon,
} from '@heroicons/react/outline';

import useStore from 'store';
import shallow from 'zustand/shallow';
import { classNames } from 'helpers';

function ItemSummary({ title, description }) {
  return (
    <li className="pb-2 border-b-2 border-slate-100 dark:border-slate-700 flex">
      <span className="w-1/3 inline-block font-bold uppercase">{title}:</span>
      <span className="w-2/3 ml-6 space-x-2 flex flex-wrap justify-start items-center">{description}</span>
    </li>
  );
}

function ItemProviders({ title, listing }) {
  if (!listing || listing.length === 0) return null;
  return (
    <>
      <h3 className="font-medium text-sm text-slate-500 dark:text-slate-400 border-b-2 border-slate-100 dark:border-slate-700 pb-1 mb-2">
        {title}
        {/* Para Tarifa Plana, Para Comprar, Para Alquilar */}
      </h3>
      <ul className="flex justify-start flex-wrap">
        {listing.map((item) => (
          <li key={item.id} className="relative p-2 rounded-md inline-flex items-center">
            <img src={item.logo} alt="logo company" className="rounded-xl w-10 h-10 mr-2" />
            <h3 className="text-md font-medium leading-5">{item.name}</h3>
          </li>
        ))}
      </ul>
    </>
  );
}

// TODO: add link external
function GeneralInfo({ detail = {}, providers = {}, external, release, reviews, videos, images }) {
  const region = useStore((state) => state.region, shallow);
  const tabSections = [
    { title: 'Summary', icon: <InformationCircleIcon className="w-6 h-6" /> },
    { title: 'Release Dates', icon: <CalendarIcon className="w-6 h-6" /> },
    { title: 'Providers', icon: <ServerIcon className="w-6 h-6" /> },
    { title: 'Reviews', icon: <AnnotationIcon className="w-6 h-6" /> },
    { title: 'Videos', icon: <FilmIcon className="w-6 h-6" /> },
    { title: 'Images', icon: <PhotographIcon className="w-6 h-6" /> },
  ];

  return (
    <>
      <div className="w-full pt-10">
        <Tab.Group>
          <Tab.List className="flex p-2 space-x-1 bg-slate-50 dark:bg-slate-800 rounded-lg">
            {tabSections.map((tab) => (
              <Tab
                key={tab.title}
                className={({ selected }) =>
                  classNames(
                    'w-full py-3 text-sm leading-5 font-medium text-slate-400 rounded-md transition-colors',
                    selected
                      ? 'bg-cyan-500 text-cyan-100'
                      : 'hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-cyan-900 dark:hover:text-slate-200'
                  )
                }
              >
                <span className="hidden md:inline-block">{tab.title}</span>
                <span className="md:hidden md:ml-2 inline-block">{tab.icon}</span>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2 md:px-4">
            {/* Summary */}
            <Tab.Panel className="rounded-xl py-3">
              <blockquote className="relative p-4 mb-10 md:text-lg leading-7 md:leading-8 italic rounded-md bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                "{detail.overview && detail.overview}"
              </blockquote>

              <ul className="space-y-4 text-slate-500 dark:text-slate-400 relative before:absolute before:w-[2px] before:h-full before:bg-slate-100 before:left-1/3 dark:before:bg-slate-700">
                <ItemSummary
                  title={detail.created ? 'Creator' : 'Director'}
                  description={
                    detail.created ? (
                      <Link
                        to={`/person/${detail.created?.id}`}
                        className="text-cyan-700 hover:text-cyan-500 transition-colors"
                      >
                        {detail.created?.name}
                      </Link>
                    ) : (
                      <Link
                        to={`/person/${detail.director?.id}`}
                        className="text-cyan-700 hover:text-cyan-500 transition-colors"
                      >
                        {detail.director?.name}
                      </Link>
                    )
                  }
                />
                <ItemSummary title="Release Date" description={detail.date} />
                <ItemSummary
                  title="Written"
                  description={
                    detail.written &&
                    detail.written?.map((item, idx) => {
                      return (
                        <span key={'written' + item.id + idx} className="mb-2">
                          {idx > 0 && `●`}{' '}
                          <Link
                            to={`/person/${item.id}`}
                            className="text-cyan-700 hover:text-cyan-500 transition-colors"
                          >
                            {item.name}
                          </Link>{' '}
                          <i>{`(${item.job})`}</i>
                        </span>
                      );
                    })
                  }
                />
                <ItemSummary title="Runtime" description={detail.runtime} />
                <ItemSummary
                  title="Country"
                  description={
                    detail.production_countries &&
                    detail.production_countries.map((item, idx) => (
                      <span key={item.iso_3166_1}>
                        {idx !== 0 && `●`} {item.name}
                      </span>
                    ))
                  }
                />
                <ItemSummary
                  title="Studios"
                  description={
                    detail.production_companies &&
                    detail.production_companies.map((item, idx) => (
                      <span key={item.id} className="flex gap-2 mb-2">
                        {idx !== 0 && '●'} {item.name}
                      </span>
                    ))
                  }
                />
                <ItemSummary title="Budget" description={detail.budget} />
                <ItemSummary title="Revenue" description={detail.revenue} />
                <ItemSummary title="Original Title" description={detail.original_title} />
                <ItemSummary title="Original Language" description={detail.spoken_languages?.name} />
                <ItemSummary
                  title="HomePage"
                  description={
                    detail.homepage && (
                      <a
                        href={detail.homepage}
                        target="_blank"
                        rel="noreferrer"
                        alt="homepage movie"
                        className="text-cyan-700 hover:text-cyan-500 transition-colors"
                      >
                        {detail.homepage}
                      </a>
                    )
                  }
                />
              </ul>
            </Tab.Panel>

            {/* Releases Dates */}
            <Tab.Panel className="rounded-xl py-3">
              <div className="text-slate-700">
                {release &&
                  release.map((item) => {
                    return (
                      <div key={item.iso_3166_1}>
                        {/* TODO: vincular con lista de paises para obtener nombre de pais */}

                        <h3
                          className={`font-medium text-sm ${
                            region === item.iso_3166_1
                              ? 'bg-cyan-100 dark:bg-cyan-800'
                              : 'bg-slate-100 dark:bg-slate-800'
                          } text-slate-500 border-b-2 border-slate-300 dark:border-slate-500 p-2 mt-6 mb-2 rounded-t-lg flex items-center space-x-2`}
                        >
                          <span>Country: {item.iso_3166_1}</span>
                          <img
                            src={`https://flagcdn.com/${item.iso_3166_1.toLowerCase()}.svg`}
                            alt={item.iso_3166_1}
                            width="30"
                          />
                        </h3>
                        <div className="space-y-2 text-slate-500 dark:text-slate-400">
                          {item.release_dates.map((item, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                              {item.certification && (
                                <>
                                  <b>Certification:</b>{' '}
                                  <span className="rounded-md p-1 bg-slate-300 dark:bg-slate-700">
                                    {item.certification}
                                  </span>{' '}
                                </>
                              )}
                              {item.note && (
                                <>
                                  <b>Note:</b> {item.note}{' '}
                                </>
                              )}
                              <b>Date:</b> {new Date(item.release_date).toDateString()}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </Tab.Panel>

            {/* Providers */}
            <Tab.Panel className="rounded-xl py-3">
              {providers.flatrate.length === 0 && providers.buy.length === 0 && providers.rent.length === 0 && (
                <p className="text-slate-400 text-sm text-center">No Providers found</p>
              )}
              <ItemProviders title="For Flat Rate" listing={providers.flatrate} />
              <ItemProviders title="For Buy" listing={providers.buy} />
              <ItemProviders title="For Rent" listing={providers.rent} />
            </Tab.Panel>

            {/* Reviews */}
            <Tab.Panel className="rounded-xl py-3">
              {reviews?.length === 0 ? (
                <p className="text-slate-400 text-sm text-center">No Reviews found</p>
              ) : (
                <>
                  {reviews.map((item) => {
                    return (
                      <article key={item.id} className="flex items-center space-x-4 w-full mb-6">
                        <figure className="flex-none place-self-start h-12 w-12 overflow-hidden rounded-full">
                          <img
                            src={item.avatar}
                            alt={item.name + ' author'}
                            width={45}
                            height={45}
                            className="rounded-full bg-slate-100 w-full dark:bg-slate-500 object-cover"
                          />
                        </figure>
                        <div className="min-w-0 flex-auto space-y-2">
                          <a href={item.url || '#s'} className="hover:text-cyan-500 transition-colors">
                            <h4 className="text-slate-700 font-semibold dark:text-slate-400 text-lg leading-6 truncate">
                              {item.name}
                            </h4>
                          </a>
                          <p className="text-sm mt-1 text-slate-400">{item.date}</p>
                          <blockquote
                            className="text-base mt-6 leading-7 text-slate-600 dark:text-slate-500"
                            dangerouslySetInnerHTML={{
                              __html: item.content,
                            }}
                          ></blockquote>
                        </div>
                      </article>
                    );
                  })}
                </>
              )}
            </Tab.Panel>
            {/* TODO: Juntar videos y imagenes en una pestaña asi, en colocamos el crew que tbm tenemos */}
            {/* Videos */}
            <Tab.Panel className="rounded-xl py-3">
              {/* {detail.video && (
                <iframe
                  className="rounded-lg overflow-hidden"
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${detail.video.key}?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )} */}

              {videos?.length === 0 ? (
                <p className="text-slate-400 text-sm text-center">No Videos found</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {videos &&
                    videos.map((item, idx) => {
                      return (
                        <iframe
                          key={idx}
                          className="rounded-lg overflow-hidden"
                          width="100%"
                          height="315"
                          src={`https://www.youtube.com/embed/${item.key}?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      );
                    })}
                </div>
              )}
            </Tab.Panel>

            {/* Images */}
            <Tab.Panel className="rounded-xl py-3">
              {images?.posters?.length === 0 && images?.backdrops?.length === 0 && images?.logos?.length === 0 && (
                <p className="text-slate-400 text-sm text-center">No Images found</p>
              )}

              {images?.posters?.length > 0 && (
                <>
                  <h3 className="font-medium text-sm text-slate-400 border-b-2 border-slate-100 dark:border-slate-700 pb-1 my-2">
                    Posters
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                    {/* TODO: formatear imagenes antes en formatData() */}
                    {images?.posters?.slice(0, 11).map((item, idx) => {
                      return (
                        <a
                          key={'poster' + idx}
                          href={`https://image.tmdb.org/t/p/original${item.file_path}`}
                          target="_blank"
                          rel="noreferrer"
                          alt="poster movie"
                          className="hover:opacity-90 hover:scale-95 transition-all"
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w154${item.file_path}`}
                            alt="poster movie"
                            className="rounded-md w-full"
                          />
                        </a>
                      );
                    })}
                    {images?.posters?.length > 10 && (
                      <a
                        href={`https://www.themoviedb.org/movie/${detail.id}/images/posters`}
                        target="_blank"
                        rel="noreferrer"
                        alt="poster movie"
                        className="hover:opacity-80 hover:scale-95 transition-all rounded-md bg-slate-200 dark:bg-slate-700 flex flex-col items-center justify-center text-slate-600 dark:text-slate-400"
                      >
                        <ArrowRightIcon className="h-8 w-8" />
                        <span className="text-xs mt-2">Show more</span>
                      </a>
                    )}
                  </div>
                </>
              )}
              {images?.logos?.length > 0 && (
                <>
                  <h3 className="font-medium text-sm text-slate-400 border-b-2 border-slate-100 dark:border-slate-700 pb-1 my-2">
                    Logos
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 bg-slate-500 p-2 rounded-md">
                    {images.logos?.map((item, idx) => {
                      return (
                        <a
                          key={'logo' + idx}
                          href={`https://image.tmdb.org/t/p/original${item.file_path}`}
                          target="_blank"
                          rel="noreferrer"
                          alt="poster movie"
                          className="hover:opacity-90 hover:scale-95 transition-all"
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w154${item.file_path}`}
                            alt="poster movie"
                            className="rounded-md w-full"
                          />
                        </a>
                      );
                    })}
                    {images.logos?.length > 10 && (
                      <a
                        href={`https://www.themoviedb.org/movie/${detail.id}/images/logos`}
                        target="_blank"
                        rel="noreferrer"
                        alt="poster movie"
                        className="hover:opacity-90 hover:scale-95 transition-all rounded-md bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400"
                      >
                        <ArrowRightIcon className="h-4 w-4" />
                        <span className="text-xs ml-2">Show more</span>
                      </a>
                    )}
                  </div>
                </>
              )}
              {images?.backdrops?.length > 0 && (
                <>
                  <h3 className="font-medium text-sm text-slate-400 border-b-2 border-slate-100 dark:border-slate-700 pb-1 my-2">
                    Backdrops
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                    {images.backdrops?.slice(0, 11).map((item, idx) => {
                      return (
                        <a
                          key={'back' + idx}
                          href={`https://image.tmdb.org/t/p/original${item.file_path}`}
                          target="_blank"
                          rel="noreferrer"
                          alt="poster movie"
                          className="hover:opacity-90 hover:scale-95 transition-all"
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w154${item.file_path}`}
                            alt="poster movie"
                            className="rounded-md w-full"
                          />
                        </a>
                      );
                    })}
                    {images.backdrops?.length > 10 && (
                      <a
                        href={`https://www.themoviedb.org/movie/${detail.id}/images/backdrops`}
                        target="_blank"
                        rel="noreferrer"
                        alt="poster movie"
                        className="hover:opacity-90 hover:scale-95 transition-all rounded-md bg-slate-200 dark:bg-slate-700 flex flex-col items-center justify-center text-slate-600 dark:text-slate-400"
                      >
                        <ArrowRightIcon className="h-8 w-8" />
                        <span className="text-xs mt-2">Show more</span>
                      </a>
                    )}
                  </div>
                </>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}

export default GeneralInfo;
