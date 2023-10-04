import historyProvider from "./historyProvider";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

var _subs: any = [];

export default {
  subscribeBars: function (
    symbolInfo: any,
    resolution: any,
    updateCb: any,
    uid: any,
    resetCache: any
  ) {
    const channelString = createChannelString(symbolInfo);
    const newSub = {
      channelString,
      uid,
      resolution,
      symbolInfo,
      lastBar: historyProvider.history[symbolInfo.name].lastBar,
      listener: updateCb,
    };
    _subs.push(newSub);
  },
  unsubscribeBars(uid: any) {
    const subIndex = _subs.findIndex((e: any) => e.uid === uid);
    if (subIndex === -1) {
      return;
    }
    const sub = _subs[subIndex];
    _subs.splice(subIndex, 1);
  },
};

export function updateChart(e: any) {
  const data = {
    ts: e.ts,
    price: e.price,
    total: e.total,
    base_coin_id: e.base_coin_id,
    trade_coin_id: e.trade_coin_id,
  };
  // const sub = _subs.find(
  //   (obj: any) =>
  //     obj.channelString === `${data.base_coin_id}~${data.trade_coin_id}`
  // );
  const sub = _subs[0];
  if (sub) {
    // disregard the initial catchup snapshot of trades for already closed candles
    // if (data.ts < sub.lastBar.time / 1000) {
    //   return;
    // }

    const _lastBar = updateBar(data, sub);
    // send the most recent bar back to TV's realtimeUpdate callback
    sub.listener(_lastBar);
    // update our own record of lastBar
    sub.lastBar = _lastBar;
  }
}

// Take a single trade, and subscription record, return updated bar
function updateBar(data: any, sub: any) {
  const lastBar = sub.lastBar;
  let resolution = sub.resolution;
  if (resolution.includes("D")) {
    // 1 day in minutes === 1440
    resolution = 1440;
  }

  const coeff = resolution * 60;
  const rounded = Math.floor(data.ts / coeff) * coeff;
  const lastBarSec = lastBar.time / 1000;
  let _lastBar;
  if (rounded > lastBarSec) {
    // create a new candle, use last close as open **PERSONAL CHOICE**
    _lastBar = {
      time: rounded * 1000,
      open: lastBar.close,
      high: lastBar.close,
      low: lastBar.close,
      close: data.price,
      volume: parseFloat(data.total),
    };

    if (data.price < _lastBar.low) {
      _lastBar.low = data.price;
    } else if (data.price > _lastBar.high) {
      _lastBar.high = data.price;
    }
    lastBar.volume = parseFloat(lastBar.volume) + parseFloat(data.total);
    _lastBar.close = data.price;
  } else {
    // update lastBar candle!
    if (data.price < lastBar.low) {
      lastBar.low = data.price;
    } else if (data.price > lastBar.high) {
      lastBar.high = data.price;
    }

    lastBar.volume = parseFloat(lastBar.volume) + parseFloat(data.total);
    lastBar.close = data.price;
    _lastBar = lastBar;
  }
  return _lastBar;
}
// takes symbolInfo object as input and creates the subscription string to send to CryptoCompare
function createChannelString(symbolInfo: any) {
  const channel = symbolInfo.name.split(":")[1].split("/");
  const exchange = channel[0];
  const to = channel[1];
  const from = channel[0];
  // subscribe to the CryptoCompare trade channel for the pair and exchange
  return `${from}~${to}`;
}
export function last(array: any) {
  return array[array.length - 1];
}
