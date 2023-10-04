import * as React from "react";
import styles from "./index.module.css";
import { widget } from "../../public/static/charting_library";
import Datafeed from "components/exchange/api";
import {
  DISABLED_FEATURES,
  ENABLED_FEATURES,
  TIME_FRAMES,
} from "./api/chartConfig";

function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
type MyProps = {
  coinpair: any;
};
// const pazir = localStorage.getItem("current_pair")?.replace("_", "/");
export class TVChartContainer extends React.Component<MyProps> {
  static defaultProps = {
    symbol: `:`,
    interval: "15",
    containerId: "tv_chart_container",
    libraryPath: "/static/charting_library/",
    chartsStorageUrl: "https://saveload.tradingview.com",
    chartsStorageApiVersion: "1.1",
    clientId: "tradingview.com",
    userId: "public_user_id",
    fullscreen: false,
    autosize: true,
    studiesOverrides: {
      "volume.volume.color.0": "#dc3545",
      "volume.volume.color.1": "#32d777",
      "volume.volume.transparency": 0,
      "volume.volume ma.color": "#3742fa",
      "volume.volume ma.transparency": 0,
      "volume.options.showStudyArguments": false,
      "volume.options.showStudyTitles": false,
      "volume.options.showStudyValues": false,
      "volume.options.showLegend": false,
      "volume.options.showStudyOutput": false,
      "volume.options.showStudyOverlay": false,
      "volume.options.showSeriesTitle": false,
      "volume.options.showSeriesOHLC": false,
      "volume.options.showBarChange": false,
      "volume.options.showCountdown": false,
      "volume.volume ma.linewidth": 2,
      "volume.volume ma.visible": true,
    },
    overrides: {
      "mainSeriesProperties.candleStyle.upColor": "#ffffff",
      "mainSeriesProperties.candleStyle.downColor": "#000000",
      "mainSeriesProperties.candleStyle.drawBorder": true,
      "mainSeriesProperties.candleStyle.borderUpColor": "#00ff00",
      "mainSeriesProperties.candleStyle.borderDownColor": "#ff0000",
      "mainSeriesProperties.style": 1,
    },
  };

  //@ts-ignore

