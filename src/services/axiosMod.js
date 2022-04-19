import axios from 'axios';

const baseURL = 'https://api.themoviedb.org/3';
axios.defaults.baseURL = baseURL;

export default function axiosMod(req, urlParams = {}) {
  let params = new URLSearchParams(urlParams);
  [...params.entries()].forEach(([key, value]) => {
    if (!value) {
      params.delete(key);
    }
  });
  params.append('api_key', process.env.REACT_APP_API_KEY_V3);
  // console.log(params.toString());
  return axios.get(req, { params, baseURL });
}

export const axiosApi = axios.create({
  baseURL,
  params: { api_key: process.env.REACT_APP_API_KEY_V3 },
});
