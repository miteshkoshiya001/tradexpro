import React from "react";

export default function HighestSearchedItem({ item }: any) {
  return (
    <div className="d-flex justify-content-between">
      <div>
        <h6 className="d-inline-block text-14 mr-2">
          {item.child_coin_name}/{item.parent_coin_name}
        </h6>
        <span className="text-12 text-color-4">Prepetual</span>
      </div>
      <p
        style={{
          color: Number(item.price_change) >= 0 ? "#0ecb81" : "#f6465d",
        }}
      >
        {parseFloat(item.price_change).toFixed(4)}%
      </p>
    </div>
  );
}
