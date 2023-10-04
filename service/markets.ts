import request from "lib/request";

export const getMarketCardDatasApi = async (currency_type: any) => {
  const { data } = await request.get(
    `/market-overview-coin-statistic-list?currency_type=${currency_type}`
  );
  return data;
};

export const getMarketsTradeSectionDataApi = async (
  currency_type: any,
  selectType: any,
  search: any,
  page: any
) => {
  const { data } = await request.get(
    `/market-overview-top-coin-list?currency_type=${currency_type}&limit=15&type=${selectType}&search=${search}&page=${page}`
  );
  return data;
};

export const getCurrenyApi = async () => {
  const { data } = await request.get(`currency-list`);
  return data;
};
