import axios from "axios";
import Cookie from "js-cookie";

const launchpadRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/ico-launchpad/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

launchpadRequest.interceptors.request.use((config: any) => {
  const token = Cookie.get("token");
  const lang = global.window && window.location.href.split("/")[3];

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.lang = lang ? lang : "en";
  config.headers.userapisecret = process.env.NEXT_PUBLIC_SECRET_KEY;
  return config;
});
launchpadRequest.interceptors.response.use((response: any) => {
  return response;
});

export function apiRequest(base: any, query: any | null) {
  if (query === null) {
    return launchpadRequest(base);
  } else {
    return axios.get(base + query);
  }
}
export default launchpadRequest;
