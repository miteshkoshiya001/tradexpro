import axios from "axios";
import Cookie from "js-cookie";

const FutureTradeRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/api/future-trade",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

FutureTradeRequest.interceptors.request.use((config: any) => {
  const token = Cookie.get("token");
  const lang = global.window && window.location.href.split("/")[3];

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.lang = lang ? lang : "en";
  config.headers.userapisecret = process.env.NEXT_PUBLIC_SECRET_KEY;
  return config;
});
FutureTradeRequest.interceptors.response.use((response: any) => {
  return response;
});

export function apiRequest(base: any, query: any | null) {
  if (query === null) {
    return FutureTradeRequest(base);
  } else {
    return axios.get(base + query);
  }
}
export default FutureTradeRequest;
