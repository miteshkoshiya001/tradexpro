import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { G2fVerifyAction } from "state/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { g2fPageRequireCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import { RootState } from "state/store";
import Link from "next/link";

const G2fverify = () => {
  const { settings } = useSelector((state: RootState) => state.common);
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  return (
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
                  <h2>{t("Two Factor Authentication")}</h2>
                  <p>
                    {t(
                      "Open your authentication app and enter the code to verify"
                    )}
                  </p>
                </div>
                <Formik
                  initialValues={{
                    code: "",
                  }}
                  validationSchema={Yup.object({
                    code: Yup.string()
                      .required(t("Code is required"))
                      .min(6, t("Code must be at least 6 characters")),
                  })}
                  onSubmit={async (values, { setSubmitting }) => {
                    const code = parseInt(values.code);
                    dispatch(G2fVerifyAction(code));
                    setSubmitting(false);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="form-group">
                        <label>{t("Authentication Code")}</label>
                        <Field
                          type="number"
                          id="exampleInputEmail1"
                          name="code"
                          className={`form-control ${
                            touched.code && errors.code ? "is-invalid" : ""
                          }`}
                          placeholder={t("code")}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary nimmu-user-sibmit-button mt-3 border-0"
                      >
                        {t("Verify")}
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
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await g2fPageRequireCheck(ctx);
  return { props: {} };
};

export default G2fverify;
