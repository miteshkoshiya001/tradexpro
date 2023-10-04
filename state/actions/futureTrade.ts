import {
  appDashboardData,
  appDashboardDataWithoutPair,
  canceledBuySellOrder,
  closeLongShortAllOrder,
  getLongShortPositionOrderList,
  getLongShortTradeHistory,
  getShortLongOrderHistory,
  getTransactionHistory,
  getWalletsFuture,
  marketTradesDashboard,
  openORderFuture,
  orderHistoryFuture,
  ordersHistoryDashboard,
  placeBuyOrderData,
  placeCloseOrderData,
  placeSellOrderData,
  prePlaceOrderData,
  preplaceOrderData,
  tradesHistoryDashboard,
  updateProfitLongShort,
} from "service/futureTrade";
import {
  setAllmarketTrades,
  setBuyOrderHistory,
  setCurrentPair,
  setDashboard,
  setLastPriceData,
  setOpenBookBuy,
  setOpenBooksell,
  setOpenOrderHistory,
  setOrderData,
  setPairs,
  setSellOrderHistory,
  setTotalData,
  setTradeOrderHistory,
} from "state/reducer/futureExchange";
import { openBookDashboard } from "service/exchange";
import Cookies from "js-cookie";
import { updateChart } from "components/exchange/api/stream";
import { unlistenAllChannels } from "./exchange";
import { toast } from "react-toastify";
import { MARKET_ORDER, STOP_MARKET_ORDER } from "helpers/core-constants";

export const getDashboardData = (pair: string) => async (dispatch: any) => {
  const response = await appDashboardData(pair);
  dispatch(setDashboard(response));
};
export async function listenMessages(dispatch: any, user: any) {
  await unlistenAllChannels();
  //@ts-ignore
  if (!window.Echo) {
    //@ts-ignore
    window.Pusher = Pusher;
    //@ts-ignore
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "test",
      wsHost: process.env.NEXT_PUBLIC_HOST_SOCKET,
      wsPort: process.env.NEXT_PUBLIC_WSS_PORT
        ? process.env.NEXT_PUBLIC_WSS_PORT
        : 6010,
      wssPort: 443,
      forceTLS: false,
      cluster: "mt1",
      disableStats: true,
      enabledTransports: ["ws", "wss"],
    });
  }

  //@ts-ignore
  // dashboard-base_coin_id-trade_coin_id
  window.Echo.channel(
    `dashboard-${localStorage.getItem("base_coin_id")}-${localStorage.getItem(
      "trade_coin_id"
    )}`
  ).listen(".order_place", (e: any) => {
    if (e.orders.order_type === "buy")
      dispatch(setOpenBookBuy(e.orders.orders));
    if (e.orders.order_type === "sell")
      dispatch(setOpenBooksell(e.orders.orders));
    if (e.orders.order_type === "buy_sell") {
      dispatch(setOpenBookBuy(e.orders.buy_orders));
      dispatch(setOpenBooksell(e.orders.sell_orders));
    }
  });
  //@ts-ignore
  window.Echo.channel(
    `trade-info-${localStorage.getItem("base_coin_id")}-${localStorage.getItem(
      "trade_coin_id"
    )}`
  ).listen(".process", (e: any) => {
    dispatch(setAllmarketTrades(e.trades.transactions));

    updateChart({
      price: parseFloat(e?.last_trade?.price),
      ts: e?.last_trade?.time,
      base_coin_id: e?.order_data?.base_coin_id,
      trade_coin_id: e?.order_data?.trade_coin_id,
      total: parseFloat(e?.last_trade?.total),
    });
    dispatch(setPairs(e.pairs));
    e.last_price_data && dispatch(setLastPriceData(e.last_price_data));
    e.order_data && dispatch(setOrderData(e.order_data));
  });
  //@ts-ignore
  window.Echo.channel(
    `dashboard-${localStorage.getItem("base_coin_id")}-${localStorage.getItem(
      "trade_coin_id"
    )}`
  ).listen(`.process-${localStorage.getItem("user_id")}`, (e: any) => {
    dispatch(setOpenOrderHistory(e.open_orders.orders));
    dispatch(setSellOrderHistory(e.open_orders.sell_orders));
    dispatch(setBuyOrderHistory(e.open_orders.buy_orders));
    e?.order_data?.total && dispatch(setTotalData(e?.order_data?.total));
  });
  //@ts-ignore
  window.Echo.channel(
    `dashboard-${localStorage.getItem("base_coin_id")}-${localStorage.getItem(
      "trade_coin_id"
    )}`
  ).listen(`.order_place_${localStorage.getItem("user_id")}`, (e: any) => {
    dispatch(setOpenOrderHistory(e.open_orders.orders));
    dispatch(setSellOrderHistory(e.open_orders.sell_orders));
    dispatch(setBuyOrderHistory(e.open_orders.buy_orders));
    e?.order_data?.total && dispatch(setTotalData(e?.order_data?.total));
  });
}

