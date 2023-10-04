import historyProvider from "./demoHistoryProvider";
import stream from "./stream";

const supportedResolutions = [
  "1",
  "3",
  "5",
  "15",
  "30",
  "60",
  "120",
  "240",
  "360",
  "D",
  "W",
  "M",
];

const config = {
  supported_resolutions: supportedResolutions,
};

export default {
  onReady: (cb: any) => {
    cb(config);
  },
  searchSymbols: (
    userInput: any,
    exchange: any,
    symbolType: any,
    onResultReadyCallback: any
  ) => {},
  resolveSymbol: (
    symbolName: any,
    onSymbolResolvedCallback: any,
    onResolveErrorCallback: any
  ) => {
    // Expects a symbolInfo object in response
    var split_data = symbolName.split(/[:/]/);
    var symbol_stub = {
      name: symbolName,
      description: "",
      type: "crypto",
      session: "24x7",
      timezone: "Etc/UTC",
      ticker: symbolName,
      exchange: split_data[0],
      minmov: 1,
      pricescale: 100000000,
      has_intraday: true,
      intraday_multipliers: ["1", "60"],
      supported_resolution: supportedResolutions,
      volume_precision: 8,
      data_status: "streaming",
    };

    setTimeout(function () {
      onSymbolResolvedCallback(symbol_stub);
    }, 0);
  },

  getBars: function (
    symbolInfo: any,
    resolution: any,
    periodParams: any,
    onHistoryCallback: any,
    onError: any,
    interval: any
  ) {
    const { from, to } = periodParams;
    const countBack = periodParams.countBack;
    const countForward = periodParams.countForward;

    historyProvider
      .getBars(
        symbolInfo,
        resolution,
        from * 1000,
        to * 1000,
        countBack,
        countForward
      )
      .then((bars: any) => {
        if (bars.length) {
          // Calculate the Moving Average (MA)
          const maPeriod = 20; // Adjust this value as needed
          const maValues = calculateMovingAverage(bars, maPeriod);

          // Add MA values to each bar
          const barsWithMA = bars.map((bar: any, index: number) => {
            return {
              ...bar,
              ma: maValues[index],
            };
          });

          onHistoryCallback(barsWithMA, { noData: false });
        } else {
          onHistoryCallback(bars, { noData: true });
        }
      })
      .catch((err: any) => {
        onError(err);
      });
  },

  subscribeBars: (
    symbolInfo: any,
    resolution: any,
    onRealtimeCallback: any,
    subscribeUID: any,
    onResetCacheNeededCallback: any
  ) => {
    stream.subscribeBars(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscribeUID,
      onResetCacheNeededCallback
    );
  },

  unsubscribeBars: (subscriberUID: any) => {
    stream.unsubscribeBars(subscriberUID);
  },

  calculateHistoryDepth: (
    resolution: any,
    resolutionBack: any,
    intervalBack: any
  ) => {
    // Optional
    // While optional, this makes sure we request 24 hours of minute data at a time
    // CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
    return resolution < 60
      ? { resolutionBack: "D", intervalBack: "1" }
      : undefined;
  },

  getMarks: (
    symbolInfo: any,
    startDate: any,
    endDate: any,
    onDataCallback: any,
    resolution: any
  ) => {
    // Optional
  },

  getTimeScaleMarks: (
    symbolInfo: any,
    startDate: any,
    endDate: any,
    onDataCallback: any,
    resolution: any
  ) => {
    // Optional
  },

  getServerTime: (cb: any) => {},
};

function calculateMovingAverage(bars: any, period: number) {
  const maValues = [];

  for (let i = period - 1; i < bars.length; i++) {
    const closePrices = bars
      .slice(i - period + 1, i + 1)
      .map((bar: any) => bar.close);
    const sum = closePrices.reduce(
      (total: number, price: number) => total + price,
      0
    );
    const ma = sum / period;
    maValues.push(ma);
  }

  return maValues;
}
