import React, { useState, useRef, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import {
  WalletDepositApiAction,
  WalletWithdrawApiAction,
} from "state/actions/wallet";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { parseCookies } from "nookies";
import { GetUserInfoByTokenServer } from "service/user";
import {
  FAQ_TYPE_DEPOSIT,
  FAQ_TYPE_WITHDRAWN,
  MY_WALLET_DEPOSIT_TYPE,
  MY_WALLET_WITHDRAW_TYPE,
} from "helpers/core-constants";
import { DipositComponent } from "components/MyWallet/diposit";
import { WithdrawComponent } from "components/MyWallet/withdraw";
import { getFaqList } from "service/faq";
import FAQ from "components/FAQ";
import Footer from "components/common/footer";
import { customPage, landingPage } from "service/landing-page";
import { RootState } from "state/store";
import { useSelector } from "react-redux";
import Wallethistory from "components/wallet/wallet-history";
import { MyWalletProcessSidebar } from "service/wallet";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

const DeposiAndWithdraw = ({ withdrawFaq, depositFaq }: any) => {
  const router = useRouter();
  const [fullPage, setFullPage] = useState(false);
  const { settings } = useSelector((state: RootState) => state.common);
  const { t } = useTranslation("common");
  const [faqs, setFaqs] = useState<any>([]);
  const [responseData, setResponseData]: any = useState();
  const [dependecy, setDependecy] = useState(0);
  const [getProcessData, setProcessData]: any = useState([]);

  const handleWithdrawAndDeposit = async (actionType: string, id: number) => {
    if (actionType === MY_WALLET_DEPOSIT_TYPE) {
      const response = await WalletDepositApiAction(
        Number(router.query.coin_id)
      );
      if (response.success === true) {
        setResponseData({
          ...response,
          deposit: response.wallet,
          address: response.address ? response.address : null,
        });
      } else if (response.success === false) {
        router.push("/user/my-wallet");
      }
    } else {
      const response = await WalletWithdrawApiAction(
        Number(router.query.coin_id)
      );

      if (response.success === true) {
        setResponseData({
          ...response,
          withdraw: response.wallet,
          address: response.address,
        });
      } else if (response.success === false) {
        router.push("/user/my-wallet");
      }
    }
  };
  const checkFullPageStatus = () => {
    if (
      parseInt(settings.withdrawal_faq_status) !== 1 &&
      router.query.id === MY_WALLET_WITHDRAW_TYPE &&
      parseInt(getProcessData?.data?.progress_status_for_withdrawal) !== 1
    ) {
      setFullPage(true);
    } else if (
      parseInt(settings.coin_deposit_faq_status) !== 1 &&
      router.query.id === MY_WALLET_DEPOSIT_TYPE &&
      parseInt(getProcessData?.data?.progress_status_for_deposit) !== 1
    ) {
      setFullPage(true);
    } else if (
      faqs?.length <= 0 &&
      typeof getProcessData?.data?.progress_status_list === "undefined"
    ) {
      setFullPage(true);
    } else if (
      faqs?.length <= 0 &&
      getProcessData?.data?.progress_status_list?.length <= 0
    ) {
      setFullPage(true);
    }
  };

  const getProcess = async () => {
    const processData = await MyWalletProcessSidebar(String(router.query.id));
    setProcessData(processData);
  };
  let WithdrawAndDeposit = false;
  useEffect(() => {
    setFaqs(
      router.query.id === MY_WALLET_DEPOSIT_TYPE ? depositFaq : withdrawFaq
    );
    getProcess();
    if (WithdrawAndDeposit === false) {
      handleWithdrawAndDeposit(
        String(router.query.id),
        Number(router.query.coin_id)
      );
      WithdrawAndDeposit = true;
    }
  }, [dependecy]);
  useEffect(() => {
    if (
      settings.withdrawal_faq_status &&
      router.query.id &&
      getProcessData?.data?.progress_status_list
    ) {
      checkFullPageStatus();
    }
  }, [
    settings.withdrawal_faq_status,
    router.query.id,
    faqs?.length,
    getProcessData?.data?.progress_status_list,
  ]);

  return (
    <>
      <div className="page-wrap my-wallet-page">
        <div className="container">
          <div className={`row`}>
            <div className="col-md-12">
              <div className="single-wallet boxShadow shadow-sm rounded">
                <div className="box-two single-box visible">
                  <div className="">
                    <Link href="/user/my-wallet">
                      <div className="wallet-back">
                        <IoIosArrowBack className="wallet-backIcon" size={25} />
                        <a href="">{t("My Wallet")}</a>
                      </div>
                    </Link>

                    <div className="row">
                      <div
                        className={
                          fullPage ? "col-md-8 no-sidebar" : `col-md-8`
                        }
                      >
                        {router.query.id === MY_WALLET_DEPOSIT_TYPE && (
                          <DipositComponent
                            responseData={responseData}
                            router={router}
                            setDependecy={setDependecy}
                            fullPage={fullPage}
                          />
                        )}

                        {router.query.id === MY_WALLET_WITHDRAW_TYPE && (
                          <WithdrawComponent
                            responseData={responseData}
                            router={router}
                            fullPage={fullPage}
                          />
                        )}
                      </div>

                      {/* {fullPage ? "true" : "false"} */}

                      {fullPage === false && (
                        <div className="col-md-4 mt-0">
                          {parseInt(settings.withdrawal_faq_status) === 1 &&
                            router.query.id === MY_WALLET_WITHDRAW_TYPE &&
                            faqs?.length > 0 && (
                              <div
                                className={`box-one single-box visible mb-25`}
                              >
                                <div className="my-wallet-new rounded px-0">
                                  <FAQ faqs={faqs} type={router.query.id} />
                                </div>
                              </div>
                            )}
                          {parseInt(settings.coin_deposit_faq_status) === 1 &&
                            router.query.id === MY_WALLET_DEPOSIT_TYPE &&
                            faqs?.length > 0 && (
                              <div
                                className={`box-one single-box visible mb-25`}
                              >
                                <div className="my-wallet-new rounded px-0">
                                  <FAQ faqs={faqs} type={router.query.id} />
                                </div>
                              </div>
                            )}

                          {getProcessData?.data?.progress_status_list?.length >
                            0 && (
                            <div className="mt-3">
                              <h4>
                                {router.query.id === "deposit"
                                  ? "Deposit" + " Step's"
                                  : "Withdrawal" + " Step's"}
                              </h4>

                              <div className="flexItem">
                                <div>
                                  {getProcessData?.data?.progress_status_list?.map(
                                    (item: any, index: number) => (
                                      <div
                                        key={`progress${index}`}
                                        className={"timeLineLists"}
                                      >
                                        <div
                                          className={`${
                                            getProcessData?.data
                                              ?.progress_status_list?.length ==
                                            index + 1
                                              ? "timeLineIcon removeBeforeCSS"
                                              : "timeLineIcon"
                                          }`}
                                        >
                                          <i className="fa-sharp fa-solid fa-circle-check active"></i>
                                        </div>
                                        <div className="progressContent">
                                          <h5>{item.title}</h5>
                                          <span>{item.description}</span>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {router.query.id && (
            <Wallethistory
              type={
                router.query.id === MY_WALLET_WITHDRAW_TYPE
                  ? "withdrawal"
                  : "deposit"
              }
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/my-wallet/deposit");
  const cookies = parseCookies(ctx);
  const response = await GetUserInfoByTokenServer(cookies.token);
  const FAQ = await getFaqList();
  let withdrawFaq: any[] = [];
  let depositFaq: any[] = [];
  FAQ.data?.data?.map((faq: any) => {
    if (faq?.faq_type_id === FAQ_TYPE_DEPOSIT) {
      depositFaq.push(faq);
    } else if (faq?.faq_type_id === FAQ_TYPE_WITHDRAWN) {
      withdrawFaq.push(faq);
    }
  });

  return {
    props: {
      user: response.user,
      withdrawFaq: withdrawFaq,
      depositFaq: depositFaq,
    },
  };
};

export default DeposiAndWithdraw;
