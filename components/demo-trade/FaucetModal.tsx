import useTranslation from "next-translate/useTranslation";
import React from "react";

export default function FaucetModal({
  setIsModalOpen,
  selectedItemForFaucet,
  addFaucetHandler
}: any) {
  const { t } = useTranslation();
  return (
    <div id="demo-modal" className="gift-card-modal">
      <div className="faucet-modal__content p-5">
        <h2>{t(`Faucet`)}</h2>
        <div>
          <p className="text-16">{t("Coin:")}</p>
          <div className="p-2 d-flex justify-content-between align-items-center text-16 bg-main-clr">
            <span>{selectedItemForFaucet?.coin_type}</span>
            <span>
              {parseFloat(selectedItemForFaucet?.faucet_amount).toFixed(8)}
            </span>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-16">{t("Tips:")}</p>
          <p className="text-16">
            If current asset value exceeds{" "}
            {parseFloat(selectedItemForFaucet?.faucet_min_balance).toFixed(8)}{" "}
            coins, it cannot be claimed again. You can only receive assets worth{" "}
            {parseFloat(selectedItemForFaucet?.faucet_amount).toFixed(8)} coins
            each time and each asset claim requires a{" "}
            {selectedItemForFaucet?.faucet_time}-hour interval before it can be
            claimed again.
          </p>
        </div>
        <div className="text-center mt-3">
          <button type="button" className="btn bg-primary-color capitalize" onClick={()=> addFaucetHandler(selectedItemForFaucet?.coin_type)}>
            {t("Add Assests")}
          </button>
        </div>
        <span
          className="gift-card-modal__close text-45 pointer"
          onClick={() => setIsModalOpen(false)}
        >
          &times;
        </span>
      </div>
    </div>
  );
}
