import request from "lib/request";

export const knowledgebaseInfo = async (article_list_limit: number) => {
  const { data } = await request.get(
    `/knowledgebase/index?article_list_limit=${article_list_limit}`
  );
  return data;
};

export const knowledgebaseArticleList = async (unique_code: string) => {
  const { data } = await request.get(
    `/knowledgebase/article-list-by-subcategory?subcategory_unique_code=${unique_code}`
  );
  return data;
};

export const knowledgebaseSubcategoryListbyId = async (unique_code: string) => {
  const { data } = await request.get(
    `/knowledgebase/article-list-by-category?category_unique_code=${unique_code}`
  );
  return data;
};

export const articleDetails = async (unique_code: string) => {
  const { data } = await request.get(
    `/knowledgebase/article-details?unique_code=${unique_code}`
  );
  return data;
};

export const supportTicketList = async (
  limit: any,
  page: any,
  search: any,
  status: any,
  project: any,
  form_data: any,
  to_date: any
) => {
  const { data } = await request.get(
    `/knowledgebase/support-ticket-list?limit=${limit}&page=${page}&search=${search}&status=${status}&project=${project}&from_date=${form_data}&to_date=${to_date}`
  );
  return data;
};

export const supportTicketConversationDetails = async (unique_code: string) => {
  const { data } = await request.get(
    `/knowledgebase/support-ticket-conversation-details?unique_code=${unique_code}`
  );
  return data;
};
export const supportTicketNoteCreate = async (ticket_id: string, note: any) => {
  const { data } = await request.post(
    `/knowledgebase/support-ticket-note-create`,
    {
      ticket_id: ticket_id,
      notes: note,
    }
  );
  return data;
};
export const supportTicketNoteDelete = async (unique_id: string) => {
  const { data } = await request.post(
    `/knowledgebase/support-ticket-note-delete`,
    {
      unique_code: unique_id,
    }
  );
  return data;
};
export const supportTicketStore = async (payload: any) => {
  const { data } = await request.post(
    `/knowledgebase/support-ticket-conversation-details`,
    payload
  );
  return data;
};

export const supportTicketConversationSend = async (payload: any) => {
  const { data } = await request.post(
    `/knowledgebase/support-ticket-conversation-send`,
    payload
  );
  return data;
};

export const knowledgebaseSupportProjectList = async () => {
  const { data } = await request.get(`/knowledgebase/support-project-list`);
  return data;
};
export const SupportCreateTicket = async (payload: any) => {
  const { data } = await request.post(
    `/knowledgebase/support-ticket-store`,
    payload
  );
  return data;
};

export const knowledgebaseArticleSearch = async (query: string) => {
  const { data } = await request.post(`/knowledgebase/article-search`, {
    search: query,
  });
  return data;
};

export const knowledgebaseSupportTicketNoteCreate = async (payload: any) => {
  const { data } = await request.post(
    `/knowledgebase/support-ticket-note-create`,
    payload
  );
  return data;
};
export const siteSettingResource = async () => {
  const { data } = await request.get(`/knowledgebase/site-settings-resource`);
  return data;
};
