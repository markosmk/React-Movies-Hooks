const apiKey = process.env.REACT_APP_API_KEY;

export default function getSearch({ keyword = 'lord' } = {}) {
  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}`;

  return fetch(apiUrl)
    .then((res) => res.json())
    .then(
      (response) => {
        const { Search = [] } = response;
        if (Array.isArray(Search)) {
          const moviesPosters = Search.map((mov) => {
            const { Poster, Title, Year, imdbID, Type } = mov;
            return { Poster, Title, Year, imdbID, Type };
          });
          return moviesPosters;
        }
      },
      (error) => {
        return { error: true, message: error.message };
      }
    );
}
