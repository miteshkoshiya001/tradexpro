import type { GetServerSideProps, NextPage } from "next";
import * as Yup from "yup";
import { VerifyEmailAction, useCapchaInitialize } from "state/actions/user";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { toast } from "react-toastify";
//@ts-ignore
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import { authPageRequireCheck } from "middlewares/ssr-authentication-check";
import { resendEmailApi } from "service/user";
import useTranslation from "next-translate/useTranslation";
import { RootState } from "state/store";
import {
  CAPTCHA_TYPE_GEETESTCAPTCHA,
  CAPTCHA_TYPE_RECAPTCHA,
} from "helpers/core-constants";
const Signin: NextPage = () => {
  const { t } = useTranslation("common");
  const { logo } = useSelector((state: RootState) => state.user);
  const [dependency, setDependency] = useState<any>("");
  const { settings } = useSelector((state: RootState) => state.common);
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(0);
  const { geeTest, captchaData } = useCapchaInitialize();

  const foo = useRef();

  const resendEmail = async (email: string) => {
    const response = await resendEmailApi(email);
    setDependency(Math.random);
    setSeconds(60);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
  let captcha: any;
  const setCaptchaRef = (ref: any) => {
    if (ref) {
      return (captcha = ref);
    }
  };
  const resetCaptcha = () => {
    captcha?.reset();
  };
  useEffect(() => {
    function tick() {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }
    //@ts-ignore
    foo.current = setInterval(() => tick(), 1000);
  }, [dependency]);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(foo.current);
    }
  }, [seconds]);
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
                <p className="text-white h5">
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
                    <h2>{t("Verify Email")}</h2>
                    <p>{t("Please Verify Your Email")}</p>
                  </div>
                  <Formik
                    initialValues={{
                      email: "",
                      verify_code: "",
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
                      verify_code: Yup.string()
                        .min(6)
                        .required(t("Code is required")),
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
                            VerifyEmailAction(local_value, setProcessing)
                          );
                        });
                      } else {
                        await dispatch(
                          VerifyEmailAction(values, setProcessing)
                        );
                      }
                    }}
                  >
                    {({ errors, touched, setFieldValue, values }: any) => (
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
                        {values.email && (
                          <div className="resend-container">
                            <button
                              className="btn"
                              type="button"
                              disabled={seconds !== 0}
                              onClick={() => {
                                resendEmail(values.email);
                              }}
                            >
                              {seconds !== 0
                                ? t(`Resend after ${seconds} sec`)
                                : t("Resend email")}
                            </button>
                          </div>
                        )}

                        <div className="form-group">
                          <Field
                            type={"number"}
                            name="verify_code"
                            id="verify_code"
                            className={`form-control form-control-password look-pass ${
                              touched.verify_code && errors.verify_code
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder={t("Your code here")}
                          />
                        </div>
                        <ErrorMessage
                          name="verify_code"
                          component="div"
                          className="red-text"
                        />

                        <div className="form-group">
                          <p className="invalid-feedback">{t("Message")}</p>
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
                            t("Verify Email")
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
  await authPageRequireCheck(ctx);
  return {
    props: {},
  };
};

export default Signin;
