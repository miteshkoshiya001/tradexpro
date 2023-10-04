import { TYPE_NEWS_RECENT } from "helpers/core-constants";
import request from "lib/request";
export const getNews = async (type: any, limit: any, page: any) => {
  const { data } = await request.get(
    `/news/get?type=${
      type ? type : TYPE_NEWS_RECENT
    }&limit=${limit}&page=${page}`
  );
  return data;
};
export const getNewsByCategoryApi = async (
  category: any,
  subcategory: any,
  limit: any,
  page: any
) => {
  const { data } = await request.get(
    `/news/get?category=${category}&&subcategory=${subcategory}&limit=${limit}&page=${page}`
  );
  return data;
};
export const getNewsCategory = async () => {
  const { data } = await request.get(`/news/category`);
  return data;
};
export const getNewsDetails = async (id: any) => {
  const { data } = await request.get(`/news/news-details?id=${id}`);
  return data;
};
export const postCommentNews = async (
  name: any,
  email: any,
  website: any,
  message: any,
  post_id: any
) => {
  const { data } = await request.post(`/news/comment`, {
    name: name,
    email: email,
    website: website,
    message: message,
    post_id: post_id,
  });
  return data;
};
export const getBlogNewsSettings = async () => {
  const { data } = await request.get(`/blog-news/settings`);
  return data;
};
export const getNewsSearch = async (query:any) => {
  const { data } = await request.get(`/news/search?value=${query}`);
  return data;
};