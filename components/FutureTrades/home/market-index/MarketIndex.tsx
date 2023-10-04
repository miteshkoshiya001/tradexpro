import React from "react";

import MarketIndexCard from "./MarketIndexCard";
import { NoItemFound } from "components/NoItemFound/NoItemFound";

export default function MarketIndex({ tradeDatas }: any) {
  return (
    <div className="container">
      <div className="row pt-3">
        <div className="col-12 px-2" style={{ marginBottom: "24px" }}>
          <h4>Market Index</h4>
        </div>
        <div className="col-12 px-2">
          {Object.keys(tradeDatas).length !== 0 ? (
            <div className="row">
              {tradeDatas?.coins?.map((item: any, index: any) => (
                <div className="col-md-6 col-12" key={index}>
                  <MarketIndexCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <NoItemFound />
          )}
        </div>
      </div>
    </div>
  );
}
