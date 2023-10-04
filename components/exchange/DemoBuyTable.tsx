import React, { useEffect } from "react";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import { useDispatch } from "react-redux";
import {
  setBuyAmount,
  setSellAmount,
  setSellPrice,
  setBuyPrice,
} from "state/reducer/demoExchange";
import useTranslation from "next-translate/useTranslation";
const DemoBuyTable = ({ buy, show }: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const changeSellPrice = (price: number, amount: number) => {
    dispatch(setSellPrice(price));
    dispatch(setSellAmount(amount));
    dispatch(setBuyAmount(amount));
    dispatch(setBuyPrice(price));
  };
  const [buyData, setBuyData] = React.useState<any>([]);
  const [summary, setSummary] = React.useState<any>({
    amount: 0,
    total: 0,
  });
  useEffect(() => {
    const Array = show ? [...buy].reverse().slice(-show) : [...buy].reverse();
    setBuyData(Array);
  }, [buy]);
  return (
    <tbody>
      {buyData?.length > 0 ? (
        buyData?.map((item: any, index: number) => (
          <Tooltip
            placement={"right"}
            overlay={
              <span>
                <span>
                  {t("Avg Price")}: {parseFloat(item.price).toFixed(8)}
                </span>
                <br />
                <span>
                  {t("Amount")}: {parseFloat(summary.amount)}
                </span>
                <br />

                <span>
                  {t("Total")}: {parseFloat(summary.total).toFixed(5)}
                </span>
              </span>
            }
            trigger={["hover"]}
            key={index}
            overlayClassName="rcTooltipOverlay"
          >
            <tr
              className="odd trade_tableList d-table-row"
              onClick={() => changeSellPrice(item.price, item.amount)}
              onMouseEnter={() => {
                const selectedIndex = index;
                const lastIndex = buy.length - 1;
                let sumtotal = 0;
                let sumAmount = 0;
                for (let i = selectedIndex; i <= lastIndex; i++) {
                  sumtotal += parseFloat(buy[i].total);
                  sumAmount += parseFloat(buy[i].amount);
                }
                setSummary({
                  amount: sumAmount,
                  total: sumtotal,
                });
              }}
            >
              <>
                <td>
                  <div className="asset">
                    <span className="text-danger">{item.price}</span>
                  </div>
                </td>
                <td>
                  <div className="asset">
                    <span className="asset-name">{item.amount} </span>
                  </div>
                </td>
                <td>
                  <div className="asset">
                    <span className="asset-name">
                      {parseFloat(item.total).toFixed(2)}
                    </span>
                  </div>
                </td>
                <div
                  className="progress-red"
                  style={{
                    width: `${
                      parseFloat(item?.percentage)
                        ? parseFloat(item?.percentage)
                        : 0
                    }%`,
                  }}
                ></div>
              </>
            </tr>
          </Tooltip>
        ))
      ) : (
        <tr className="odd">
          <td valign="top" colSpan={12} className="dataTables_empty">
            {t("No data available in table")}
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default DemoBuyTable;
