import {
  knowledgebaseArticleList,
  knowledgebaseArticleSearch,
  knowledgebaseInfo,
  knowledgebaseSubcategoryListbyId,
  supportTicketConversationDetails,
} from "service/knowledgebase";

export const getKnowledgebaseInfoAction = async (
  setKnowledgebase: any,
  setLoading: any
) => {
  setLoading(true);
  const Knowledgebase = await knowledgebaseInfo(4);
  setKnowledgebase(Knowledgebase.data);
  setLoading(false);
};
export const knowledgebaseArticleListAction = async (
  setList: any,
  setDetails: any,
  setLoading: any,
  uniqueCode: any
) => {
  setLoading(true);
  const articleList = await knowledgebaseArticleList(uniqueCode);
  setList(articleList?.data?.article_list);
  setDetails(articleList?.data?.sub_category_details);
  console.log(articleList.data, "articleList.data");
  setLoading(false);
};
export const knowledgebaseSubcategoryListbyIdAction = async (
  setList: any,
  setDetails: any,
  setLoading: any,
  uniqueCode: any
) => {
  setLoading(true);
  const subcategoryList = await knowledgebaseSubcategoryListbyId(uniqueCode);
  setList(subcategoryList?.data?.subcategory_list);
  setDetails(subcategoryList?.data?.category_details);
  setLoading(false);
};

export const knowledgebaseArticleSearchAction = async (
  query: any,
  setLists: any
) => {
  if (!query) {
    setLists([]);
    return;
  }
  const searchList = await knowledgebaseArticleSearch(query);
  console.log(searchList.data, "query");
  setLists(searchList.data);
};
