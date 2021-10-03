const apiKey = process.env.REACT_APP_API_KEY;

export default function getMovie(imdbID) {
  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

  return fetch(apiUrl)
    .then((res) => res.json())
    .then(
      (response) => {
        return response;
      },
      (error) => {
        return { error: true, message: error.message };
      }
    );
}
