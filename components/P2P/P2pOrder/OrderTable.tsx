import { NoItemFound } from "components/NoItemFound/NoItemFound";
import SectionLoading from "components/common/SectionLoading";
import Link from "next/link";
import { useEffect, useState } from "react";
import { OrderFilter } from "./OrderFilter";
import { myP2pOrderListData } from "service/p2p";
import { TRADE_STATUS_CANCELED, TRADE_STATUS_CANCELED_TIME_EXPIRED, TRADE_STATUS_ESCROW, TRADE_STATUS_PAYMENT_DONE, TRADE_STATUS_REFUNDED_BY_ADMIN } from "helpers/core-constants";

export const OrderTable = ({ actionFunction, filter = false }: any) => {
  const [fromDate, setFromData] = useState();
  const [toDate, setToData] = useState();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCoin, setSelectedCoins] = useState("all");
  const [processing, setProcessing] = useState<boolean>(false);
  const [history, setHistory] = useState<any>([]);
  const [stillHistory, setStillHistory] = useState<any>([]);
  const [filterData, setfilterData] = useState<any>([]);
  const LinkTopaginationString = (page: any) => {
    const url = page.url.split("?")[1];
    const number = url.split("=")[1];
    actionFunction(
      5,
      parseInt(number),
      setHistory,
      setProcessing,
      setStillHistory,
      selectedStatus,
      selectedCoin,
      fromDate,
      toDate
    );
  };
  const getFilterData = async () => {
    const response = await myP2pOrderListData();
    setfilterData(response.data);
  };
  useEffect(() => {
    actionFunction(
      5,
      1,
      setHistory,
      setProcessing,
      setStillHistory,
      selectedStatus,
      selectedCoin,
      fromDate,
      toDate
    );
    getFilterData();
  }, [fromDate, toDate, selectedStatus, selectedCoin]);
  if (history?.length <= 0 || !history)
    return (
      <div className="container">
        {filter && (
          <OrderFilter
            setSelectedStatus={setSelectedStatus}
            filterData={filterData}
            setSelectedCoins={setSelectedCoins}
            setFromData={setFromData}
            setToData={setToData}
          />
        )}
        <NoItemFound />
      </div>
    );
  return (
    <div className="container">
      {filter && (
        <OrderFilter
          setSelectedStatus={setSelectedStatus}
          filterData={filterData}
          setSelectedCoins={setSelectedCoins}
          setFromData={setFromData}
          setToData={setToData}
        />
      )}
      <div className="row">
        <div className="col-12">
          <div className="table-responsive overflow-hidden">
            <table className="table mt-4">
              <thead>
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Price</th>
                  <th scope="col">Seller fees</th>
                  <th scope="col">Status</th>
                  <th scope="col">Operation</th>
                </tr>
              </thead>
              <tbody>
                {history?.map((item: any, index: any) => (
                  <tr className="tableRow" key={index}>
                    <td>
                      <div className="tableImg d-flex align-items-center">
                        <h6 className="">{item.order_id}</h6>
                      </div>
                    </td>
                    <td>
                      <h6 className="mx-2">
                        {parseFloat(item.amount)} {item.coin_type}
                      </h6>
                    </td>
                    <td>
                      {parseFloat(item.price)} {item.currency}
                    </td>
                    <td>{item.seller_fees}</td>
                    <td>
                      {parseInt(item?.is_reported) !== 0
                        ? "Disputed"
                        : parseInt(item.is_success) === 1
                        ? "Completed"
                        : parseInt(item.status) === TRADE_STATUS_ESCROW
                        ? "In Escrowed"
                        : parseInt(item.status) === TRADE_STATUS_PAYMENT_DONE
                        ? "Payment Complete"
                        : parseInt(item.status) ===
                          TRADE_STATUS_CANCELED_TIME_EXPIRED
                        ? "Time Expired"
                        : parseInt(item.status) === TRADE_STATUS_CANCELED ||
                          parseInt(item.status) ===
                            TRADE_STATUS_REFUNDED_BY_ADMIN
                        ? "Cancelled"
                        : parseInt(item.is_success) === 0
                        ? "Pending"
                        : ""}
                    </td>

                    <td>
                      <Link href={`/p2p/trade/${item.uid}`}>
                        <p className="text-warning">Details</p>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {history?.length > 0 && (
              <div className="pagination-wrapper mb-34" id="assetBalances_paginate">
                <span>
                  {stillHistory?.links?.map((link: any, index: number) =>
                    link.label === "&laquo; Previous" ? (
                      <a
                        key={index}
                        className="paginate-button"
                        onClick={() => {
                          if (link.url) LinkTopaginationString(link);
                        }}
                      >
                        <i className="fa fa-angle-left"></i>
                      </a>
                    ) : link.label === "Next &raquo;" ? (
                      <a
                        className="paginate-button"
                        onClick={() => LinkTopaginationString(link)}
                        key={index}
                      >
                        <i className="fa fa-angle-right"></i>
                      </a>
                    ) : (
                      <a
                        className={`paginate_button paginate-number ${
                          link.active === true && "text-warning"
                        }`}
                        aria-controls="assetBalances"
                        data-dt-idx="1"
                        onClick={() => LinkTopaginationString(link)}
                        key={index}
                      >
                        {link.label}
                      </a>
                    )
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
