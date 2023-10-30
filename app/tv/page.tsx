'use client';
import { useEffect, useState } from 'react';
import { useStoreApp } from '@/store';

import { HeaderPage } from '@/components/HeaderPage';
import { SpinnerCard } from '@/components/Spinner';
import { ListMovies } from '@/components/ListMovies';

export default function Page() {
  const { results, total_pages, isLoading } = useStoreApp((state) => state.tv);
  const getTvSeries = useStoreApp((state) => state.getTvSeries);

  const [page, setPage] = useState(1);

  useEffect(() => {
    getTvSeries({ page });
  }, [page]);

  return (
    <>
      <HeaderPage
        title="Series"
        description="This year is presented as an epic year in the world of series, all platforms
        revolutionize their catalogs"
      />
      <div className="container">
        {isLoading ? (
          <SpinnerCard />
        ) : (
          <ListMovies
            listing={results}
            currentPage={page}
            setPage={setPage}
            totalPages={total_pages}
            isLoading={isLoading}
          />
        )}
      </div>
    </>
  );
}
