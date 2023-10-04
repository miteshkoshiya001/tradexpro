import React from "react";

export default function MarketsCardItem({ item }: any) {
  return (
    <div className="card-for-markets-item">
      <div className="row">
        <div className="col-4 d-flex align-items-center">
          <img
            className="icon mr-2"
            src={item?.coin_icon || "/bitcoin.png"}
            alt="coin"
            width="25px"
            height="25px"
          />
          <p>{item?.coin_type}</p>
        </div>

        <div className="col-4">
          <p>{item?.currency_symbol}{parseFloat(item?.usdt_price).toFixed(2)}</p>
        </div>
        <div className="col-4">
          <p
            className={`${
              parseFloat(item?.change) >= 0 ? "text-success" : "text-danger"
            } `}
          >
            {item?.change >= 0
              ? "+" + parseFloat(item?.change).toFixed(2)
              : parseFloat(item?.change).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
