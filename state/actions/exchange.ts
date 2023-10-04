import {
  appDashboardData,
  buyLimitApp,
  buyMarketApp,
  buyStopLimitApp,
  openBookDashboard,
  ordersHistoryDashboard,
  sellLimitApp,
  sellMarketApp,
  sellStopLimitApp,
  tradesHistoryDashboard,
  marketTradesDashboard,
  cancelOrderApp,
  appDashboardDataWithoutPair,
} from "service/exchange";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import {
  setDashboard,
  setOpenBookBuy,
  setOpenBooksell,
  setOpenOrderHistory,
  setSellOrderHistory,
  setBuyOrderHistory,
  setTradeOrderHistory,
  setAllmarketTrades,
  setCurrentPair,
  setTotalData,
  setPairs,
  setLastPriceData,
  setOrderData,
} from "state/reducer/exchange";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";
import Cookies from "js-cookie";
import { setLoading } from "state/reducer/user";
import { updateChart } from "components/exchange/api/stream";

export const getDashboardData = (pair: string) => async (dispatch: any) => {
  const response = await appDashboardData(pair);
  dispatch(setDashboard(response));
};
export async function unlistenAllChannels() {
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
  console.log("unlisten calling");
  //@ts-ignore
  window.Echo.leaveChannel(); // Leave the currently subscribed channel
  //@ts-ignore
  window.Echo.leave(
    `trade-info-${localStorage.getItem("base_coin_id")}-${localStorage.getItem(
      "trade_coin_id"
    )}`
  );
  //@ts-ignore
  window.Echo.leave(
    `dashboard-${localStorage.getItem("base_coin_id")}-${localStorage.getItem(
      "trade_coin_id"
    )}`
  );
  //@ts-ignore
  window.Echo.leave(
    `dashboard-${localStorage.getItem("base_coin_id")}-${localStorage.getItem(
      "trade_coin_id"
    )}.process-${localStorage.getItem("user_id")}`
  );
  //@ts-ignore
  window.Echo.leave(
    `dashboard-${localStorage.getItem("base_coin_id")}-${localStorage.getItem(
      "trade_coin_id"
    )}.order_place_${localStorage.getItem("user_id")}`
  );
}
export async function listenMessagesFutureMarketData(setTradeDatas: any) {
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
  window.Echo.channel(`future-trade-get-exchange-market-details-data`).listen(
    `.market-details-data`,
    (e: any) => {
      setTradeDatas(e);
    }
  );
}
export async function listenMessagesFuture(
  setPosition: any,
  settransactionHistory: any,
  setorderHistory: any,
  setOpenOrder: any
) {
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
  window.Echo.channel(
    `future-trade-${localStorage.getItem("user_id")}-${localStorage.getItem(
      "base_coin_id"
    )}-${localStorage.getItem("trade_coin_id")}`
  ).listen(`.future-trade-data`, (e: any) => {
    e?.open_order_list && setOpenOrder(e.open_order_list);
    e?.order_history_list && setorderHistory(e.order_history_list);
    e?.position_order_list && setPosition(e.position_order_list);
    e?.transaction_list && settransactionHistory(e.position_order_list);
  });
}
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
export const initialDashboardCallAction =
  //@ts-ignore

    (pair: string, dashboard: any, setisLoading?: any, router: any) =>
    async (dispatch: any) => {
      // setisLoading && setisLoading(true);
      const token = Cookies.get("token");

      let response: any;

      if (pair) {
        response = await appDashboardData(pair);
        if (response?.pair_status === false) {
          response = await appDashboardData(response.pairs[0].coin_pair);
          await localStorage.setItem(
            "base_coin_id",
            response?.pairs[0]?.parent_coin_id
          );
          await localStorage.setItem(
            "trade_coin_id",
            response?.pairs[0]?.child_coin_id
          );
          // await localStorage.setItem(
          //   "current_pair",
          //   response?.pairs[0]?.coin_pair
          // );
          // router.push(`/exchange/dashboard?coin_pair=${response?.pairs[0]?.coin_pair}`)
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
        // router.push(`/exchange/dashboard?coin_pair=${response?.pairs[0]?.coin_pair}`)
      } else {
        await localStorage.setItem(
          "base_coin_id",
          response?.pairs[0]?.parent_coin_id
        );
        await localStorage.setItem(
          "trade_coin_id",
          response?.pairs[0]?.child_coin_id
        );
        // await localStorage.setItem("current_pair", response?.pairs[0]?.coin_pair);
        // router.push(`/exchange/dashboard?coin_pair=${response?.pairs[0]?.coin_pair}`)
        response?.pairs[0]?.coin_pair &&
          dispatch(setCurrentPair(response?.pairs[0]?.coin_pair));
      }

      await dispatch(setDashboard(response));
      if (!router?.query?.coin_pair) {
        router.push(
          `/exchange/dashboard?coin_pair=${response?.pairs[0]?.coin_pair}`
        );
      }
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

export const initialDashboardCallActionWithToken =
  (pair: string, dashboard: any, setisLoading?: any) =>
  async (dispatch: any) => {
    // setisLoading && setisLoading(true);
    const token = Cookies.get("token");

    if (token) {
      const ordersHistoryResponse = await ordersHistoryDashboard(
        dashboard?.order_data?.base_coin_id,
        dashboard?.order_data?.trade_coin_id,
        "dashboard",
        "buy_sell"
      );
      dispatch(setOpenOrderHistory(ordersHistoryResponse?.data?.orders));
      const sellOrderHistoryresponse = await ordersHistoryDashboard(
        dashboard?.order_data?.base_coin_id,
        dashboard?.order_data?.trade_coin_id,
        "dashboard",
        "sell"
      );
      dispatch(setSellOrderHistory(sellOrderHistoryresponse?.data?.orders));
      const buyOrderHistoryresponse = await ordersHistoryDashboard(
        dashboard?.order_data?.base_coin_id,
        dashboard?.order_data?.trade_coin_id,
        "dashboard",
        "buy"
      );
      dispatch(setBuyOrderHistory(buyOrderHistoryresponse?.data?.orders));
      const tradeOrderHistoryResponse = await tradesHistoryDashboard(
        dashboard?.order_data?.base_coin_id,
        dashboard?.order_data?.trade_coin_id,
        "dashboard"
      );
      dispatch(
        setTradeOrderHistory(tradeOrderHistoryResponse?.data?.transactions)
      );
      const marketTradesDashboardResponse = await marketTradesDashboard(
        dashboard?.order_data?.base_coin_id,
        dashboard?.order_data?.trade_coin_id,
        "dashboard",
        50
      );
      dispatch(
        setAllmarketTrades(marketTradesDashboardResponse.data.transactions)
      );
    }
    // setisLoading && setisLoading(false);
  };

export const buyLimitAppAction = async (
  amount: number,
  price: number,
  trade_coin_id: string,
  base_coin_id: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setBuyCoinData: any
) => {
  setLoading(true);
  const response = await buyLimitApp(
    amount,
    price,
    trade_coin_id,
    base_coin_id
  );
  if (response.status === true) {
    toast.success(response.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "dark-toast",
    });
    // setBuyCoinData({
    //   amount: 0,
    //   price: 0,
    //   total: 0,
    // });
  } else {
    toast.error(response.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "dark-toast",
    });
  }
  setLoading(false);
};
export const buyMarketAppAction = async (
  amount: number,
  price: number,
  trade_coin_id: string,
  base_coin_id: string,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);
  const response = await buyMarketApp(
    amount,
    price,
    trade_coin_id,
    base_coin_id
  );
  if (response.status === true) {
    toast.success(response.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "dark-toast",
    });
  } else {
    toast.error(response.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "dark-toast",
    });
  }
  setLoading(false);
};
export const buyStopLimitAppAction = async (
  amount: number,
  total: number,
  limit: number,
  stop: number,
  trade_coin_id: string,
  base_coin_id: string,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);
  const response = await buyStopLimitApp(
    amount,
    limit,
    stop,
    trade_coin_id,
    base_coin_id
  );
  if (response.status === true) {
    toast.success(response.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "dark-toast",
    });
  } else {
    toast.error(response.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "dark-toast",
    });
  }
  setLoading(false);
};
export const sellLimitAppAction = async (
  amount: number,
  price: number,
  trade_coin_id: string,
  base_coin_id: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setsellCoinData: any
) => {
  setLoading(true);
  const response = await sellLimitApp(
    amount,
    price,
    trade_coin_id,
    base_coin_id
  );
  if (response.status === true) {
    toast.success(response.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "dark-toast",
    });
    // setsellCoinData({
    //   amount: 0,
    //   price: 0,
    //   total: 0,
    // });
  } else {
    toast.error(response.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "dark-toast",
    });
  }
  setLoading(false);
};
export const sellMarketAppAction = async (
  amount: number,
  price: number,
  trade_coin_id: string,
  base_coin_id: string,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);
  const response = await sellMarketApp(
    amount,
    price,
    trade_coin_id,
    base_coin_id
  );
  if (response.status === true) {
    toast.success(response.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "dark-toast",
    });
  } else {
    toast.error(response.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "dark-toast",
    });
  }
  setLoading(false);
};
export const sellStopLimitAppAction = async (
  amount: number,
  total: number,
  limit: number,
  stop: number,
  trade_coin_id: string,
  base_coin_id: string,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);
  const response = await sellStopLimitApp(
    amount,
    limit,
    stop,
    trade_coin_id,
    base_coin_id
  );
  if (response.status === true) {
    toast.success(response.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "dark-toast",
    });
  } else {
    toast.error(response.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "dark-toast",
    });
  }
  setLoading(false);
};

export const cancelOrderAppAction = async (type: string, id: string) => {
  const response = await cancelOrderApp(type, id);
  if (response.status === true) {
    toast.success(response.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "dark-toast",
    });
  } else {
    toast.error(response.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "dark-toast",
    });
  }
};
