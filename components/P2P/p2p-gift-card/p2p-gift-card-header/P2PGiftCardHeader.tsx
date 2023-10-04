import React from "react";

export default function P2PGiftCardHeader({ title }: any) {
  return (
    <div className="adPost_bg py-3 mb-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
