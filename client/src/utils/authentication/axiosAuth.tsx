import axios from "axios";
export const uriBase = {
  // server: "http://localhost:8080",
  server: "https://zalando-5-be.vercel.app",
};

export const authAxios = axios.create({
  baseURL: uriBase.server,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
});
