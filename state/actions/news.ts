import { TYPE_NEWS_POPULER, TYPE_NEWS_RECENT } from "helpers/core-constants";
import { toast } from "react-toastify";
import {
  getNewsCategory,
  getNewsDetails,
  getNews,
  postCommentNews,
  getNewsByCategoryApi,
  getNewsSearch,
} from "service/news";

export const NewsHomePageAction = async () => {
  const PopularNews = await getNews(TYPE_NEWS_POPULER, 5, 1);
  const RecentNews = await getNews(TYPE_NEWS_RECENT, 5, 1);
  const Categories = await getNewsCategory();
  return { PopularNews, RecentNews, Categories };
};

export const getNewsDetailsAction = async (id: string) => {
  const NewsDetails = await getNewsDetails(id);
  return { NewsDetails };
};
export const LinkTopaginationString = async (
  page: any,
  setData: any,
  setLoading: any,
  setLinks: any,
  selected: any
) => {
  setLoading(true);
  const url = page.url.split("?")[1];
  const number = url.split("=")[1];
  const RecentNews =
    selected === null
      ? await getNews(TYPE_NEWS_RECENT, 1, number)
      : await getNewsByCategoryApi(selected, null, 1, number);
  setData(RecentNews.data.data);
  setLinks(RecentNews.data.links);
  setLoading(false);
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
    toast.error("Please fillup all the field's");
    setLoading(false);
    return;
  }
  const Response = await postCommentNews(
    name,
    email,
    website,
    message,
    post_id
  );
  setCommentList(Response.data);
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

export const NewsSearchAction = async (query: any) => {
  const response = await getNewsSearch(query);
  return response;
};
