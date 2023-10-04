import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useRef, useState } from "react";
import { copyTextById, formateZert } from "common";
import { GetWalletAddressAction } from "state/actions/wallet";
import Qr from "components/common/qr";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import QRCode from "react-qr-code";

export const DipositComponent = ({
  responseData,
  router,
  setDependecy,
  fullPage,
}: any) => {
  const { t } = useTranslation("common");
  const [selectedNetwork, setSelectedNetwork] = useState(
    responseData?.data && responseData?.data[0]
  );
  const [initialHit, setInitialHit] = useState(false);
  const selectAddressCopy: any = React.useRef(null);
  useEffect(() => {
    if (responseData?.data && responseData?.data[0] && initialHit === false) {
      setSelectedNetwork(responseData?.data[0]);
      setInitialHit(true);
    }
  }, [responseData?.data[0]]);
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
  return (
    <>
      <div className="my-wallet-new px-0">
        <h5>{t("Total Balance")}</h5>
        <div className="coin-list-item mt-3">
          <div className="coint-flex">
            <img
              className="icon"
              src={responseData?.deposit?.coin_icon || "/bitcoin.png"}
              alt="coin"
              width="25px"
              height="25px"
            />
            <h6>{responseData?.deposit?.coin_type}</h6>
          </div>

          <p className="coin-price">
            {responseData?.deposit?.balance
              ? formateZert(responseData?.deposit?.balance) +
                " " +
                responseData?.deposit?.coin_type
              : "Loading.."}
          </p>
        </div>

        <div className="wallet-addres">
          {responseData?.wallet.coin_type == "USDT" &&
            parseInt(responseData?.wallet.network) === 1 && (
              <div className="total-balance">
                <h5>{t("Select Network")}</h5>
                <div className="cp-select-area">
                  <select
                    name="currency"
                    className="form-control coin-list-item  mt-3"
                    style={{height: '44px'}}
                    onChange={(e) => {
                      const findObje = responseData?.data?.find(
                        (x: any) => x.id === parseInt(e.target.value)
                      );
                      setDependecy(Math.random() * 100);
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
              </div>
            )}
        </div>

        <div className="wallet-addres">
          <h5>{t("Address")}</h5>
          <div className="coin-list-item  mt-3">
            <p className="waring-wallet-text">
              {t(
                `Only send ${
                  responseData?.deposit?.coin_type ?? ""
                } ${checkNetworkFunc(
                  responseData?.deposit?.network
                )} to this address. Sending any others asset to this adress may result in the loss of your deposit!`
              )}
            </p>
          </div>
        </div>

        <div className="wallet-addres-generate">
          <div className="coin-list-item">
            <div className="wallet-bar-code">
              {responseData?.address && (
                <div className="qr-background">
                  <QRCode
                    className="qrCodeBg rounded"
                    value={responseData?.address}
                    size={150}
                  />
                </div>
              )}
              {selectedNetwork?.address &&
                responseData?.wallet.coin_type === "USDT" && (
                  <div className="qr-background">
                    <QRCode
                      className="qrCodeBg rounded"
                      value={selectedNetwork?.address}
                      size={150}
                    />
                  </div>
                )}

              <div className="copy-box">
                <div className="input-url input-copy mt-4">
                  {selectedNetwork?.address ? (
                    <>
                      <input
                        onClick={() => {
                          copyTextById(
                            responseData?.wallet.coin_type == "USDT"
                              ? selectedNetwork?.address
                              : responseData?.address
                          );
                          selectAddressCopy?.current.select();
                        }}
                        ref={selectAddressCopy}
                        className="address-box address-copy-box border-0 pl-3"
                        type="text"
                        value={
                          responseData?.wallet.coin_type == "USDT"
                            ? selectedNetwork?.address
                            : responseData?.address
                        }
                      />

                      <span
                        className="btn copy-url-btn"
                        onClick={() => {
                          copyTextById(
                            responseData?.wallet.coin_type == "USDT"
                              ? selectedNetwork?.address
                              : responseData?.address
                          );
                          selectAddressCopy?.current?.select();
                        }}
                      >
                        <i className="fa fa-clone"></i>
                      </span>
                    </>
                  ) : responseData?.address ? (
                    <>
                      <input
                        onClick={() => {
                          copyTextById(
                            responseData?.wallet.coin_type == "USDT"
                              ? selectedNetwork?.address
                              : responseData?.address
                          );
                          selectAddressCopy?.current.select();
                        }}
                        ref={selectAddressCopy}
                        className="border-0 address-copy-box ml-3"
                        type="text"
                        value={responseData?.address}
                      />

                      <span
                        className="copy-url-btn cp-button"
                        onClick={() => {
                          copyTextById(responseData?.address);
                          selectAddressCopy?.current?.select();
                        }}
                      >
                        <i className="fa fa-clone"></i>
                      </span>
                    </>
                  ) : (
                    <p
                      ref={selectAddressCopy}
                      id="url-copy"
                      className="address-box"
                    >
                      {t("No address found!")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {!selectedNetwork?.address &&
            responseData?.wallet.coin_type == "USDT" &&
            parseInt(responseData?.wallet.network) === 1 && (
              <button
                className=" primary-btn-outline btn-withdraw text-white w-100 mt-4"
                onClick={() => {
                  GetWalletAddressAction(
                    {
                      wallet_id: router.query.coin_id,
                      network_type: selectedNetwork?.network_type ?? "",
                    },
                    setSelectedNetwork,
                    setDependecy
                  );
                }}
              >
                {t("Get address")}
              </button>
            )}
        </div>
      </div>

      {/* <div className="row">
        <div className="col-md-6">
          <h5>{t("Total Balance")}</h5>
          <div className="coin-list-item mt-2">
            <div className="coint-flex">
              <img
                className="icon"
                src={responseData?.deposit?.coin_icon || "/bitcoin.png"}
                alt="coin"
                width="25px"
                height="25px"
              />
              <h6>{responseData?.deposit?.coin_type}</h6>
            </div>

            <p className="coin-price">
              {responseData?.deposit?.balance
                ? formateZert(responseData?.deposit?.balance) +
                  " " +
                  responseData?.deposit?.coin_type
                : "Loading.."}
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="wallet-addres mt-0">
            {responseData?.wallet.coin_type == "USDT" &&
              parseInt(responseData?.wallet.network) === 1 && (
                <div className="total-balance">
                  <h5>{t("Select Network")}</h5>
                  <div className="cp-select-area">
                    <select
                      name="currency"
                      className="form-control coin-list-item mt-2"
                      onChange={(e) => {
                        const findObje = responseData?.data?.find(
                          (x: any) => x.id === parseInt(e.target.value)
                        );
                        setDependecy(Math.random() * 100);
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
                </div>
              )}
          </div>
        </div>
        <div className="col-md-12">
          <div className="wallet-addres">
            <h5>{t("Address")}</h5>
            <div className="coin-list-item mt-2">
              <p className="waring-wallet-text">
                {t(
                  `Only send ${
                    responseData?.deposit?.coin_type ?? ""
                  } ${checkNetworkFunc(
                    responseData?.deposit?.network
                  )} to this address. Sending any others asset to this adress may result in the loss of your deposit!`
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="wallet-addres-generate">
            <div className="coin-list-item">
              <div className="wallet-bar-code">
                {responseData?.address && (
                  <div className="qr-background">
                    <QRCode
                      className="qrCodeBg rounded"
                      value={responseData?.address}
                      size={150}
                    />
                  </div>
                )}
                {selectedNetwork?.address &&
                  responseData?.wallet.coin_type === "USDT" && (
                    <div className="qr-background">
                      <QRCode
                        className="qrCodeBg rounded"
                        value={selectedNetwork?.address}
                        size={150}
                      />
                    </div>
                  )}

                <div className="copy-box">
                  <div className="input-url input-copy mt-4">
                    {selectedNetwork?.address ? (
                      <>
                        <input
                          onClick={() => {
                            copyTextById(
                              responseData?.wallet.coin_type == "USDT"
                                ? selectedNetwork?.address
                                : responseData?.address
                            );
                            selectAddressCopy?.current.select();
                          }}
                          ref={selectAddressCopy}
                          className="address-box address-copy-box border-0 pl-3"
                          type="text"
                          value={
                            responseData?.wallet.coin_type == "USDT"
                              ? selectedNetwork?.address
                              : responseData?.address
                          }
                        />

                        <span
                          className="btn copy-url-btn"
                          onClick={() => {
                            copyTextById(
                              responseData?.wallet.coin_type == "USDT"
                                ? selectedNetwork?.address
                                : responseData?.address
                            );
                            selectAddressCopy?.current?.select();
                          }}
                        >
                          <i className="fa fa-clone"></i>
                        </span>
                      </>
                    ) : responseData?.address ? (
                      <>
                        <input
                          onClick={() => {
                            copyTextById(
                              responseData?.wallet.coin_type == "USDT"
                                ? selectedNetwork?.address
                                : responseData?.address
                            );
                            selectAddressCopy?.current.select();
                          }}
                          ref={selectAddressCopy}
                          className="border-0 address-copy-box ml-3"
                          type="text"
                          value={responseData?.address}
                        />

                        <span
                          className="copy-url-btn cp-button"
                          onClick={() => {
                            copyTextById(responseData?.address);
                            selectAddressCopy?.current?.select();
                          }}
                        >
                          <i className="fa fa-clone"></i>
                        </span>
                      </>
                    ) : (
                      <p
                        ref={selectAddressCopy}
                        id="url-copy"
                        className="address-box"
                      >
                        {t("No address found!")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {!selectedNetwork?.address &&
              responseData?.wallet.coin_type == "USDT" &&
              parseInt(responseData?.wallet.network) === 1 && (
                <button
                  className=" primary-btn-outline btn-withdraw text-white w-100 mt-4"
                  onClick={() => {
                    GetWalletAddressAction(
                      {
                        wallet_id: router.query.coin_id,
                        network_type: selectedNetwork?.network_type ?? "",
                      },
                      setSelectedNetwork,
                      setDependecy
                    );
                  }}
                >
                  {t("Get address")}
                </button>
              )}
          </div>
        </div>
      </div> */}

      {/* <div className="deposit-info-area" id="wallet_deposit_area">
            <div className="deposit-info-top">
              <div className="balance-box">
                <img
                  className="icon"
                  src={responseData?.deposit?.coin_icon || "/bitcoin.png"}
                  alt="coin"
                />
                <div className="balance-content">
                  <h4>
                    {responseData?.deposit?.coin_type} {t("Balance")}
                  </h4>
                  <h5>
                    {responseData?.deposit?.coin_type} {t("Wallet")}
                  </h5>
                </div>
              </div>
            </div>
            <div className="total-balance">
              <div className="total-balance-left">
                <h3>{t("Total Balance")}</h3>
              </div>
              <div className="total-balance-right">
                <h3>
                  {responseData?.deposit?.balance
                    ? formateZert(responseData?.deposit?.balance) +
                      " " +
                      responseData?.deposit?.coin_type
                    : "Loading.."}
                </h3>
              </div>
            </div>
            {responseData?.wallet.coin_type == "USDT" && (
              <div className="total-balance">
                <select
                  name="currency"
                  className="form-control"
                  onChange={(e) => {
                    const findObje = responseData?.data?.find(
                      (x: any) => x.id === parseInt(e.target.value)
                    );
                    setDependecy(Math.random() * 100);
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
            <div className="address-area">
              <div className="address-area-info">
                <h3 className="text-white">
                  <i
                    className="fa fa-exclamation-triangle ml-2"
                    aria-hidden="true"
                  ></i>
                </h3>
                <p className="text-white">
                  {t("Only send")} {responseData?.deposit?.coin_type}{" "}
                  {t("to this address")}
                  {t(
                    "Please note that only supported networks on our platform are shown, if you deposit via another network your assets may be lost"
                  )}
                </p>
              </div>
              <div className="input-url">
                {selectedNetwork?.address ? (
                  <>
                    <input
                      onClick={() => {
                        copyTextById(
                          responseData?.wallet.coin_type == "USDT"
                            ? selectedNetwork?.address
                            : responseData?.address
                        );
                        selectAddressCopy?.current.select();
                      }}
                      ref={selectAddressCopy}
                      className="address-box address-copy-box"
                      type="text"
                      value={
                        responseData?.wallet.coin_type == "USDT"
                          ? selectedNetwork?.address
                          : responseData?.address
                      }
                    />

                    <button
                      type="button"
                      className="btn copy-url-btn"
                      onClick={() => {
                        copyTextById(
                          responseData?.wallet.coin_type == "USDT"
                            ? selectedNetwork?.address
                            : responseData?.address
                        );
                        selectAddressCopy?.current?.select();
                      }}
                    >
                      <i className="fa fa-clone"></i>
                    </button>
                  </>
                ) : responseData?.address &&
                  responseData?.wallet.coin_type !== "USDT" ? (
                  <>
                    <input
                      onClick={() => {
                        copyTextById(
                          responseData?.wallet.coin_type == "USDT"
                            ? selectedNetwork?.address
                            : responseData?.address
                        );
                        selectAddressCopy?.current.select();
                      }}
                      ref={selectAddressCopy}
                      className="address-box address-copy-box"
                      type="text"
                      value={responseData?.address}
                    />

                    <button
                      type="button"
                      className="btn copy-url-btn"
                      onClick={() => {
                        copyTextById(responseData?.address);
                        selectAddressCopy?.current?.select();
                      }}
                    >
                      <i className="fa fa-clone"></i>
                    </button>
                  </>
                ) : (
                  <p
                    ref={selectAddressCopy}
                    id="url-copy"
                    className="address-box"
                  >
                    No address found!
                  </p>
                )}
              </div>
              {!selectedNetwork?.address &&
                responseData?.wallet.coin_type == "USDT" && (
                  <button
                    className=" primary-btn-outline btn-withdraw text-white w-100 mt-2"
                    onClick={() => {
                      GetWalletAddressAction(
                        {
                          wallet_id: router.query.coin_id,
                          network_type: selectedNetwork?.network_type ?? "",
                        },
                        setSelectedNetwork,
                        setDependecy
                      );
                    }}
                  >
                    {t("Get address")}
                  </button>
                )}
              <div className="bar-code-area">
                {responseData?.address &&
                  responseData?.wallet.coin_type !== "USDT" && (
                    <Qr value={responseData?.address} />
                  )}
              </div>
              <div className="bar-code-area">
                {selectedNetwork?.address &&
                  responseData?.wallet.coin_type === "USDT" && (
                    <Qr value={selectedNetwork?.address} />
                  )}
              </div>
            </div>
          </div> */}
    </>
  );
};
