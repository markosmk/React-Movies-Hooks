'use client';
import { useEffect, useState } from 'react';
import { useStoreApp } from '@/store';

import { HeaderPage } from '@/components/HeaderPage';
import { SpinnerCard } from '@/components/Spinner';
import { ListMovies } from '@/components/ListMovies';

export default function Page() {
  const { results, total_pages, isLoading } = useStoreApp((state) => state.upcoming);
  const getUpcoming = useStoreApp((state) => state.getUpcoming);

  const [page, setPage] = useState(1);

  useEffect(() => {
    getUpcoming({ page });
  }, [page]);

  return (
    <>
      <HeaderPage
        title="Upcoming"
        description={`The most exciting new films coming in ${new Date().getFullYear()} and beyond`}
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
