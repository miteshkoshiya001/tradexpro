import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Leverage = ({ leverage, setLeverage, dashboard }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leverages, setLeverages] = useState<any>([]);
  const { t } = useTranslation("common");
  // dashboard?.order_data?.max_leverage;
  const generateLeverage = () => {
    const leverageArray = [];
    const limit = dashboard?.order_data?.max_leverage;
    if (dashboard?.order_data?.max_leverage == 0) {
      setLeverage(0);
      return;
    }
    if (typeof limit !== "undefined") {
      if (limit >= 10) {
        leverageArray.push(1, 5, 10);

        let currentLeverage = 20;
        while (currentLeverage <= limit) {
          leverageArray.push(currentLeverage);
          currentLeverage += 10;
        }
      } else if (limit < 5) {
        leverageArray.push(1);
      } else if (limit <= 5) {
        leverageArray.push(1, 5);
      }
    } else {
      // Handle the case when limit is undefined or not accessible
      leverageArray.push(1);
    }

    setLeverages(leverageArray);
    if (leverageArray.length) {
      setLeverage(leverageArray[0]);
    }
  };
  const toggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const modifyLeverage = (value: number) => {
    setLeverage(value);
  };
  useEffect(() => {
    dashboard?.order_data?.max_leverage && generateLeverage();
  }, [dashboard?.order_data?.max_leverage]);

  return (
    <>
      <div
        id=""
        data-toggle="pill"
        role="tab"
        aria-controls="pills-transfer-1"
        aria-selected="true"
        onClick={toggle}
        className={`modal-button-future`}
      >
        {leverage}x
      </div>
      {isModalOpen && (
        <div id="demo-modal" className="gift-card-modal">
          <div className="future-modal__content p-5">
            <h3>Leverage</h3>
            <div className="leverage-section">{leverage}x</div>
            <div className="mt-3 percent-container mb-5 d-flex flex-wrap">
              {leverages?.map((leverage: number, index: number) => (
                <span
                  key={index}
                  className="percent-btn col-3 mb-2"
                  onClick={() => {
                    modifyLeverage(leverage);
                  }}
                >
                  {leverage}x
                </span>
              ))}
            </div>
            <div>
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
        </div>
      )}
    </>
  );
};

export default Leverage;
