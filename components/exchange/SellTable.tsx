import useTranslation from "next-translate/useTranslation";
import React, { useEffect } from "react";

const TradesTable = ({ marketTrades }: any) => {
  const { t } = useTranslation("common");
  const [trades, setTrades] = React.useState<any>([]);
  const setTradeData = () => {
    let allTradeData = [];
    marketTrades.length &&
      allTradeData.push(marketTrades[marketTrades.length - 1]);
    for (let i = marketTrades.length; i >= 0; i--) {
      if (
        parseFloat(marketTrades[i]?.price) >
        parseFloat(marketTrades[i - 1]?.price)
      ) {
        allTradeData.push({
          type: "red",
          price: marketTrades[i - 1]?.price,
          amount: marketTrades[i - 1]?.amount,
          time: marketTrades[i - 1]?.time,
        });
      } else if (
        parseFloat(marketTrades[i]?.price) <
        parseFloat(marketTrades[i - 1]?.price)
      ) {
        allTradeData.push({
          type: "green",
          price: marketTrades[i - 1]?.price,
          amount: marketTrades[i - 1]?.amount,
          time: marketTrades[i - 1]?.time,
        });
      } else if (
        parseFloat(marketTrades[i]?.price) ===
        parseFloat(marketTrades[i - 1]?.price)
      ) {
        allTradeData.push({
          type: "white",
          price: marketTrades[i - 1]?.price,
          amount: marketTrades[i - 1]?.amount,
          time: marketTrades[i - 1]?.time,
        });
      }
    }
    setTrades(allTradeData.reverse());
  };
  useEffect(() => {
    setTradeData();
  }, [marketTrades]);
  return (
    <tbody>
      {marketTrades?.length === 0 ? (
        <tr className="odd">
          <td valign="top" colSpan={3} className="text-center">
            {t("No data available in table")}
          </td>
        </tr>
      ) : (
        trades?.map((item: any, index: number) => (
          <tr className="odd dataTable-white" key={index} style={{lineHeight: '1.3'}}>
            <td>
              <div className={"asset"} style={{padding: '4px'}}>
                <span
                  className={
                    item.type === "green"
                      ? "greenText"
                      : item.type === "red"
                      ? "redText"
                      : ""
                  }
                >
                  {item?.price}
                </span>
              </div>
            </td>
            <td>
              <div className="asset" style={{padding: '4px'}}>
                <span className="">{item?.amount}</span>
              </div>
            </td>
            <td>
              <div className="asset" style={{padding: '4px'}}>
                <span className="">{item?.time}</span>
              </div>
            </td>
          </tr>
        ))
      )}
    </tbody>
  );
};

export default TradesTable;
