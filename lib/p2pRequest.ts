import axios from "axios";
import Cookie from "js-cookie";

const p2pResuest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/api/p2p",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

p2pResuest.interceptors.request.use((config: any) => {
  const token = Cookie.get("token");
  const lang = global.window && window.location.href.split("/")[3];

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.lang = lang ? lang : "en";
  config.headers.userapisecret = process.env.NEXT_PUBLIC_SECRET_KEY;
  return config;
});
p2pResuest.interceptors.response.use((response: any) => {
  return response;
});

export function apiRequest(base: any, query: any | null) {
  if (query === null) {
    return p2pResuest(base);
  } else {
    return axios.get(base + query);
  }
}
export default p2pResuest;
