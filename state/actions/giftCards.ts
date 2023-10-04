import { toast } from "react-toastify";
import { getMyCardPageDataApi, getMyCardsApi, getThemedGiftCardCategory, getThemedGiftCardDataApi } from "service/gift-cards";

export const getThemedCardCat = async(setLoading: any,setThemedCardData: any, setCategories: any) => {
    setLoading(true);
    const data  = await getThemedGiftCardCategory();
    if (!data.success) {
      toast.error(data.message);
      setLoading(false);
      return;
    }
    console.log("data.data.categories", data.data.categories)
    setThemedCardData(data.data);
    setCategories((prev: any) => [...prev, ...data.data.categories]);
    setLoading(false);
}

export const getThemedGiftCardData = async (
    category: any,
    page: any,
    limit: any,
    setProductLoading: any,
    setAllGiftCards: any
  ) => {
    setProductLoading(true);
    const data  = await  getThemedGiftCardDataApi(category, page, limit);
    if (!data.success) {
      toast.error(data.message);
      setProductLoading(false);
      return;
    }
    setAllGiftCards(data.data);
    setProductLoading(false);
  };

export const getMyCardPageData = async (setPageData: any) => {
    const data  = await getMyCardPageDataApi();

    if (!data.success) {
      toast.error(data.message);

      return;
    }
    setPageData(data.data);
  };

export const getMyCards = async (status: any, limit: any, page: any, setLoading: any, setMyCards: any) => {
    setLoading(true);
    
    const data = await getMyCardsApi(status ,limit, page);
    if (!data.success) {
      toast.error(data.message);
      setLoading(false);
      return;
    }
    setMyCards(data.data);
    setLoading(false);
  };