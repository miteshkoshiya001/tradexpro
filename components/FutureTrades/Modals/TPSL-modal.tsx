import SectionLoading from "components/common/SectionLoading";
import { CROSS, ISOLATED } from "helpers/core-constants";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { CiMoneyCheck1 } from "react-icons/ci";
import { getTpslFuture } from "service/futureTrade";

const TpslModal = ({ uid }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("common");
  const toggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  const getTPSLDetails = async () => {
    setLoading(true);
    const { data } = await getTpslFuture(uid);
    setDetails(data);
    setLoading(false);
  };
  useEffect(() => {
    isModalOpen && getTPSLDetails();
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        id=""
        data-toggle="pill"
        role="tab"
        aria-controls="pills-transfer-1"
        aria-selected="true"
        onClick={toggle}
      >
        <CiMoneyCheck1 size={24} className="ml-3" />
      </div>
      {isModalOpen && (
        <div id="demo-modal" className="gift-card-modal">
          {loading ? (
            <SectionLoading />
          ) : (
            <div className="future-modal__content p-5">
              <h6 className="text-center">Take Profit and Stop Loss</h6>
              <div className="mb-3">
                <div className="position-content">
                  <span>Side</span>
                  <span>
                    {details?.side === 1 ? (
                      <span className="text-success">Buy</span>
                    ) : (
                      <span className="text-danger">Sell</span>
                    )}
                  </span>
                </div>
                <div className="position-content">
                  <span>Amount</span>
                  <span>
                    {details?.amount_in_trade_coin}
                    {details?.trade_coin_type}
                  </span>
                </div>
                <div className="position-content">
                  <span>Stop Price</span>
                  <span>
                    {Number(details?.stop_price) > 0
                      ? Number(details?.stop_price)
                      : Number(details?.price)}
                  </span>
                </div>
                <div className="position-content">
                  <span>Trigger</span>
                  <span>Mark Price</span>
                </div>
                <div className="position-content">
                  <span>Reduce Only</span>
                  <span>False</span>
                </div>
              </div>
              {details?.children?.length > 0 && (
                <div className="row mt-2">
                  <div className="col-6">
                    <h6 className="text-center mb-2">
                      If order B is filled fully. order C will be canceled.
                    </h6>
                    <div className="mb-3">
                      <div className="position-content">
                        <span>Side</span>
                        <span>
                          {details?.children[0]?.side === 1 ? (
                            <span className="text-danger">Sell</span>
                          ) : (
                            <span className="text-success">Buy</span>
                          )}
                        </span>
                      </div>
                      <div className="position-content">
                        <span>Amount</span>
                        <span>
                          {details?.children[0]?.amount_in_trade_coin}
                          {details?.children[0]?.trade_coin_type}
                        </span>
                      </div>
                      <div className="position-content">
                        <span>Stop Price</span>
                        <span>
                          {Number(details?.children[0]?.take_profit_price) > 0
                            ? Number(details?.children[0]?.take_profit_price)
                            : Number(details?.children[0]?.stop_loss_price)}
                        </span>
                      </div>
                      <div className="position-content">
                        <span>Trigger</span>
                        <span>Mark Price</span>
                      </div>
                      <div className="position-content">
                        <span>Reduce Only</span>
                        <span>true</span>
                      </div>
                    </div>
                  </div>
                  {details?.children?.length > 1 && (
                    <div className="col-6">
                      <h6 className="text-center mb-2">
                        If order C is filled fully, order B will be cancelled
                      </h6>
                      <div className="mb-3">
                        <div className="position-content">
                          <span>Side</span>
                          <span>
                            {details?.children[1]?.side === 1 ? (
                              <span className="text-danger">Sell</span>
                            ) : (
                              <span className="text-success">Buy</span>
                            )}
                          </span>
                        </div>
                        <div className="position-content">
                          <span>Amount</span>
                          <span>
                            {details?.children[1]?.amount_in_trade_coin}
                            {details?.children[1]?.trade_coin_type}
                          </span>
                        </div>
                        <div className="position-content">
                          <span>Stop Price</span>
                          <span>
                            {Number(details?.children[1]?.take_profit_price) > 0
                              ? Number(details?.children[1]?.take_profit_price)
                              : Number(details?.children[1]?.stop_loss_price)}
                          </span>
                        </div>
                        <div className="position-content">
                          <span>Trigger</span>
                          <span>Mark Price</span>
                        </div>
                        <div className="position-content">
                          <span>Reduce Only</span>
                          <span>true</span>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  )}
                </div>
              )}

              <div className="position-button-area">
                <button
                  style={{
                    width: "98%",
                    margin: 2,
                  }}
                  className="primary-btn"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TpslModal;
