import { Media } from '@/types/home';

import { ListMovies } from '@/components/ListMovies';

interface ListPopulatedProps {
  listing: Media[];
  isLoading: boolean;
}

export const ListPopulated = ({ listing, isLoading }: ListPopulatedProps) => {
  return (
    <>
      <h2 className="text-2xl font-semibold my-6">Popular Movies</h2>
      <ListMovies isLoading={isLoading} spinners={4} listing={listing} />
    </>
  );
};