// export const prePlaceOrderDataAction = async (
//   side: number,
//   margin_mode: number,
//   order_type: number,
//   coin_pair_id: number,
//   price: number,
//   amount_type: number,
//   amount: number,
//   take_profit: number,
//   stop_loss: number,
//   leverage_amount: number
// ) => {
//   const formData = new FormData();

//   formData.append("side", side.toString());
//   formData.append("margin_mode", margin_mode.toString());
//   formData.append("order_type", order_type.toString());
//   formData.append("coin_pair_id", coin_pair_id.toString());
//   formData.append("price", price.toString());
//   formData.append("amount_type", amount_type.toString());
//   formData.append("amount", amount.toString());
//   take_profit && formData.append("take_profit", take_profit.toString());
//   stop_loss && formData.append("stop_loss", stop_loss.toString());
//   formData.append("leverage_amount", leverage_amount.toString());
//   const response = await prePlaceOrderData(formData);
//   if (response.success) {
//     toast.success(response.message);
//   } else {
//     toast.error(response.message);
//   }

//   return formData;
// };

export const initialDashboardCallAction =
  (pair: string, dashboard: any, setisLoading?: any, router?: any) =>
  async (dispatch: any) => {
    // setisLoading && setisLoading(true);
    const token = Cookies.get("token");

    let response: any;

    if (pair) {
      response = await appDashboardData(pair);
      if (!response?.success) {
        toast.error(response.message);
        router.push("/");
        return;
      }
      if (response?.pair_status === false) {
        response = await appDashboardData(response.pairs[0].coin_pair);
        await localStorage.setItem(
          "base_coin_id",
          response?.pairs[0]?.parent_coin_id
        );
        await localStorage.setItem(
          "coin_pair_id",
          response.pairs[0]?.coin_pair_id
        );
        await localStorage.setItem(
          "trade_coin_id",
          response?.pairs[0]?.child_coin_id
        );
        await localStorage.setItem(
          "current_pair",
          response?.pairs[0]?.coin_pair
        );
        response?.pairs[0]?.coin_pair &&
          dispatch(setCurrentPair(response?.pairs[0]?.coin_pair));
      }
      if (!response?.pairs) {
        setisLoading && setisLoading(false);
        return;
      }
      if (response.success === false) {
        response = await appDashboardDataWithoutPair();
      }
    } else {
      response = await appDashboardDataWithoutPair();
      if (!response?.success) {
        toast.error(response.message);
        router.push('/');
        return
      }
      console.log("appDashboardData", response);

      if (!response?.pairs) {
        setisLoading && setisLoading(false);
        return;
      }
    }

    if (pair) {
      await localStorage.setItem(
        "base_coin_id",
        response?.order_data?.base_coin_id
      );
      await localStorage.setItem(
        "trade_coin_id",
        response?.order_data?.trade_coin_id
      );
      await localStorage.setItem(
        "coin_pair_id",
        response.pairs[0]?.coin_pair_id
      );
    } else {
      await localStorage.setItem(
        "base_coin_id",
        response?.pairs[0]?.parent_coin_id
      );
      await localStorage.setItem(
        "coin_pair_id",
        response.pairs[0]?.coin_pair_id
      );
      await localStorage.setItem(
        "trade_coin_id",
        response?.pairs[0]?.child_coin_id
      );
      await localStorage.setItem("current_pair", response?.pairs[0]?.coin_pair);
      response?.pairs[0]?.coin_pair &&
        dispatch(setCurrentPair(response?.pairs[0]?.coin_pair));
    }

    await dispatch(setDashboard(response));

    const BuyResponse = await openBookDashboard(
      response?.order_data?.base_coin_id
        ? response?.order_data?.base_coin_id
        : response?.pairs[0]?.parent_coin_id,
      response?.order_data?.trade_coin_id
        ? response?.order_data?.trade_coin_id
        : response?.pairs[0]?.child_coin_id,
      "dashboard",
      "buy",
      50
    );
    dispatch(setOpenBookBuy(BuyResponse?.data?.orders));
    const SellResponse = await openBookDashboard(
      response?.order_data?.base_coin_id
        ? response?.order_data?.base_coin_id
        : response?.pairs[0]?.parent_coin_id,
      response?.order_data?.trade_coin_id
        ? response?.order_data?.trade_coin_id
        : response?.pairs[0]?.child_coin_id,
      "dashboard",
      "sell",
      50
    );
    dispatch(setOpenBooksell(SellResponse?.data?.orders));
    const marketTradesDashboardResponse = await marketTradesDashboard(
      response?.order_data?.base_coin_id
        ? response?.order_data?.base_coin_id
        : response?.pairs[0]?.parent_coin_id,
      response?.order_data?.trade_coin_id
        ? response?.order_data?.trade_coin_id
        : response?.pairs[0]?.child_coin_id,
      "dashboard",
      50
    );
    dispatch(
      setAllmarketTrades(marketTradesDashboardResponse?.data?.transactions)
    );
    if (
      response?.order_data?.base_coin_id &&
      response?.order_data?.trade_coin_id &&
      token
    ) {
      const ordersHistoryResponse = await ordersHistoryDashboard(
        response?.order_data?.base_coin_id,
        response?.order_data?.trade_coin_id,
        "dashboard",
        "buy_sell"
      );
      dispatch(setOpenOrderHistory(ordersHistoryResponse?.data?.orders));
      const sellOrderHistoryresponse = await ordersHistoryDashboard(
        response?.order_data?.base_coin_id,
        response?.order_data?.trade_coin_id,
        "dashboard",
        "sell"
      );
      dispatch(setSellOrderHistory(sellOrderHistoryresponse?.data?.orders));
      const buyOrderHistoryresponse = await ordersHistoryDashboard(
        response?.order_data?.base_coin_id,
        response?.order_data?.trade_coin_id,
        "dashboard",
        "buy"
      );
      dispatch(setBuyOrderHistory(buyOrderHistoryresponse?.data?.orders));
      const tradeOrderHistoryResponse = await tradesHistoryDashboard(
        response?.order_data?.base_coin_id,
        response?.order_data?.trade_coin_id,
        "dashboard"
      );
      dispatch(
        setTradeOrderHistory(tradeOrderHistoryResponse?.data?.transactions)
      );
    }

    setisLoading && setisLoading(false);
  };
