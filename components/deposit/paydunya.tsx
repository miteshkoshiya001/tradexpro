import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  GetPayDunyaPaymentUrl,
  convertAmountForPaydunya,
} from "service/deposit";
import { UserSettingsApi } from "service/settings";
import { RootState } from "state/store";
import DepositGoogleAuth from "./deposit-g2fa";

const Paydunya = ({ walletlist, method_id }: any) => {
  const { t } = useTranslation("common");
  const [credential, setCredential] = useState<any>({
    code: "",
  });
  const [calculatedValue, setCalculatedValue] = useState({
    xof: 0,
    wallet_coin: 0,
  });
  const [walletID, setwalletID] = useState<any>();
  const { settings } = useSelector((state: RootState) => state.common);
  const [errorMessage, setErrorMessage] = React.useState({
    status: false,
    message: "",
  });
  // const CheckG2faEnabled = async () => {
  //   const { data } = await UserSettingsApi();
  //   const { user } = data;
  //   if (
  //     user.google2fa !== 1 &&
  //     parseInt(settings.currency_deposit_2fa_status) === 1
  //   ) {
  //     setErrorMessage({
  //       status: true,
  //       message: t("Google 2FA is not enabled, Please enable Google 2FA fist"),
  //     });
  //   }
  // };
  // useEffect(() => {
  //   CheckG2faEnabled();
  // }, []);
  const [amount, setAmount] = useState("");
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const response = await GetPayDunyaPaymentUrl(amount, walletID, "USD", 1, method_id);
    if (response.success) {
      toast.success(response.message);
      window.open(response?.data?.payment_url, "_blank");
    } else {
      toast.error(response.message);
    }
  };
  const convertAmountHandle = async () => {
    if (!amount || !walletID) {
      return;
    }
    let coinType = walletlist.find(
      (item: any) => item.id == walletID
    ).coin_type;
    const response = await convertAmountForPaydunya(amount, coinType);
    if (!response.success) {
      toast.error(response.message);
      return;
    }
    setCalculatedValue((prev) => ({
      ...prev,
      xof: response.data.converted_amount_xof,
      wallet_coin: response.data.converted_amount_coin,
    }));
  };
  const walletHandler = (e: any) => {
    if (!amount) {
      toast.error(`Please Add Amount`);
      return;
    }
    setwalletID(e.target.value);
  };

  useEffect(() => {
    convertAmountHandle();
  }, [amount, walletID]);

  return (
    <div>
      <div className="cp-user-title mt-5 mb-4">
        <h4>{t("Deposit With Paydunya")}</h4>
      </div>
      <div>
        <form className="row" onSubmit={onSubmit}>
          <div className="col-lg-12">
            <div className="">
              <div className="swap-area">
                <div className="swap-area-top">
                  <div className="form-group">
                    <div className="swap-wrap">
                      <div className="swap-wrap-top">
                        <label>{t("Enter amount")}</label>
                        <span className="available">{t("Currency(USD)")}</span>
                      </div>
                      <div className="swap-input-wrap">
                        <div className="form-amount">
                          <input
                            type="number"
                            className="form-control border-0"
                            id="amount-one"
                            placeholder={t("Please enter 1-2400000")}
                            value={amount}
                            onChange={(e) => {
                              setAmount(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-lg-12">
            <select
              className="form-control "
              id="currency-one"
              onChange={(e) => {
                setwalletID(e.target.value);
              }}
            >
              <option value="" selected disabled hidden>
                Select one
              </option>
              {walletlist?.map((wallet: any, index: any) => (
                <option value={wallet.id} key={index} id={wallet.coin_type}>
                  {wallet.coin_type}
                </option>
              ))}
            </select>
          </div> */}
          <div className="col-lg-12">
            <div className="">
              <div className="swap-area">
                <div className="swap-area-top">
                  <div className="form-group">
                    <div className="swap-wrap mt-3">
                      <div className="swap-wrap-top">
                        <label>{t("Converted amount")}</label>
                        <span className="available">{t("Select wallet")}</span>
                      </div>
                      <div className="swap-input-wrap">
                        <div className="form-amount">
                          <input
                            type="number"
                            className="form-control border-0"
                            id="amount-one"
                            disabled
                            value={calculatedValue?.wallet_coin}
                            readOnly
                          />
                        </div>
                        <div className="cp-select-area">
                          <select
                            className="form-control border-0 ticketFilterBg"
                            id="currency-one"
                            onChange={walletHandler}
                          >
                            <option value="" selected disabled hidden>
                              {t("Select one")}
                            </option>
                            {walletlist.map((wallet: any, index: any) => (
                              <option value={wallet.id} key={index}>
                                {wallet.coin_type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {calculatedValue?.xof > 0 && (
            <div className="col-lg-12">
              <div className="">
                <div className="swap-area">
                  <div className="swap-area-top">
                    <div className="form-group">
                      <div className="swap-wrap mt-3">
                        <div className="swap-wrap-top">
                          <label>{t("Payment amount for Paydunya")}</label>
                          <span className="available">
                            {t("Currency(XOF)")}
                          </span>
                        </div>
                        <div className="swap-input-wrap">
                          <div className="form-amount">
                            <input
                              type="number"
                              className="form-control border-0"
                              id="amount-one"
                              disabled
                              value={calculatedValue?.xof}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="col-lg-12">
            {/* <DepositGoogleAuth
              convertCurrency={onSubmit}
              credential={credential}
              setCredential={setCredential}
            /> */}
            {errorMessage.status && (
              <div className="alert alert-danger col-lg-12">
                {errorMessage.message}
              </div>
            )}
            {/* {parseInt(settings.currency_deposit_2fa_status) === 1 &&
            amount &&
            walletID ? (
              <button
                className="primary-btn-outline w-100 mt-5"
                type="button"
                data-target="#exampleModal"
                disabled={errorMessage.status === true}
                data-toggle="modal"
              >
                {t("Deposit")}
              </button>
            ) : (
              <button
                className="primary-btn-outline w-100 mt-5"
                type="button"
                data-target="#exampleModal"
                disabled={errorMessage.status === true}
                data-toggle="modal"
              >
                {t("Deposit")}
              </button>
            )} */}
            <button
                className="primary-btn-outline w-100 mt-5"
                type="submit"
                disabled={errorMessage.status === true}

              >
                {t("Deposit")}
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Paydunya;
