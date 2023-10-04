import { TYPE_BLOG_RECENT } from "helpers/core-constants";
import request from "lib/request";

export const getBlogs = async (type: any, limit: any, page: any) => {
  const { data } = await request.get(
    `/blog/get?type=${
      type ? type : TYPE_BLOG_RECENT
    }&limit=${limit}&page=${page}`
  );
  return data;
};
export const getBlogsByCategoryApi = async (
  category: any,
  subcategory: any,
  limit: any,
  page: any
) => {
  const { data } = await request.get(
    `/blog/get?category=${category}&&subcategory=${subcategory}&limit=${limit}&page=${page}`
  );
  return data;
};
export const getBlogCategory = async () => {
  const { data } = await request.get(`/blog/category`);
  return data;
};

export const getBlogDetails = async (id: any) => {
  const { data } = await request.get(`/blog/blog-details?id=${id}`);
  return data;
};

export const postComment = async (
  name: string,
  email: string,
  website: string,
  message: string,
  post_id: string
) => {
  const { data } = await request.post(`/blog/comment`, {
    name: name,
    email: email,
    website: website,
    message: message,
    post_id: post_id,
  });
  return data;
};
export const getBlogSearch = async (query: any) => {
  const { data } = await request.get(`/blog/search?value=${query}`);
  return data;
};
