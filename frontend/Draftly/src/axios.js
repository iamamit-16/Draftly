// import axios from "axios";

// // in production, there's no localhost so we have to make this dynamic
// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

// const api = axios.create({
//   baseURL: BASE_URL,
// });

// export default api;

import axios from "axios";

// This is the safest way. It will always use whatever domain you are on.
const api = axios.create({
  baseURL: "/api", 
});

export default api;