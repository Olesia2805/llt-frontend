import axios from "axios";

const publicApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

export default publicApi;
