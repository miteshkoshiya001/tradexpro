import type { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { ResetPasswordAction, useCapchaInitialize } from "state/actions/user";
import Link from "next/link";
//@ts-ignore
import ReCAPTCHA from "react-google-recaptcha";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { CAPTCHA_TYPE_GEETESTCAPTCHA, CAPTCHA_TYPE_RECAPTCHA } from "helpers/core-constants";
const ResetPassword: NextPage = () => {
  const { t } = useTranslation("common");
  const { geeTest, captchaData } = useCapchaInitialize();

  const [processing, setProcessing] = useState(false);
  const { settings } = useSelector((state: RootState) => state.common);

  let captcha: any;
  const setCaptchaRef = (ref: any) => {
    if (ref) {
      return (captcha = ref);
    }
  };
  const resetCaptcha = () => {
    captcha?.reset();
  };

  return (
    <>
      <div className="d-md-flex d-block">
        <div
          className="col-md-5 login_bg_new"
          style={{
            backgroundImage: `url(${settings.login_background})`,
          }}
        >
          <div className="user-content-text text-center text-md-left">
            <Link href="/">
              <a className="auth-logo" href="">
                <img
                  width="65%"
                  src={settings.logo || ""}
                  className="pt-5 pt-md-4"
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="d-md-flex d-block align-items-center justify-content-center h-75">
            <div className="text-center text-md-left">
              <h1 className="text-white">
                {t("Welcome To")} {settings.app_title}
              </h1>
              <Link href="/signin">
                <p className="text-white h4">
                  {t("Return to")}
                  <a className="text-theme" href="">
                    {t(" Sign In ")}
                  </a>
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-7 d-flex align-items-center login_from_res">
          <div className="row w-100 mx-auto">
            <div className="col-lg-8 col-md-12 mx-md-auto">
              <div className="user-content-text text-left d-block d-md-none">
                <Link href="/">
                  <a className="auth-logo" href="">
                    <img
                      width="60%"
                      src={settings.logo || ""}
                      className="pt-5 pt-md-4"
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div className="user-form border-0 my-4 my-md-0">
                <div className="user-form-inner">
                  <div className="form-top text-left">
                    <h2>{t("Reset Password ")}</h2>
                    <p>
                      {t(
                        "Please enter the new password and code to reset the password"
                      )}
                    </p>
                  </div>
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
                      password_confirmation: "",
                      token: "",
                      recapcha:
                        parseInt(captchaData?.select_captcha_type) !==
                        CAPTCHA_TYPE_RECAPTCHA
                          ? "ksmaldkmalksmdlkamsdlk"
                          : "",
                    }}
                    validationSchema={Yup.object({
                      email: Yup.string()
                        .email(t("Invalid email address"))
                        .required(t("Email is required")),
                      password: Yup.string()
                        .min(6, t("Password must be at least 6 characters"))
                        .required(t("Password is required")),
                      password_confirmation: Yup.string()
                        .oneOf(
                          [Yup.ref("password"), null],
                          t("Passwords must match")
                        )
                        .required(t("Password confirmation is required")),
                      token: Yup.string().required(t("Code is required")),
                      recapcha: Yup.string()
                        .min(6)
                        .required(t("Recapcha is required")),
                    })}
                    onSubmit={async (values) => {
                      if (
                        parseInt(captchaData?.select_captcha_type) ===
                        CAPTCHA_TYPE_GEETESTCAPTCHA
                      ) {
                        geeTest.showCaptcha();
                        geeTest.onSuccess(async () => {
                          var result = geeTest.getValidate();
                          let local_value: any = values;
                          local_value.lot_number = result.lot_number;
                          local_value.captcha_output = result.captcha_output;
                          local_value.pass_token = result.pass_token;
                          local_value.gen_time = result.gen_time;
                          await ResetPasswordAction(local_value, setProcessing);
                        });
                      } else {
                        await ResetPasswordAction(values, setProcessing);
                      }
                    }}
                  >
                    {({ errors, touched, setFieldValue }) => (
                      <Form>
                        <div className="form-group">
                          <Field
                            type="email"
                            name="email"
                            id="email"
                            className={`form-control ${
                              touched.email && errors.email ? "is-invalid" : ""
                            }`}
                            placeholder={t("Your email here")}
                          />
                        </div>

                        <div className="form-group">
                          <Field
                            type="password"
                            name="password"
                            id="password"
                            className={`form-control ${
                              touched.password && errors.password
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder={t("Type your new password")}
                          />
                        </div>

                        <div className="form-group">
                          <Field
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            className={`form-control ${
                              touched.password_confirmation &&
                              errors.password_confirmation
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder={t("Reenter your new password")}
                          />
                        </div>

                        <div className="form-group">
                          <Field
                            type="token"
                            name="token"
                            id="token"
                            className={`form-control ${
                              touched.token && errors.token ? "is-invalid" : ""
                            }`}
                            placeholder={t("Your code here")}
                          />
                        </div>

                        {captchaData?.NOCAPTCHA_SITEKEY &&
                          parseInt(captchaData?.select_captcha_type) ===
                            CAPTCHA_TYPE_RECAPTCHA && (
                            <ReCAPTCHA
                              ref={(r: any) => setCaptchaRef(r)}
                              sitekey={captchaData?.NOCAPTCHA_SITEKEY}
                              render="explicit"
                              onChange={(response: any) => {
                                setFieldValue("recapcha", response);
                              }}
                            />
                          )}
                        <button
                          onClick={() => resetCaptcha()}
                          type="submit"
                          className="btn nimmu-user-sibmit-button mt-3"
                        >
                          {processing ? (
                            <>
                              <span
                                className="spinner-border spinner-border-md"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              <span>{t("Please wait")}</span>
                            </>
                          ) : (
                            t("Submit")
                          )}
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  // await authPageRequireCheck(ctx);
  return {
    props: {},
  };
};
export default ResetPassword;
