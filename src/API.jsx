// import axios from "axios";

// const instance = axios.create({
//   baseURL: "https://api.themoviedb.org/3",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// instance.interceptors.request.use(
//   (config) => {
//     config.headers[
//       "Authorization"
//     ] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWYwZTYyNGQzMWYzZDNjYWE0MzU4MzQ0MjZmMWIwZiIsInN1YiI6IjY1ZjE1MmM1MmZkZWM2MDE3MDIwYjZjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pb47jgLx1vKU0JzVf3s5wQEPwktFbTANx3TsYxeHxFA`;
//     return config;
//   },
//   (error) => {
//     console.log("REQUEST ERROR");
//     return Promise.reject(error);
//   }
// );

// export default instance;

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

// import axios from "axios";

// export const BASE_URL = "https://api.themoviedb.org/3";
// export const BASE_LANG = "ko";
// export const BASE_REGION = "KR";

// const instance = axios.create({
//   baseURL: "https://api.themoviedb.org/3",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// instance.interceptors.request.use(
//   (config) => {
//     const token = process.env.REACT_APP_TMDB_API_TOKEN;
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.log("REQUEST ERROR");
//     return Promise.reject(error);
//   }
// );

// export default instance;