  //@ts-ignore
  constructor(props) {
    super(props);
    //@ts-ignore
    this.ref = React.createRef();
  }
  chartInit = (config: any) => {
    const widgetInstance = new widget(config);
    //@ts-ignore
    window.tvWidget = widgetInstance;

    //@ts-ignore
    window.tvWidget.onChartReady(() => {
      //@ts-ignore
      window.tvWidget.activeChart().createStudy(
        "Moving Average",
        false,
        false,
        {
          length: 5,
        },
        { "plot.color.0": "#9b59b6" }
      );
      //@ts-ignore
      window.tvWidget.activeChart().createStudy(
        "Moving Average",
        false,
        false,
        {
          length: 10,
        },
        { "plot.color.0": "#d35400" }
      );
      //@ts-ignore
      window.tvWidget.activeChart().createStudy(
        "Moving Average",
        false,
        false,
        {
          length: 30,
        },
        { "plot.color.0": "#00cec9" }
      );
      const localTheme = localStorage.getItem("theme");
      //@ts-ignore
      window.tvWidget.applyOverrides({
        "paneProperties.background":
          //@ts-ignore
          this.props.theme === "dark" ? "rgb(11, 14, 17)" : "#fff",
        "paneProperties.backgroundType": "solid",
        "mainSeriesProperties.candleStyle.upColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        //@ts-ignore
        "mainSeriesProperties.candleStyle.downColor":
          //@ts-ignore
          this.props.ThemeColor.red,

        "mainSeriesProperties.candleStyle.drawBorder": true,
        "mainSeriesProperties.candleStyle.borderUpColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        "mainSeriesProperties.candleStyle.borderDownColor":
          //@ts-ignore
          this.props.ThemeColor.red,
        "mainSeriesProperties.candleStyle.wickUpColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        "mainSeriesProperties.candleStyle.wickDownColor":
          //@ts-ignore
          this.props.ThemeColor.red,
        "mainSeriesProperties.hollowCandleStyle.upColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        "mainSeriesProperties.hollowCandleStyle.downColor":
          //@ts-ignore
          this.props.ThemeColor.red,
        "mainSeriesProperties.hollowCandleStyle.drawWick": true,
        "mainSeriesProperties.hollowCandleStyle.drawBorder": true,
        "mainSeriesProperties.hollowCandleStyle.borderUpColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        "mainSeriesProperties.hollowCandleStyle.borderDownColor":
          //@ts-ignore
          this.props.ThemeColor.red,
        "mainSeriesProperties.hollowCandleStyle.wickUpColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        "mainSeriesProperties.hollowCandleStyle.wickDownColor":
          //@ts-ignore
          this.props.ThemeColor.red,
        //@ts-ignore
        "mainSeriesProperties.haStyle.upColor": this.props.ThemeColor.green,
        //@ts-ignore
        "mainSeriesProperties.haStyle.downColor": this.props.ThemeColor.red,
        "mainSeriesProperties.haStyle.drawWick": true,
        "mainSeriesProperties.haStyle.drawBorder": true,
        "mainSeriesProperties.haStyle.borderUpColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        "mainSeriesProperties.haStyle.borderDownColor":
          //@ts-ignore
          this.props.ThemeColor.red,
        //@ts-ignore
        "mainSeriesProperties.haStyle.wickUpColor": this.props.ThemeColor.green,
        //@ts-ignore
        "mainSeriesProperties.haStyle.wickDownColor": this.props.ThemeColor.red,
        //@ts-ignore
        "mainSeriesProperties.barStyle.upColor": this.props.ThemeColor.green,
        //@ts-ignore
        "mainSeriesProperties.barStyle.downColor": this.props.ThemeColor.red,
        "mainSeriesProperties.barStyle.barColorsOnPrevClose": false,
        "mainSeriesProperties.barStyle.dontDrawOpen": false,
        //@ts-ignore
        "mainSeriesProperties.lineStyle.color": this.props.ThemeColor.red,
      });
    });
  };
  componentDidMount() {
    const widgetOptions = {
      height: 480,
      width: 1400,

      //@ts-ignore
      symbol: `:${this?.props?.currentPair}`,
      style: 1,
      //@ts-ignore
      theme: this.props.theme === "dark" ? "dark" : "light",
      //@ts-ignore
      datafeed: Datafeed,
      //@ts-ignore
      interval: this.props.interval,
      //@ts-ignore
      container: this.ref.current,
      //@ts-ignore
      library_path: this.props.libraryPath,
      //@ts-ignore
      locale: getLanguageFromURL() || "en",
      //@ts-ignore
      charts_storage_url: this.props.chartsStorageUrl,
      //@ts-ignore
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      //@ts-ignore
      client_id: this.props.clientId,
      //@ts-ignore
      user_id: this.props.userId,
      //@ts-ignore
      fullscreen: this.props.fullscreen,
      //@ts-ignore
      autosize: this.props.autosize,
      //@ts-ignore
      studies_overrides: this.props.studiesOverrides,
      // drawings_access: { type: "black", tools: [{ name: "Regression Trend" }] },
      //@ts-ignore
      enabled_features: ENABLED_FEATURES,
      //@ts-ignore
      disabled_features: DISABLED_FEATURES,

      //@ts-ignore
      // overrides: getChartOverrides(this.props.theme),
      custom_css_url: "css/style.css",
      //@ts-ignore
      time_frames: TIME_FRAMES,

      //@ts-ignore
      studies_overrides: {
        //@ts-ignore
        "volume.volume.color.0": this.props.ThemeColor.red,

        //@ts-ignore
        "volume.volume.color.1": this.props.ThemeColor.green,
        "volume.volume.transparency": 0,
        "volume.volume ma.color": "#9b59b6",
        "volume.volume ma.transparency": 0,
        "volume.volume ma.linewidth": 1,
        "volume.volume ma.visible": true,
      },
      toolbar: false,
    };
    //@ts-ignore
    this.chartInit(widgetOptions);
  }
  componentDidUpdate(prevProps: any) {
    //@ts-ignore

    if (this.props.theme !== prevProps.theme) {
      //@ts-ignore
      const overwriteObj = {
        "paneProperties.background":
          //@ts-ignore
          this.props.theme === "dark" ? "rgb(11, 14, 17)" : "#fff",
        "paneProperties.backgroundType": "solid",
        "mainSeriesProperties.candleStyle.upColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        //@ts-ignore
        "mainSeriesProperties.candleStyle.downColor":
          //@ts-ignore
          this.props.ThemeColor.red,

        "mainSeriesProperties.candleStyle.drawBorder": true,
        "mainSeriesProperties.candleStyle.borderUpColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        "mainSeriesProperties.candleStyle.borderDownColor":
          //@ts-ignore
          this.props.ThemeColor.red,
        "mainSeriesProperties.candleStyle.wickUpColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        "mainSeriesProperties.candleStyle.wickDownColor":
          //@ts-ignore
          this.props.ThemeColor.red,
        "mainSeriesProperties.hollowCandleStyle.upColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        "mainSeriesProperties.hollowCandleStyle.downColor":
          //@ts-ignore
          this.props.ThemeColor.red,
        "mainSeriesProperties.hollowCandleStyle.drawWick": true,
        "mainSeriesProperties.hollowCandleStyle.drawBorder": true,
        "mainSeriesProperties.hollowCandleStyle.borderUpColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        "mainSeriesProperties.hollowCandleStyle.borderDownColor":
          //@ts-ignore
          this.props.ThemeColor.red,
        "mainSeriesProperties.hollowCandleStyle.wickUpColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        "mainSeriesProperties.hollowCandleStyle.wickDownColor":
          //@ts-ignore
          this.props.ThemeColor.red,
        //@ts-ignore
        "mainSeriesProperties.haStyle.upColor": this.props.ThemeColor.green,
        //@ts-ignore
        "mainSeriesProperties.haStyle.downColor": this.props.ThemeColor.red,
        "mainSeriesProperties.haStyle.drawWick": true,
        "mainSeriesProperties.haStyle.drawBorder": true,
        "mainSeriesProperties.haStyle.borderUpColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        "mainSeriesProperties.haStyle.borderDownColor":
          //@ts-ignore
          this.props.ThemeColor.red,
        //@ts-ignore
        "mainSeriesProperties.haStyle.wickUpColor": this.props.ThemeColor.green,
        //@ts-ignore
        "mainSeriesProperties.haStyle.wickDownColor": this.props.ThemeColor.red,
        //@ts-ignore
        "mainSeriesProperties.barStyle.upColor": this.props.ThemeColor.green,
        //@ts-ignore
        "mainSeriesProperties.barStyle.downColor": this.props.ThemeColor.red,
        "mainSeriesProperties.barStyle.barColorsOnPrevClose": false,
        "mainSeriesProperties.barStyle.dontDrawOpen": false,
        //@ts-ignore
        "mainSeriesProperties.lineStyle.color": this.props.ThemeColor.red,
      };
      //@ts-ignore
      window.tvWidget.onChartReady(() => {
        //@ts-ignore
        window.tvWidget.applyOverrides(overwriteObj);

        //@ts-ignore
        window.tvWidget
          //@ts-ignore
          .changeTheme(this.props.theme === "dark" ? "Dark" : "Light")
          .then(() => {
            //@ts-ignore
            window.tvWidget.applyOverrides(overwriteObj);
          });
      });
    }
    if (
      //@ts-ignore
      this.props.ThemeColor.green !== prevProps.ThemeColor.green ||
      //@ts-ignore
      this.props.ThemeColor.red !== prevProps.ThemeColor.red
    ) {
      const overwriteObj = {
        "paneProperties.background":
          //@ts-ignore
          this.props.theme === "dark" ? "rgb(11, 14, 17)" : "#fff",
        "paneProperties.backgroundType": "solid",
        "mainSeriesProperties.candleStyle.upColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        //@ts-ignore
        "mainSeriesProperties.candleStyle.downColor":
          //@ts-ignore
          this.props.ThemeColor.red,

        "mainSeriesProperties.candleStyle.drawBorder": true,
        "mainSeriesProperties.candleStyle.borderUpColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        "mainSeriesProperties.candleStyle.borderDownColor":
          //@ts-ignore
          this.props.ThemeColor.red,
        "mainSeriesProperties.candleStyle.wickUpColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        "mainSeriesProperties.candleStyle.wickDownColor":
          //@ts-ignore
          this.props.ThemeColor.red,
        "mainSeriesProperties.hollowCandleStyle.upColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        "mainSeriesProperties.hollowCandleStyle.downColor":
          //@ts-ignore
          this.props.ThemeColor.red,
        "mainSeriesProperties.hollowCandleStyle.drawWick": true,
        "mainSeriesProperties.hollowCandleStyle.drawBorder": true,
        "mainSeriesProperties.hollowCandleStyle.borderUpColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        "mainSeriesProperties.hollowCandleStyle.borderDownColor":
          //@ts-ignore
          this.props.ThemeColor.red,
        "mainSeriesProperties.hollowCandleStyle.wickUpColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        "mainSeriesProperties.hollowCandleStyle.wickDownColor":
          //@ts-ignore
          this.props.ThemeColor.red,
        //@ts-ignore
        "mainSeriesProperties.haStyle.upColor": this.props.ThemeColor.green,
        //@ts-ignore
        "mainSeriesProperties.haStyle.downColor": this.props.ThemeColor.red,
        "mainSeriesProperties.haStyle.drawWick": true,
        "mainSeriesProperties.haStyle.drawBorder": true,
        "mainSeriesProperties.haStyle.borderUpColor":
          //@ts-ignore
          this.props.ThemeColor.green,
        "mainSeriesProperties.haStyle.borderDownColor":
          //@ts-ignore
          this.props.ThemeColor.red,
        //@ts-ignore
        "mainSeriesProperties.haStyle.wickUpColor": this.props.ThemeColor.green,
        //@ts-ignore
        "mainSeriesProperties.haStyle.wickDownColor": this.props.ThemeColor.red,
        //@ts-ignore
        "mainSeriesProperties.barStyle.upColor": this.props.ThemeColor.green,
        //@ts-ignore
        "mainSeriesProperties.barStyle.downColor": this.props.ThemeColor.red,
        "mainSeriesProperties.barStyle.barColorsOnPrevClose": false,
        "mainSeriesProperties.barStyle.dontDrawOpen": false,
        //@ts-ignore
        "mainSeriesProperties.lineStyle.color": this.props.ThemeColor.red,
      };
      //@ts-ignore
      window.tvWidget.onChartReady(() => {
        //@ts-ignore
        window.tvWidget.applyOverrides(overwriteObj);
        //@ts-ignore
        // window.tvWidget.applyStudiesOverrides({
        //   //@ts-ignore
        //   "volume.volume.color.0": this.props.ThemeColor.red,
        //   //@ts-ignore
        //   "volume.volume.color.1": this.props.ThemeColor.green,
        //   "volume.volume.transparency": 0,
        //   "volume.volume ma.color": "#3742fa",
        //   "volume.volume ma.transparency": 0,
        //   "volume.options.showStudyArguments": false,
        //   "volume.options.showStudyTitles": false,
        //   "volume.options.showStudyValues": false,
        //   "volume.options.showLegend": false,
        //   "volume.options.showStudyOutput": false,
        //   "volume.options.showStudyOverlay": false,
        //   "volume.options.showSeriesTitle": false,
        //   "volume.options.showSeriesOHLC": false,
        //   "volume.options.showBarChange": false,
        //   "volume.options.showCountdown": false,
        //   "volume.volume ma.linewidth": 2,
        //   "volume.volume ma.visible": true,
        // });
        //@ts-ignore
        window.tvWidget
          //@ts-ignore
          .changeTheme(this.props.theme === "dark" ? "Dark" : "Light")
          .then(() => {
            //@ts-ignore
            window.tvWidget.applyOverrides(overwriteObj);
          });
      });
    }
    //@ts-ignore
    if (this.props.currentPair !== prevProps.currentPair) {
      //@ts-ignore
      const newSymbol = `:${this.props.currentPair.replace("_", "/")}`;
      //@ts-ignore
      window.tvWidget.setSymbol(
        newSymbol ? newSymbol : "",
        //@ts-ignore
        this.props.interval,
        () => {}
      );
    }
  }
  componentWillUnmount() {
    //@ts-ignore
    if (window.tvWidget !== null) {
      //@ts-ignore
      window.tvWidget.remove();
      //@ts-ignore
      window.tvWidget = null;
    }
  }

  render() {
    return (
      <>
        <header className={styles.VersionHeader}></header>
        {/* @ts-ignore */}
        <div ref={this.ref} className={styles.TVChartContainer} />
      </>
    );
  }
}
