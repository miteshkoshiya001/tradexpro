import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import { RootState } from "state/store";
import { setCurrentPair } from "state/reducer/demoExchange";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import DataTable from "react-data-table-component";
import { setLoading } from "state/reducer/user";
import { unlistenAllChannels } from "state/actions/demoExchange";
const DemoSelectCurrency = () => {
  const router = useRouter();
  const [pairs, setPairs] = React.useState([]);
  const { t } = useTranslation("common");
  const { dashboard } = useSelector((state: RootState) => state.demoExchange);
  const customStyles = {
    rows: {
      style: {
        backgroundColor: "var(--main-background-color)",
        color: "var(--font-color)",
        // borderColor: "var(--border-color)",
        "&:not(:last-of-type)": {
          border: "unset",
        },
        minHeight: "20px",
      },
    },
    headRow: {
      style: {
        minHeight: "20px",
        border: "unset",
      },
    },
    headCells: {
      style: {
        backgroundColor: "var(--main-background-color)",
        color: "var(--font-color)",
        // borderColor: "var(--border-color)",
        padding: "4px",
        justifyContent: "flex-end",
        "&:first-child": {
          justifyContent: "flex-start",
        },
      },
    },
    cells: {
      style: {
        backgroundColor: "var(--main-background-color)",
        color: "var(--font-color)",
        // borderColor: "var(--border-color)",
        fontSize: "11px",
        cursor: "pointer",
        padding: "4px",
        justifyContent: "flex-end",
        "&:first-child": {
          justifyContent: "flex-start",
        },
      },
    },
  };
  const columns = [
    {
      name: t("Coin"),
      selector: (row: any) => row.coin,
      sortable: true,
      cell: (row: any) => {
        return (
          <Tooltip
            placement={"left"}
            overlay={
              <span>
                <span>
                  {t("Last Price")}: {row.last_price}
                </span>
              </span>
            }
            trigger={["hover"]}
            overlayClassName="rcTooltipOverlay"
          >
            <div
              onClick={async () => {
                await unlistenAllChannels();
                await localStorage.setItem("base_coin_id", row?.parent_coin_id);
                await localStorage.setItem("trade_coin_id", row?.child_coin_id);
                // await localStorage.setItem("current_pair", row.coin_pair);
                router.push(`/demo-trade?coin_pair=${row.coin_pair}`);
                await localStorage.setItem("coin_pair_id", row.coin_pair_id);
                await dispatch(setCurrentPair(row.coin_pair));
                // router.reload();
              }}
            >
              <span className="coin-name">{row?.coin_pair_name}</span>
            </div>
          </Tooltip>
        );
      },
    },
    {
      name: t("Last"),
      selector: (row: any) => row.price,
      sortable: true,
      cell: (row: any) => {
        return (
          <Tooltip
            placement={"left"}
            overlay={
              <span>
                <span>
                  {t("Last Price")}: {row.last_price}
                </span>
              </span>
            }
            trigger={["hover"]}
            overlayClassName="rcTooltipOverlay"
          >
            <span
              className="text-center w-40"
              onClick={async () => {
                await unlistenAllChannels();
                await localStorage.setItem("base_coin_id", row?.parent_coin_id);
                await localStorage.setItem("trade_coin_id", row?.child_coin_id);
                // await localStorage.setItem("current_pair", row.coin_pair);
                router.push(`/demo-trade?coin_pair=${row.coin_pair}`);
                await dispatch(setCurrentPair(row.coin_pair));
                // router.reload();
              }}
            >
              {parseFloat(row.last_price).toFixed(4)}
            </span>
          </Tooltip>
        );
      },
    },
    {
      name: t("Change"),

      selector: (row: any) => row.price_change,
      sortable: true,
      cell: (row: any) => {
        return (
          <Tooltip
            placement={"left"}
            overlay={
              <span>
                <span>
                  {t("Last Price")}: {row.last_price}
                </span>
              </span>
            }
            trigger={["hover"]}
            overlayClassName="rcTooltipOverlay"
          >
            <span
              className={
                parseFloat(row?.price_change) >= 0
                  ? "text-success"
                  : "text-danger"
              }
              style={{ fontSize: "11px" }}
              onClick={async () => {
                await unlistenAllChannels();
                await localStorage.setItem("base_coin_id", row?.parent_coin_id);
                await localStorage.setItem("trade_coin_id", row?.child_coin_id);
                // await localStorage.setItem("current_pair", row.coin_pair);
                router.push(`/demo-trade?coin_pair=${row.coin_pair}`);

                await dispatch(setCurrentPair(row.coin_pair));
                // router.reload();
              }}
            >
              {parseFloat(row.price_change).toFixed(2)}%
            </span>
          </Tooltip>
        );
      },
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    if (dashboard?.pairs) {
      setPairs(dashboard.pairs);
    }
  }, [dashboard?.pairs]);
  return (
    <div
      className="cp-user-buy-coin-content-area dropdown-menu"
      aria-labelledby="dropdownMenuButton"
    >
      <div className="cp-user-wallet-table dashboard-coin_pairs table-responsive">
        <div
          id="exchangeCoinPair_wrapper"
          className="dataTables_wrapper no-footer"
        >
          <div id="exchangeCoinPair_filter" className="dataTables_filter">
            <div className="currency-search-box">
              <input
                type="search"
                className=""
                placeholder={t("Search")}
                aria-controls="exchangeCoinPair"
                onChange={(e) => {
                  // on typing end

                  const searchText = e.target.value;
                  const filteredPairs = dashboard.pairs.filter((pair: any) => {
                    return pair?.coin_pair_name
                      .toLowerCase()
                      .includes(searchText.toLowerCase());
                  });
                  setPairs(filteredPairs);
                }}
              />
              <svg className="" width="24" height="24" viewBox="0 0 16 16">
                <path d="M6.667 1.334c2.945 0 5.333 2.388 5.333 5.333a5.31 5.31 0 0 1-1.12 3.27l3.592 3.592c.26.26.26.682 0 .943s-.682.26-.943 0l-3.591-3.592a5.31 5.31 0 0 1-3.27 1.12c-2.946 0-5.333-2.388-5.333-5.333s2.388-5.333 5.333-5.333zm0 1.333a4 4 0 1 0 0 8 4 4 0 1 0 0-8z"></path>
              </svg>
            </div>
          </div>
          <div
            id="exchangeCoinPair_processing"
            className="dataTables_processing"
            style={{ display: "none" }}
          >
            {t("Processing")}...
          </div>
          <div className="dataTables_scroll">
            <div
              className="dataTables_scrollHead"
              style={{
                overflow: "hidden",
                position: "relative",
                border: "0px",
                width: "100%",
              }}
            >
              <div
                className="dataTables_scrollHeadInner"
                style={{
                  boxSizing: "content-box",
                  width: "415px",
                  paddingRight: "17px",
                }}
              ></div>
            </div>
            <div
              className="dataTables_scrollBody always-show-sort-arrow"
              style={{
                position: "relative",
                overflow: "auto",
                height: "448px",
                width: "100%",
              }}
            >
              <DataTable
                columns={columns}
                data={pairs}
                customStyles={customStyles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoSelectCurrency;