// preplaceOrderData;
export const preplaceOrderDataAction =
  (
    trade_type: number,
    margin_mode: number,
    order_type: number,
    price: number,
    amount_type: number,
    amount: number,
    take_profit: number,
    stop_loss: number,
    leverage_amount: number,
    setPrePlaceData: any,
    coin_pair_id: any,
    stop_price: any
  ) =>
  async (dispatch: any) => {
    const formData = new FormData();
    formData.append("trade_type", String(trade_type));
    formData.append("margin_mode", String(margin_mode));
    formData.append("order_type", String(order_type));
    if (order_type !== MARKET_ORDER && order_type !== STOP_MARKET_ORDER) {
      formData.append("price", String(price));
    }
    formData.append("amount_type", String(amount_type));
    formData.append("amount", String(amount));
    stop_price && formData.append("stop_price", String(stop_price));
    take_profit &&
      formData.append(
        "take_profit",
        take_profit === 0 ? "" : String(take_profit)
      );
    stop_loss &&
      formData.append("stop_loss", stop_loss === 0 ? "" : String(stop_loss));
    formData.append("leverage_amount", String(leverage_amount));
    formData.append("coin_pair_id", String(coin_pair_id));
    const response = await preplaceOrderData(formData);
    if (response.success) {
      setPrePlaceData(response.data);
      // toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
export const placeBuyOrderAction =
  (
    trade_type: number,
    margin_mode: number,
    order_type: number,
    price: number,
    amount_type: number,
    amount: number,
    take_profit: number,
    stop_loss: number,
    leverage_amount: number,
    setPrePlaceData: any,
    coin_pair_id: any,
    stop_price: any
  ) =>
  async (dispatch: any) => {
    const formData = new FormData();
    // const coin_pair_id = localStorage.getItem("coin_pair_id");
    formData.append("side", String(trade_type));
    formData.append("margin_mode", String(margin_mode));
    formData.append("order_type", String(order_type));
    if (order_type !== MARKET_ORDER && order_type !== STOP_MARKET_ORDER) {
      formData.append("price", String(price));
    }
    formData.append("amount_type", String(amount_type));
    formData.append("amount", String(amount));
    stop_price && formData.append("stop_price", String(stop_price));

    take_profit &&
      formData.append(
        "take_profit",
        take_profit === 0 ? "" : String(take_profit)
      );
    stop_loss &&
      formData.append("stop_loss", stop_loss === 0 ? "" : String(stop_loss));
    formData.append("leverage_amount", String(leverage_amount));
    formData.append("coin_pair_id", String(coin_pair_id));
    const response = await placeBuyOrderData(formData);
    if (response.success) {
      setPrePlaceData(response.data);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
export const placeSellOrderDataAction =
  (
    trade_type: number,
    margin_mode: number,
    order_type: number,
    price: number,
    amount_type: number,
    amount: number,
    take_profit: number,
    stop_loss: number,
    leverage_amount: number,
    setPrePlaceData: any,
    coin_pair_id: any,
    stop_price: any
  ) =>
  async (dispatch: any) => {
    const formData = new FormData();
    // const coin_pair_id = localStorage.getItem("coin_pair_id");
    formData.append("side", String(trade_type));
    formData.append("margin_mode", String(margin_mode));
    formData.append("order_type", String(order_type));
    stop_price && formData.append("stop_price", String(stop_price));
    if (order_type !== MARKET_ORDER && order_type !== STOP_MARKET_ORDER) {
      formData.append("price", String(price));
    }
    formData.append("amount_type", String(amount_type));
    formData.append("amount", String(amount));
    take_profit &&
      formData.append(
        "take_profit",
        take_profit === 0 ? "" : String(take_profit)
      );
    stop_loss &&
      formData.append("stop_loss", stop_loss === 0 ? "" : String(stop_loss));
    formData.append("leverage_amount", String(leverage_amount));
    formData.append("coin_pair_id", String(coin_pair_id));
    const response = await placeSellOrderData(formData);
    console.log(response, "responseresponse");
    if (response.success) {
      setPrePlaceData(response.data);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
export const CloseSellOrderAction =
  (
    trade_type: number,
    margin_mode: number,
    order_type: number,
    price: number,
    amount_type: number,
    amount: number,
    leverage_amount: number,
    setPrePlaceData: any,
    coin_pair_id: any,
    stop_price: any
  ) =>
  async (dispatch: any) => {
    const formData = new FormData();
    formData.append("side", String(trade_type));
    formData.append("margin_mode", String(margin_mode));
    formData.append("order_type", String(order_type));
    formData.append("amount_type", String(amount_type));
    formData.append("leverage_amount", String(leverage_amount));
    if (order_type !== MARKET_ORDER && order_type !== STOP_MARKET_ORDER) {
      formData.append("price", String(price));
    }
    formData.append("amount", String(amount));
    stop_price && formData.append("stop_price", String(stop_price));
    formData.append("coin_pair_id", String(coin_pair_id));
    const response = await placeCloseOrderData(formData);
    if (response.success) {
      setPrePlaceData(response.data);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
export const closeLongShortAllOrderAction =
  (CloseAll: any, coin_pair_id: number) => async (dispatch: any) => {
    const arrayPrepare: any = [];
    CloseAll?.map((item: any) => {
      if (item.order_type === MARKET_ORDER) {
        delete item.price;
      }
      arrayPrepare.push(item);
    });

    const preparedData: any = {
      coin_pair_id: coin_pair_id,
      data: arrayPrepare,
    };
    const response = await closeLongShortAllOrder(preparedData);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

export const CloseBuyOrderAction =
  (
    trade_type: number,
    margin_mode: number,
    order_type: number,
    price: number,
    amount_type: number,
    amount: number,
    leverage_amount: number,
    setPrePlaceData: any,
    coin_pair_id: any,
    stop_price: any
  ) =>
  async (dispatch: any) => {
    console.log(order_type, "order_type");
    const formData = new FormData();
    formData.append("side", String(trade_type));
    formData.append("margin_mode", String(margin_mode));
    formData.append("order_type", String(order_type));
    stop_price && formData.append("stop_price", String(stop_price));

    if (order_type !== MARKET_ORDER && order_type !== STOP_MARKET_ORDER) {
      formData.append("price", String(price));
    }
    formData.append("amount_type", String(amount_type));
    formData.append("amount", String(amount));
    formData.append("leverage_amount", String(leverage_amount));
    formData.append("coin_pair_id", String(coin_pair_id));
    const response = await placeCloseOrderData(formData);
    if (response.success) {
      setPrePlaceData(response.data);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
export const getWalletsFutureAction = async (per_page: any, page: any, search:any) => {
  const response = await getWalletsFuture(per_page, page, 2, search);
  return response;
};

export const getLongShortPositionOrderListAction = async (
  setListData: any,
  base: any,
  trade: any
) => {
  const response = await getLongShortPositionOrderList(base, trade);
  if (response.success) {
    setListData(response?.data);
  }
  return response;
};
export const getShortLongOrderHistoryAction = async (
  setListData: any,
  base: any,
  trade: any
) => {
  const response = await getShortLongOrderHistory(base, trade);
  if (response.success) {
    setListData(response?.data);
  }
  return response;
};
export const updateProfitLongShortAction = async (
  order_uid: any,
  take_profit: any,
  stop_loss: any,
  setData: any
) => {
  const formData = new FormData();
  formData.append("order_uid", order_uid);
  formData.append("take_profit", take_profit);
  formData.append("stop_loss", stop_loss);
  const response = await updateProfitLongShort(formData);
  if (response.success) {
    toast.success(response.message);
    setData({
      take_profit: 0,
      stop_loss: 0,
    });
  } else {
    toast.error(response.message);
  }
  return response;
};
export const orderHistoryFutureAction = async (
  setListData: any,
  base: any,
  trade: any
) => {
  const response = await orderHistoryFuture(base, trade);
  if (response.success) {
    setListData(response?.data);
  }
  return response;
};
export const openORderFutureAction = async (
  setListData: any,
  base: any,
  trade: any
) => {
  const response = await openORderFuture(base, trade);
  if (response.success) {
    setListData(response?.data);
  }
  return response;
};
export const getTransactionHistoryAction = async (
  setListData: any,
  coin_id: any
) => {
  const response = await getTransactionHistory(coin_id);
  if (response.success) {
    setListData(response?.data);
  }
  return response;
};
export const getTradeHistoryAction = async (
  setListData: any,
  base: any,
  trade: any
) => {
  const response = await getLongShortTradeHistory(base, trade);
  if (response.success) {
    setListData(response?.data);
  }
  return response;
};

export const canceledBuySellOrderAction = async (uid: any) => {
  const formData = new FormData();
  formData.append("uid", uid);
  const response = await canceledBuySellOrder(formData);
  if (response.success) {
    toast.success(response.message);
  } else {
    toast.error(response.message);
  }
  return response;
};
