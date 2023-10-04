import request from "lib/request";

export const getFaqList = async () => {
  const { data } = await request.get("/faq-list");
  return data;
};
