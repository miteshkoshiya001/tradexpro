import { NoItemFound } from "components/NoItemFound/NoItemFound";
import SectionLoading from "components/common/SectionLoading";

import SelectDeposit from "components/deposit/selectDeposit";
import LaunchPad from "components/ico/LaunchPad";

import BankPayment from "components/ico/payment/Bank-payment";
import CryptoPayment from "components/ico/payment/CryptoPayment";
import PaypalPayment from "components/ico/payment/PaypalPayment";
import StripePayment from "components/ico/payment/StripePayment";
import Paystack from "components/ico/payment/paystack";
import {
  BANK_DEPOSIT,
  CRYPTO_DEPOSIT,
  PAYPAL,
  PHASE_SORT_BY_RECENT,
  STRIPE,
  PAYSTACK,
} from "helpers/core-constants";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  getLaunchpadListDetailsAction,
  TokenBuyPageAction,
} from "state/actions/launchpad";

const Index = () => {
  const { t } = useTranslation("common");
  const [selectedMethod, setSelectedMethod] = useState<any>({
    method: null,
  });
  const [launchpadListDetails, setLaunchpadListDetails]: any = useState([]);
  const router = useRouter();
  const [initialData, setInitialData] = useState<any>({
    phase_id: 0,
    token_id: 0,
  });
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState<any>({});
  useEffect(() => {
    TokenBuyPageAction(setPageInfo, setLoading);
  }, []);
  useEffect(() => {
    setInitialData({
      phase_id: router.query.phase_id,
      token_id: router.query.token_id,
    });
  }, [router.query]);

  useEffect(() => {
    getLaunchpadListDetailsAction(
      setLaunchpadListDetails,
      router.query.phase_id,
      setPageLoading
    );
  }, []);
  return (
    <div>
      <div className="page-main-content">
        <div className="container-fluid">
          <div className="deposit-page">
            <div className="section-top-wrap mb-25">
              <div className="profle-are-top">
                <h2 className="section-top-title">{t("Token Payment")}</h2>
              </div>
            </div>
            <div className="asset-balances-area">
              <div className="section-wrapper bank-section">
                <div className="container">
                  <div className="deposit-conatiner">
                    <LaunchPad
                      viewMore={false}
                      data={launchpadListDetails.data}
                      core={PHASE_SORT_BY_RECENT}
                      image={false}
                      link={false}
                    />
                    {pageInfo?.payment_methods?.length > 0 ? (
                      <div className="cp-user-title">
                        <h4>{t("Select method")}</h4>
                      </div>
                    ) : (
                      <div className="cp-user-title text-center p-5">
                        {/* <h4>{t("No Avaiable payment method")}</h4> */}
                        <NoItemFound
                          message={t("No Avaiable payment method")}
                        />
                      </div>
                    )}

                    {pageInfo?.payment_methods?.length > 0 && (
                      <SelectDeposit
                        setSelectedMethod={setSelectedMethod}
                        depositInfo={pageInfo}
                        selectedMethod={selectedMethod}
                      />
                    )}
                    {pageInfo?.payment_methods?.length > 0 && (
                      <div className="row">
                        {loading ? (
                          <SectionLoading />
                        ) : (
                          <div className={`col-sm-12`}>
                            {parseInt(selectedMethod.method) ===
                            CRYPTO_DEPOSIT ? (
                              <CryptoPayment
                                initialData={initialData}
                                walletlist={pageInfo?.wallet}
                                phaseData={launchpadListDetails.data}
                              />
                            ) : parseInt(selectedMethod.method) ===
                              BANK_DEPOSIT ? (
                              <BankPayment
                                pageInfo={pageInfo}
                                initialData={initialData}
                                phaseData={launchpadListDetails.data}
                              />
                            ) : parseInt(selectedMethod.method) === STRIPE ? (
                              <StripePayment
                                initialData={initialData}
                                pageInfo={pageInfo}
                                phaseData={launchpadListDetails.data}
                              />
                            ) : parseInt(selectedMethod.method) === PAYSTACK ? (
                              <Paystack
                                pageInfo={pageInfo}
                                initialData={initialData}
                                phaseData={launchpadListDetails.data}
                              />
                            ) : parseInt(selectedMethod.method) === PAYPAL ? (
                              <PaypalPayment
                                initialData={initialData}
                                pageInfo={pageInfo}
                                phaseData={launchpadListDetails.data}
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                        <div className="container text-center">
                          {!selectedMethod.method &&
                            pageInfo?.payment_methods?.length > 0 && (
                              <NoItemFound message="No payment method selected" />
                            )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/ico");
  return {
    props: {},
  };
};
