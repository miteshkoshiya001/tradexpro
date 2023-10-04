export const TradeDetails = ({ details }: any) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-4 col-6 mt-4">
          <p>30d Trades</p>
          <div className="d-flex align-items-center">
            <h6 className="mr-1">
              {" "}
              {details?.completion_rate_30d
                ? details?.completion_rate_30d
                : 0}{" "}
            </h6>
            %
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-6 mt-4">
          <p>First order at</p>
          <div className="d-flex align-items-center">
            <h6 className="mr-1"> {details?.first_order_at} </h6> days ago
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-6 mt-4">
          <p>Negative reviews</p>
          <div className="d-flex align-items-center">
            <h6 className="mr-1"> {details?.negative} </h6>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-6 mt-4">
          <p>Positive reviews</p>
          <div className="d-flex align-items-center">
            <h6 className="mr-1"> {details?.positive} </h6>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-6 mt-4">
          <p>Positive reviews percentage</p>
          <div className="d-flex align-items-center">
            <h6 className="mr-1"> {details?.positive_feedback}%</h6>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-6 mt-4">
          <p>Total trades</p>
          <div className="d-flex align-items-center">
            <h6 className="mr-1"> {details?.total_trade} </h6>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-6 mt-4">
          <p>Registered at</p>
          <div className="d-flex align-items-center">
            <h6 className="mr-1"> {details?.user_register_at} days ago</h6>
          </div>
        </div>
      </div>
    </div>
  );
};
