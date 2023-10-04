import React from "react";
import MarketsCardItem from "./MarketsCardItem";

export default function MarketsCards({ title, cardItems }: any) {
  return (
    <div className="p-3 card-for-markets">
      <div className="row">
        <div className="col-12 mb-3">
          <p className="text-12">{title}</p>
        </div>
        {cardItems?.length > 0
          ? cardItems.map((item: any, index: any) => (
              <div className="col-md-12 mb-2 " key={index}>
                <MarketsCardItem item={item}/>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
