import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers[
      "Authorization"
    ] = `Bearer ${process.env.REACT_APP_MOVIEDB_API_KEY}`;
    return config;
  },
  (error) => {
    console.log("REQUEST ERROR");
    return Promise.reject(error);
  }
);

export default instance;
