import type { GetServerSideProps, NextPage } from "next";
import * as Yup from "yup";
import {
  GetUserInfoByTokenAction,
  SigninAction,
  useCapchaInitialize,
} from "state/actions/user";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
//@ts-ignore
import ReCAPTCHA from "react-google-recaptcha";

import Link from "next/link";
import { authPageRequireCheck } from "middlewares/ssr-authentication-check";
import useTranslation from "next-translate/useTranslation";
import { destroyCookie } from "nookies";
import { RootState } from "state/store";
import {
  CAPTCHA_TYPE_GEETESTCAPTCHA,
  CAPTCHA_TYPE_RECAPTCHA,
} from "helpers/core-constants";
const Signin: NextPage = () => {
  const { settings } = useSelector((state: RootState) => state.common);
  const { geeTest, captchaData } = useCapchaInitialize();
  const { t } = useTranslation("common");
  const [showPassword, setShowPassword] = useState(false);
  const [processing, setProcessing] = useState<any>(false);
  const dispatch = useDispatch();

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
              <Link href="/signup">
                <p className="text-white h5 mt-2">
                  {t("Don’t have an account ? ")}
                  <a className="text-theme" href="">
                    {t(" Sign Up ")}
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
                    <h2>{t("Sign In")}</h2>
                    <p>{t("Please Sign In To Your Account")}</p>
                  </div>
                  <Formik
                    initialValues={{
                      email: "",
                      password: "",
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
                        .min(6)
                        .required(t("Password is required")),
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
                          await dispatch(
                            SigninAction(local_value, setProcessing)
                          );
                          await dispatch(GetUserInfoByTokenAction());
                        });
                      } else {
                        await dispatch(SigninAction(values, setProcessing));
                        await dispatch(GetUserInfoByTokenAction());
                      }
                    }}
                  >
                    {({ errors, touched, setFieldValue }) => (
                      //@ts-ignore
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

                        <div className="form-group my-4">
                          <Field
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            className={`form-control form-control-password look-pass ${
                              touched.password && errors.password
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder={t("Your password here")}
                          />

                          <span
                            className="eye rev"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <i className="fa fa-eye toggle-password"></i>
                            ) : (
                              <i className="fa fa-eye-slash toggle-password"></i>
                            )}
                          </span>
                        </div>

                        <div className="form-group">
                          <p className="invalid-feedback">{t("Message")}</p>
                        </div>
                        <div className="d-flex justify-content-between rememberme align-items-center mb-4">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input ml-1"
                              id="exampleCheck1"
                            />
                            <label className="form-check-label ml-2">
                              {t("Remember me")}
                            </label>
                          </div>
                          <div className="text-right">
                            <Link href="/forgot-password">
                              <a className="text-theme forgot-password">
                                {t("Forgot Password?")}
                              </a>
                            </Link>
                          </div>
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
                          disabled={processing}
                          className="btn nimmu-user-sibmit-button mt-4"
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
                            t("Sign In")
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
  try {
    await authPageRequireCheck(ctx);
  } catch (error) {
    destroyCookie(ctx, "token");
  }
  return {
    props: {},
  };
};

export default Signin;
