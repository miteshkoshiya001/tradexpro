export const TradeSteps = ({ step, order }: any) => {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <p>Order in escrow</p>
        <p className="px-3">Payment Complete</p>
        <p>Trade complete</p>
      </div>
      {order?.status > 4 ? (
        <>
          <div className="d-flex justify-content-between pb-5 align-items-center mt-3">
            <div
              className={`steepNumber ${
                order?.status >= 1 ? "active-step" : ""
              }`}
            >
              1
            </div>
            <div className={`steepBar mx-2 `}></div>
            <div className={`steepNumber `}>2</div>
            <div className={`steepBar mx-2 `}></div>
            <div className={`steepNumber `}>3</div>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between pb-5 align-items-center mt-3">
            <div
              className={`steepNumber ${
                order?.status >= 1 ? "active-step" : ""
              }`}
            >
              1
            </div>
            <div
              className={`steepBar mx-2 ${
                order?.status >= 2 ? "active-step" : ""
              }`}
            ></div>
            <div
              className={`steepNumber ${
                order?.status >= 2 ? "active-step" : ""
              }`}
            >
              2
            </div>
            <div
              className={`steepBar mx-2 ${
                order?.status >= 3 ? "active-step" : ""
              }`}
            ></div>
            <div
              className={`steepNumber ${
                order?.status >= 3 ? "active-step" : ""
              }`}
            >
              3
            </div>
          </div>
        </>
      )}
    </div>
  );
};
