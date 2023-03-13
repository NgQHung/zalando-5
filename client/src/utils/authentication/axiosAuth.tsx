import axios from "axios";
// import { baseURL } from "./baseUrl";
import { herokuUrl } from "./herokuUrl";
const uriBase = {
  server: "http://localhost:8080",
  // server: "https://zalando-be.herokuapp.com",
};

export const authAxios = axios.create({ baseURL: uriBase.server, withCredentials: true });
