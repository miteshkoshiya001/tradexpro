import Footer from "components/common/footer";
import ProfileSidebar from "layout/profile-sidebar";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { customPage, landingPage } from "service/landing-page";
import { GetUserInfoByTokenServer } from "service/user";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  addEditBankDetailsAction,
  deleteBankAction,
} from "state/actions/fiat-deposit-withawal";
import { getBankList, getBankListSSr } from "service/deposit";
import { FaTrash } from "react-icons/fa";

const AddBank = ({ id, data }: any) => {
  const { t } = useTranslation("common");
  const [loading, setLoading]: any = useState<any>(false);
  const [deleteloading, setdeleteloading]: any = useState<any>(false);
  const router = useRouter();

  return (
    <>
      <div className="page-wrap">
        <ProfileSidebar />
        <div className="page-main-content">
          <div className="container-fluid">
            <div className="section-top-wrap mb-25">
              <div className="profle-are-top">
                <h2 className="section-top-title">{t("Add Bank")}</h2>
              </div>
            </div>

            <div className="asset-balances-area">
              <div className="section-wrapper bank-section">
                <div className="container">
                  <div className="row">
                    <div className="ico-tokenCreate">
                      <div className="col-12">
                        <h2>
                          {t(`${router.query.id ? "Edit" : "Add New"}  Bank`)}
                        </h2>
                      </div>
                      <div className="ico-create-form col-12">
                        <Formik
                          initialValues={{
                            id: id ? id : null,
                            account_holder_name: id
                              ? data.account_holder_name
                              : "",
                            account_holder_address: id
                              ? data.account_holder_address
                              : "",
                            bank_name: id ? data.account_holder_address : "",
                            bank_address: id ? data.bank_address : "",
                            country: id ? data.country : "",
                            swift_code: id ? data.swift_code : "",
                            iban: id ? data.iban : "",
                            note: id ? data.note : "",
                          }}
                          validationSchema={Yup.object({
                            account_holder_name: Yup.string().required(
                              t("Field is required")
                            ),
                            account_holder_address: Yup.string().required(
                              t("Field is required")
                            ),
                            bank_name: Yup.string().required(
                              t("Field is required")
                            ),
                            bank_address: Yup.string().required(
                              t("Field is required")
                            ),
                            country: Yup.string().required(
                              t("Field is required")
                            ),
                            swift_code: Yup.string().required(
                              t("Field is required")
                            ),
                            iban: Yup.string().required(t("Field is required")),
                            // note: Yup.string().required(t("Field is required")),
                          })}
                          onSubmit={(values) => {
                            addEditBankDetailsAction(values, setLoading);
                          }}
                        >
                          {({ errors, touched, setFieldValue }) => (
                            <Form className="row">
                              <div className="col-md-6 form-input-div">
                                <label className="ico-label-box" htmlFor="">
                                  {t("Acount Holder Name")}
                                </label>
                                <Field
                                  type="text"
                                  name="account_holder_name"
                                  className={`ico-input-box ${
                                    touched.account_holder_name &&
                                    errors.account_holder_name
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div className="col-md-6 form-input-div">
                                <label className="ico-label-box" htmlFor="">
                                  {t("Account Holder Address")}
                                </label>
                                <Field
                                  type="text"
                                  name="account_holder_address"
                                  className={`ico-input-box ${
                                    touched.account_holder_address &&
                                    errors.account_holder_address
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div className="col-md-6 form-input-div">
                                <label className="ico-label-box" htmlFor="">
                                  {t("Bank Name")}
                                </label>
                                <Field
                                  type="text"
                                  name="bank_name"
                                  className={`ico-input-box ${
                                    touched.bank_name && errors.bank_name
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div className="col-md-6 form-input-div">
                                <label className="ico-label-box" htmlFor="">
                                  {t("Bank Address")}
                                </label>
                                <Field
                                  type="text"
                                  name="bank_address"
                                  className={`ico-input-box ${
                                    touched.bank_address && errors.bank_address
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div className="col-md-6 form-input-div">
                                <label className="ico-label-box" htmlFor="">
                                  {t("Country")}
                                </label>
                                <Field
                                  type="text"
                                  name="country"
                                  className={`ico-input-box ${
                                    touched.country && errors.country
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div className="col-md-6 form-input-div">
                                <label className="ico-label-box" htmlFor="">
                                  {t("Swift Code")}
                                </label>
                                <Field
                                  type="text"
                                  name="swift_code"
                                  className={`ico-input-box ${
                                    touched.swift_code && errors.swift_code
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div className="col-md-6 form-input-div">
                                <label className="ico-label-box" htmlFor="">
                                  {t("IBAN")}
                                </label>
                                <Field
                                  type="text"
                                  name="iban"
                                  className={`ico-input-box ${
                                    touched.iban && errors.iban
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div className="col-md-6 form-input-div">
                                <label className="ico-label-box" htmlFor="">
                                  {t("Note")}
                                </label>
                                <Field
                                  type="text"
                                  name="note"
                                  className={`ico-input-box ${
                                    touched.note && errors.note
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div className="col-md-12 form-input-div">
                                <button type="submit" className="primary-btn">
                                  {loading
                                    ? t("Submitting..")
                                    : t(`${id ? "Edit" : "Create"} Bank`)}
                                </button>
                                {id && (
                                  <button
                                    type="button"
                                    className="primary-btn delete-bank-btn ml-3"
                                    onClick={() =>
                                      deleteBankAction(setdeleteloading, id)
                                    }
                                  >
                                    <FaTrash size={16} className="mr-2" />

                                    {deleteloading
                                      ? t("Submitting..")
                                      : t("Delete Bank")}
                                  </button>
                                )}
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
  const cookies = parseCookies(ctx);

  const { id } = ctx.query;
  let listRes;
  if (id) {
    listRes = await getBankListSSr(id, cookies.token);
  }

  return {
    props: {
      id: id ? id : null,
      data: id ? listRes.data : null,
    },
  };
};
export default AddBank;
