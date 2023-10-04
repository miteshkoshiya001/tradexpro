import FiatSidebar from "layout/fiat-sidebar";
import {
  pageAvailabilityCheck,
  SSRAuthCheck,
} from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { customPage, landingPage } from "service/landing-page";
import { GetUserInfoByTokenServer } from "service/user";
import useTranslation from "next-translate/useTranslation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Footer from "components/common/footer";
import { apiFiatWithdrawalAction } from "state/actions/fiat-deposit-withawal";

const AddEditBank = () => {
  const { t } = useTranslation("common");
  const [loading, setLoading]: any = useState<any>(false);
  const [initialData, setInitialData]: any = useState<any>([]);

  useEffect(() => {
    apiFiatWithdrawalAction(setInitialData, setLoading);
  }, []);
  return (
    <>
      <div className="page-wrap">
        <FiatSidebar />
        <div className="page-main-content">
          <div className="container-fluid">
            <div className="section-top-wrap mb-25">
              <div className="profle-are-top">
                <h2 className="section-top-title">{t("Fiat Withdrawal")}</h2>
              </div>
            </div>

            <div className="asset-balances-area">
              <div className="section-wrapper bank-section">
                <div className="container">
                  <div className="row">
                    <div className="ico-tokenCreate">
                      <div className="col-12">
                        <h2>{t("Add New")}</h2>
                      </div>
                      <div className="ico-create-form col-12">
                        <Formik
                          initialValues={{
                            wallet: "",
                            coin_list: "",
                            amount: "",
                            convert_price: "",
                            bank_list: "",
                          }}
                          validationSchema={Yup.object({
                            wallet: Yup.string().required(
                              t("Field is required")
                            ),
                            amount: Yup.string().required(
                              t("Field is required")
                            ),
                            coin_list: Yup.string().required(
                              t("Field is required")
                            ),
                            bank_list: Yup.string().required(
                              t("Field is required")
                            ),
                          })}
                          onSubmit={(values) => {}}
                        >
                          {({ errors, touched, setFieldValue }) => (
                            <Form className="row">
                              <div className="col-md-6 form-input-div">
                                <label className="ico-label-box" htmlFor="">
                                  {t("Select Wallet")}
                                </label>
                                <Field
                                  as="select"
                                  name="wallet"
                                  className={`ico-input-box ${
                                    touched.wallet && errors.wallet
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                >
                                  <option value="">
                                    {t("Select Your Wallet")}
                                  </option>
                                  {initialData?.my_wallet?.map(
                                    (item: any, index: any) => (
                                      <option value={item.code} key={index}>
                                        {item.coin_type}
                                      </option>
                                    )
                                  )}
                                </Field>
                              </div>

                              <div className="col-md-6 form-input-div">
                                <label className="ico-label-box" htmlFor="">
                                  {t("Select Currency")}
                                </label>
                                <Field
                                  as="select"
                                  name="coin_list"
                                  className={`ico-input-box ${
                                    touched.coin_list && errors.coin_list
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                >
                                  <option value="">
                                    {t("Select Currency")}
                                  </option>
                                  {initialData?.currency?.map(
                                    (item: any, index: any) => (
                                      <option value={item.code} key={index}>
                                        {item.name}
                                      </option>
                                    )
                                  )}
                                </Field>
                              </div>

                              <div className="col-md-6 form-input-div">
                                <label className="ico-label-box" htmlFor="">
                                  {t("Amount")}
                                </label>
                                <Field
                                  type="text"
                                  name="amount"
                                  className={`ico-input-box ${
                                    touched.amount && errors.amount
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                              </div>

                              <div className="col-md-6 form-input-div">
                                <label className="ico-label-box" htmlFor="">
                                  {t("Amount Convert Price")}
                                </label>
                                <Field
                                  type="text"
                                  name="convert_price"
                                  className={`ico-input-box ${
                                    touched.convert_price &&
                                    errors.convert_price
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                              </div>

                              <div className="col-md-6 form-input-div">
                                <label className="ico-label-box" htmlFor="">
                                  {t("Select Bank")}
                                </label>
                                <Field
                                  as="select"
                                  name="bank_list"
                                  className={`ico-input-box ${
                                    touched.bank_list && errors.bank_list
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                >
                                  <option value="">
                                    {t("Select Bank List")}
                                  </option>
                                  {initialData?.my_bank?.map(
                                    (item: any, index: any) => (
                                      <option value={item.id} key={index}>
                                        {item.bank_name}
                                      </option>
                                    )
                                  )}
                                </Field>
                              </div>
                              <div className="col-md-12 form-input-div">
                                <button type="submit" className="primary-btn">
                                  {loading
                                    ? t("Loading..")
                                    : t("Submit Withdrawl")}
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/profile");
  const commonRes = await pageAvailabilityCheck();
  if (parseInt(commonRes.currency_deposit_status) !== 1) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default AddEditBank;
