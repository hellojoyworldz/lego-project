import axios from "axios";
const URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BACKEND_PROXY
    : process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: `${URL}/api`,
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    // console.log("Starting Request", request);
    return request;
  },
  function (error) {
    // console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    //  console.log("Response:", response);
    return response;
  },
  function (error) {
    error = error.response.data;
    //  console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default api;
