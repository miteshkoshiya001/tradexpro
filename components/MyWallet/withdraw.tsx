import useTranslation from "next-translate/useTranslation";
import React, { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { ImListNumbered } from "react-icons/im";
import { copyTextById, formateZert } from "common";
import WalletGoogleAuth from "components/wallet/wallet-google-auth";
import { UserSettingsApi } from "service/settings";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { RootState } from "state/store";
import { useSelector } from "react-redux";
import { WalletWithdrawProcessApiAction } from "state/actions/wallet";
import {
  WITHDRAW_FESS_FIXED,
  WITHDRAW_FESS_PERCENT,
} from "helpers/core-constants";
import { getFeeAmountApi } from "service/wallet";

export const WithdrawComponent = ({ responseData, router, fullPage }: any) => {
  const { t } = useTranslation("common");
  const { settings } = useSelector((state: RootState) => state.common);
  const [selectedNetwork, setSelectedNetwork] = React.useState(
    responseData?.data && responseData?.data[0]
  );
  const [withdrawalCredentials, setWithdrawalCredentials] = React.useState({
    wallet_id: responseData?.wallet?.id,
    code: "",
    address: "",
    amount: "",
    note: "withdrawal",
    network_type: selectedNetwork?.network_type ?? "",
  });

  const [feesData, setFeesData] = React.useState<any>({});
  const [errorMessage, setErrorMessage] = React.useState({
    status: false,
    message: "",
  });
  const [processing, setProcessing] = React.useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    WalletWithdrawProcessApiAction(withdrawalCredentials, setProcessing);
  };
  const CheckG2faEnabled = async () => {
    const { data } = await UserSettingsApi();
    const { user } = data;
    if (
      !user.google2fa_secret &&
      parseInt(settings.two_factor_withdraw) === 1
    ) {
      setErrorMessage({
        status: true,
        message: "Google 2FA is not enabled, Please enable Google 2FA fist",
      });
    }
  };
  React.useEffect(() => {
    if (responseData?.data && responseData?.data[0]) {
      setSelectedNetwork(responseData?.data[0]);
    }
  }, [responseData?.data[0]]);
  React.useEffect(() => {
    setWithdrawalCredentials({
      ...withdrawalCredentials,
      wallet_id: responseData?.wallet?.id,
    });

    CheckG2faEnabled();
  }, [responseData?.wallet?.id]);

  React.useEffect(() => {
    setWithdrawalCredentials({
      ...withdrawalCredentials,
      network_type: selectedNetwork?.network_type,
    });
  }, [selectedNetwork?.network_type]);

  const checkNetworkFunc = (networkId: any) => {
    if (networkId == 4) {
      return `(ERC20 Token)`;
    }
    if (networkId == 5) {
      return `(BEP20 Token)`;
    }
    if (networkId == 6) {
      return `(TRC20 Token)`;
    }
    return "";
  };

  useEffect(() => {
    if (withdrawalCredentials?.address && withdrawalCredentials?.amount) {
      getFeeAmount();
    }
  }, [withdrawalCredentials]);

  const getFeeAmount = async () => {
    const response = await getFeeAmountApi(withdrawalCredentials);
    if (!response.success) {
      return;
    }
    setFeesData(response.data);
    console.log("response", response);
  };

  return (
    <div className="my-wallet-new px-0">
      <h5>{t("Total Balance")}</h5>
      <div className="coin-list-item mt-3">
        <div className="coint-flex">
          <img
            className="icon"
            src={responseData?.wallet?.coin_icon || "/bitcoin.png"}
            alt="coin"
            width="25px"
            height="25px"
          />
          <h6>{responseData?.wallet?.coin_type}</h6>
        </div>

        <p className="coin-price">
          {responseData?.wallet?.balance
            ? formateZert(responseData?.wallet?.balance) +
              " " +
              responseData?.wallet?.coin_type
            : "Loading"}
        </p>
      </div>

      <form action="">
        <div className="wallet-addres">
          <div className="">
            {responseData?.wallet.coin_type == "USDT" &&
              parseInt(responseData?.wallet.network) === 1 && (
                <div className="total-balance ">
                  <h5>{t("Select Network")}</h5>
                  <select
                    name="currency"
                    className="form-control coin-list-item mt-3"
                    style={{ height: "44px" }}
                    onChange={(e) => {
                      const findObje = responseData?.data?.find(
                        (x: any) => x.id === parseInt(e.target.value)
                      );
                      setSelectedNetwork(findObje);
                    }}
                  >
                    {responseData?.data?.map((item: any, index: number) => (
                      <option value={item.id} key={index}>
                        {item?.network_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
          </div>
        </div>

        <div className="wallet-addres">
          <h5>{t("Address")}</h5>
          <div className="">
            <div className="input-group input-address-bar mt-3">
              <input
                type="text"
                className="form-control border-0 h-50"
                id="address"
                name="address"
                placeholder={t("Address")}
                value={withdrawalCredentials.address}
                onChange={(e) => {
                  setWithdrawalCredentials({
                    ...withdrawalCredentials,
                    address: e.target.value,
                  });
                }}
              />
              <span className="input-address-bar-btn">
                <FaHome />
              </span>
            </div>
            <div className="mt-1 text-danger">
              <small>
                {t(
                  `Only enter a ${
                    responseData?.wallet?.coin_type ?? ""
                  } ${checkNetworkFunc(
                    responseData?.wallet?.network
                  )} address in this field. Otherwise the asset you withdraw, may be lost.`
                )}
              </small>
            </div>
          </div>
        </div>

        <div className="wallet-addres">
          <h5>{t("Amount")}</h5>
          <div className="">
            <div className="">
              <div className="input-group input-address-bar mt-3">
                <input
                  type="text"
                  className="form-control border-0 h-50"
                  id="amountWithdrawal"
                  name="amount"
                  placeholder={t("AMOUNT To Withdraw")}
                  value={withdrawalCredentials.amount}
                  onChange={(e) => {
                    setWithdrawalCredentials({
                      ...withdrawalCredentials,
                      amount: e.target.value,
                    });
                  }}
                />
                <span className="input-address-bar-btn">
                  <ImListNumbered />
                </span>
              </div>
              {Object.keys(feesData).length > 0 && (
                <div>
                  <small>
                    {t(
                      `You will be charged ${feesData?.fees} ${feesData?.coin_type} as Withdrawal Fee for this withdrawal.`
                    )}
                  </small>
                </div>
              )}
              {responseData?.wallet?.withdrawal_fees_type ==
                WITHDRAW_FESS_PERCENT && (
                <small>
                  <span className="mr-2">
                    {t("Fees ")}
                    {parseFloat(responseData?.wallet?.withdrawal_fees).toFixed(
                      8
                    )}{" "}
                    %
                  </span>
                  <span className="mr-2">
                    {t("Min withdraw ")}{" "}
                    {parseFloat(
                      responseData?.wallet?.minimum_withdrawal
                    ).toFixed(5)}
                    {responseData?.wallet?.coin_type}
                  </span>
                  <span className="mr-2">
                    {t("Max withdraw")}{" "}
                    {parseFloat(responseData?.wallet?.maximum_withdrawal)}{" "}
                    {responseData?.wallet?.coin_type}
                  </span>
                </small>
              )}
            </div>
          </div>
        </div>

        <WalletGoogleAuth
          withdrawalCredentials={withdrawalCredentials}
          setWithdrawalCredentials={setWithdrawalCredentials}
        />
        <input type="hidden" name="wallet_id" value="19" />
        {errorMessage.status && (
          <div className="alert alert-danger">{errorMessage.message}</div>
        )}
        {parseInt(settings.two_factor_withdraw) === 1 ? (
          <button
            type="button"
            className="withdraw-btn mt-4"
            data-target="#exampleModal"
            disabled={
              withdrawalCredentials.address === "" ||
              withdrawalCredentials.amount === "" ||
              errorMessage.status === true
            }
            data-toggle="modal"
            onClick={() => {
              setErrorMessage({
                status: false,
                message: "",
              });
            }}
          >
            {t("Withdraw")}
          </button>
        ) : (
          <button
            className="primary-btn-outline w-100 mt-4"
            type="button"
            style={{ height: "44px" }}
            disabled={errorMessage.status === true}
            onClick={handleSubmit}
          >
            {t("Withdraw")}
          </button>
        )}
      </form>
    </div>
  );
};
