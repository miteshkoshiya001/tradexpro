import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { launchpadCreateUpdateTokenAction } from "state/actions/launchpad";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { GetServerSideProps } from "next";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { useRouter } from "next/router";
import { getContractAddressDetails, icoListDetails } from "service/launchpad";
import { toast } from "react-toastify";
import Footer from "components/common/footer";

const TokenCreate = ({ id, edit, data }: any) => {
  const { t } = useTranslation("common");

  const [image, setImage]: any = useState<any>();
  const [loading, setLoading]: any = useState<any>(false);
  const [warning, setWarning] = useState(false);
  const router = useRouter();
  return (
    <div className="container">
      <div className="row">
        <div className="ico-tokenCreate boxShadow mt-5">
          <div className="col-12">
            <h2>
              {t(
                `${
                  router.query.edit === "true" ? "Edit" : "Add New"
                }  ICO Token`
              )}
            </h2>
          </div>
          <div className="ico-create-form col-12">
            <Formik
              initialValues={{
                id: edit ? data.id : "",
                form_id: edit ? data.form_id : id,
                base_coin: edit ? data.base_coin : "",
                token_name: edit ? data?.token_name : "",
                network: edit ? data?.network : "",
                wallet_address: edit ? data?.wallet_address : "",
                contract_address: edit ? data?.contract_address : "",
                wallet_private_key: edit ? data?.wallet_private_key : "",
                chain_id: edit ? data?.chain_id : "",
                image: "",
                chain_link: edit ? data?.chain_link : "",
                decimal: edit ? data?.decimal : "",
                gas_limit: edit ? data?.gas_limit : 430000,
                details_rule: edit ? data?.details_rule : "",
                website_link: edit ? data?.website_link : "",
                token_symbol: edit ? data?.coin_type : "",
              }}
              validationSchema={Yup.object({
                // form_id: Yup.number().required(
                //   t("ICO Submit Form ID is required")
                // ),
                // base_coin: Yup.string().required(t("Base Coin is required")),
                // token_name: Yup.string().required(t("Token Name is required")),
                // network: Yup.string().required(t("Network is required")),
                // wallet_address: Yup.string().required(
                //   t("Wallet Address is required")
                // ),
                // contract_address: Yup.string().required(
                //   t("Contract Address is required")
                // ),
                // wallet_private_key: Yup.string().required(
                //   t("Wallet Private Key is required")
                // ),
                // chain_id: Yup.string().required(t("Chain ID is required")),
                // chain_link: Yup.string().required(t("Chain Link is required")),
                // decimal: Yup.number().required(t("Decimal is required")),
                // gas_limit: Yup.number().required(t("Gas Limit is required")),
              })}
              onSubmit={(values) => {
                launchpadCreateUpdateTokenAction(values, setLoading, image);
              }}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form className="row">
                  {" "}
                  <div className="col-md-6 form-input-div">
                    <label className="ico-label-box" htmlFor="">
                      {t("Token Type")}
                    </label>
                    <Field
                      as="select"
                      name="network"
                      className={`ico-input-box ${
                        touched.network && errors.network ? "is-invalid" : ""
                      }`}
                      onChange={(e: any) => {
                        setFieldValue("network", e.target.value);
                        //    <option value="BNB">{t("BNB")}</option>
                        // <option value="ETH">{t("ETH")}</option>
                        if (e.target.value == 4) {
                          setFieldValue("base_coin", "ETH");
                        } else {
                          setFieldValue("base_coin", "BNB");
                        }
                      }}
                    >
                      <option value="">{t("Select Your Network")}</option>
                      <option value="4">{t("ERC20 Token Api")}</option>
                      <option value="5">{t("BEP20 Token Api")}</option>
                    </Field>
                  </div>
                  <div className="col-md-6 form-input-div">
                    <label className="ico-label-box" htmlFor="">
                      {t(" Base Coin")}
                    </label>
                    <Field
                      as="select"
                      name="base_coin"
                      disabled
                      className={`ico-input-box ${
                        touched.base_coin && errors.base_coin
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <option value="">{t("Select A Network")}</option>
                      <option value="BNB">{t("BNB")}</option>
                      <option value="ETH">{t("ETH")}</option>
                    </Field>
                  </div>
                  <div className="col-md-6 form-input-div">
                    <label className="ico-label-box" htmlFor="">
                      {t("Network")}
                    </label>
                    <Field
                      type="text"
                      name="chain_link"
                      className={`ico-input-box ${
                        touched.chain_link && errors.chain_link
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={async (e: any) => {
                        if (values.chain_link && values.contract_address) {
                          setWarning(true);
                          const response = await getContractAddressDetails({
                            contract_address: values.contract_address,
                            chain_link: values.chain_link,
                          });

                          if (response.success == false) {
                            toast.error(response.message);
                          }
                          setFieldValue("decimal", response.data.token_decimal);
                          setFieldValue("token_name", response.data.name);

                          setFieldValue("token_symbol", response.data.symbol);
                          setFieldValue("chain_id", response.data.chain_id);
                          setWarning(false);
                        }
                      }}
                    />
                  </div>
                  <div className="col-md-6 form-input-div">
                    <label className="ico-label-box" htmlFor="">
                      {t("Contract Address")}
                    </label>
                    <Field
                      type="text"
                      name="contract_address"
                      className={`ico-input-box ${
                        touched.contract_address && errors.contract_address
                          ? "is-invalid"
                          : ""
                      }`}
                      // disabled={!values.chain_link}
                      onClick={() => {
                        if (!values.chain_link) {
                          toast.warning("Please fill the chain link");
                        }
                      }}
                      onBlur={async (e: any) => {
                        if (values.chain_link && values.contract_address) {
                          setWarning(true);
                          const response = await getContractAddressDetails({
                            contract_address: values.contract_address,
                            chain_link: values.chain_link,
                          });

                          if (response.success == false) {
                            toast.error(response.message);
                          }
                          setFieldValue("decimal", response.data.token_decimal);
                          setFieldValue("token_name", response.data.name);
                          setFieldValue("chain_id", response.data.chain_id);
                          setFieldValue("token_symbol", response.data.symbol);
                          setWarning(false);
                        }
                      }}
                    />
                    {warning && (
                      <p className="text-warning">
                        {t("Validating contract address")}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6 form-input-div">
                    <label className="ico-label-box" htmlFor="">
                      {t("Token Symbol")}
                    </label>
                    <Field
                      type="text"
                      name="token_symbol"
                      disabled
                      className={`ico-input-box ${
                        touched.wallet_address && errors.wallet_address
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                  </div>
                  <div className="col-md-6 form-input-div">
                    <label className="ico-label-box" htmlFor="">
                      {t("Token Name")}
                    </label>
                    <Field
                      type="text"
                      name="token_name"
                      disabled
                      className={`ico-input-box ${
                        touched.token_name && errors.token_name
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                  </div>
                  <div className="col-md-6 form-input-div">
                    <label className="ico-label-box" htmlFor="">
                      {t("Chain Id")}
                    </label>
                    <Field
                      type="text"
                      disabled
                      name="chain_id"
                      className={`ico-input-box ${
                        touched.chain_id && errors.chain_id ? "is-invalid" : ""
                      }`}
                    />
                  </div>
                  <div className="col-md-6 form-input-div">
                    <label className="ico-label-box" htmlFor="">
                      {t("Decimal")}
                    </label>
                    <Field
                      type="text"
                      name="decimal"
                      className={`ico-input-box ${
                        touched.decimal && errors.decimal ? "is-invalid" : ""
                      }`}
                    />
                  </div>
                  <div className="col-md-6 form-input-div">
                    <label className="ico-label-box" htmlFor="">
                      {t("Wallet Address")}
                    </label>
                    <Field
                      type="text"
                      name="wallet_address"
                      className={`ico-input-box ${
                        touched.wallet_address && errors.wallet_address
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                  </div>
                  <div className="col-md-6 form-input-div">
                    <label className="ico-label-box" htmlFor="">
                      {t("Wallet Private Key")}
                    </label>
                    <Field
                      type="password"
                      name="wallet_private_key"
                      className={`ico-input-box ${
                        touched.wallet_private_key && errors.wallet_private_key
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                  </div>
                  <div className="col-md-6 form-input-div">
                    <label className="ico-label-box" htmlFor="">
                      {t("Gas Limit")}
                    </label>
                    <Field
                      type="number"
                      name="gas_limit"
                      className={`ico-input-box ${
                        touched.gas_limit && errors.gas_limit
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                  </div>
                  <div className="col-md-6 form-input-div">
                    <label className="ico-label-box" htmlFor="">
                      {t("Website Link")}
                    </label>
                    <Field
                      type="text"
                      name="website_link"
                      className={`ico-input-box ${
                        touched.website_link && errors.website_link
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                  </div>
                  <div className="col-md-6 form-input-div">
                    <label className="ico-label-box" htmlFor="">
                      {t("Details rule")}
                    </label>
                    <Field
                      as="textarea"
                      name="details_rule"
                      className={`ico-input-box ${
                        touched.details_rule && errors.details_rule
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                  </div>
                  <div className="col-md-6 form-input-div">
                    <label className="ico-label-box" htmlFor="">
                      {t("Upload Image")}
                    </label>
                    <input
                      type="file"
                      name="image"
                      required={!image}
                      className={`ico-input-box`}
                      onChange={(e: any) => {
                        setImage(e.target.files[0]);
                      }}
                    />
                    {data?.image_path && (
                      <img src={data?.image_path} className="img-fluid mt-2" />
                    )}
                  </div>
                  <div className="col-md-12 form-input-div">
                    <button type="submit" className="primary-btn">
                      {loading
                        ? t("Loading..")
                        : edit
                        ? t("Edit")
                        : t("Create Token")}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { id, edit } = ctx.query;
  await SSRAuthCheck(ctx, "/ico/applied-launchpad");
  const icoList = await icoListDetails(id);

  return {
    props: {
      id: id,
      edit: edit ? edit : null,
      data: icoList?.data ? icoList?.data : null,
    },
  };
};
export default TokenCreate;
