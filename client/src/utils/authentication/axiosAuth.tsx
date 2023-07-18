import axios from "axios";
// import { baseURL } from "./baseUrl";
// import { herokuUrl } from "./herokuUrl";
export const uriBase = {
  // server: "http://localhost:8080",
  // server: "https://zalando-be.herokuapp.com",
  // server: "http://ec2-16-171-38-72.eu-north-1.compute.amazonaws.com:8080",
  // server: "https://zalando-be.onrender.com",
  server: "https://zalando-5-be-git-homepage-ngqhung.vercel.app",
};

export const authAxios = axios.create({ baseURL: uriBase.server, withCredentials: true });
