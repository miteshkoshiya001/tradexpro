import { CROSS, ISOLATED } from "helpers/core-constants";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "state/store";

const Isolated = ({
  isolated,
  setIsolated,
  disableCross,
  disableIsolated,
}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation("common");

  const toggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const modifyIsolated = (value: number) => {
    setIsolated(value);
  };
  const { currentPair } = useSelector(
    (state: RootState) => state.futureExchange
  );
  const crossMarginDescription =
    "In Cross Margin Mode, the trader's entire account balance is used as collateral for all open positions.The available margin for opening new positions is determined by the total account equity rather than individual positions.";
  const isolatedMarginDescription =
    "In Isolated Margin Mode, the trader can allocate a specific amount of margin for each open position separately.The margin for each position is isolated, meaning the loss in one position won't directly affect the margin allocated to other positions.";

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
        {isolated === ISOLATED ? "Isolated" : "Cross"}
      </div>
      {isModalOpen && (
        <div id="demo-modal" className="gift-card-modal">
          <div className="future-modal__content p-5">
            <h3>{currentPair} Perpetual Margin Mode</h3>
            <div className="mt-3 percent-container mb-5 d-flex flex-wrap">
              <span
                className="percent-btn col-3 pb-2"
                style={{
                  background:
                    isolated === ISOLATED ? "var(--primary-color)" : "",
                }}
                onClick={() => {
                  if (disableIsolated) {
                    return;
                  }
                  modifyIsolated(ISOLATED);
                }}
              >
                Isolated
              </span>
              <span
                className="percent-btn col-3 pb-2"
                style={{
                  background: isolated === CROSS ? "var(--primary-color)" : "",
                }}
                onClick={() => {
                  if (disableCross) {
                    return;
                  }
                  modifyIsolated(CROSS);
                }}
              >
                Cross
              </span>
            </div>
            <div>
              {isolated === ISOLATED && (
                <p className="mb-4">{isolatedMarginDescription}</p>
              )}
              {isolated === CROSS && (
                <p className="mb-4">{crossMarginDescription}</p>
              )}
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

export default Isolated;
