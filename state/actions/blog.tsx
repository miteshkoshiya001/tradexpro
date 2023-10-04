import { TYPE_BLOG_FEATURED, TYPE_BLOG_RECENT } from "helpers/core-constants";
import { toast } from "react-toastify";
import {
  getBlogCategory,
  getBlogDetails,
  getBlogSearch,
  getBlogs,
  postComment,
} from "service/blog";

export const BlogHomePageAction = async () => {
  const FeaturedBlogs = await getBlogs(TYPE_BLOG_FEATURED, 9, 1);
  const RecentBlogs = await getBlogs(TYPE_BLOG_RECENT, 9, 1);
  const Categories = await getBlogCategory();

  return { FeaturedBlogs, RecentBlogs, Categories };
};

export const GetBlogDetailsAction = async (id: string) => {
  const BlogDetails = await getBlogDetails(id);
  return { BlogDetails };
};

export const PostCommentAction = async (
  name: string,
  email: string,
  website: string,
  message: string,
  post_id: string,
  setCommentList: any,
  setLoading: any,
  setPostComment: any
) => {
  setLoading(true);
  if (!name || !email || !website || !message) {
    toast.error("Please fillup all the fields");
    setLoading(false);
    return;
  }
  const Response = await postComment(name, email, website, message, post_id);
  setCommentList(Response?.data);
  if (Response.success) {
    toast.success(Response.message);
  } else {
    toast.error(Response.message);
  }
  setPostComment({
    name: "",
    email: "",
    website: "",
    message: "",
  });
  setLoading(false);
};
export const BlogSearchAction = async (query: any, locale: any) => {
  const response = await getBlogSearch(query);
  return response;
};
