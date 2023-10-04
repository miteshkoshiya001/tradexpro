import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { useRouter } from "next/router";
import { launchpadCreateUpdatePhaseAction } from "state/actions/launchpad";
import { GetCoinListApi } from "service/wallet";
import { icoListDetails, phaseListDetails } from "service/launchpad";
import { parseCookies } from "nookies";

const CreateEditPhase = ({ id, edit, data }: any) => {
  const { t } = useTranslation("common");
  const [coinList, setCoinList] = useState([]);
  const [phaseForm, setphaseForm]: any = useState<any>({
    id: edit ? data.id : null,
    ico_token_id: edit ? data.ico_token_id : id,
    coin_price: edit ? data.coin_price : "",
    coin_currency: edit ? data.coin_currency : "",
    total_token_supply: edit ? data.total_token_supply : "",
    phase_title: edit ? data.phase_title : "",
    start_date: edit ? data.start_date : "",
    end_date: edit ? data.end_date : "",
    description: edit ? data.description : "",
    video_link: edit ? data.video_link : "",
    maximum_purchase_price: edit ? data.maximum_purchase_price : "",
    minimum_purchase_price: edit ? data.minimum_purchase_price : "",
    image: "",
    editImage: edit ? data.image : "",
    social_link: {
      1: edit ? JSON.parse(data.social_link).Facebook : "",
      2: edit ? JSON.parse(data.social_link).Twitter : "",
      3: edit ? JSON.parse(data.social_link).Linkedin : "",
    },
  });
  const [formFields, setFormFields] = useState<any>([]);
  const [loading, setLoading]: any = useState<any>(false);
  const router = useRouter();
  const getCoinList = async () => {
    const coinResponse = await GetCoinListApi();
    setCoinList(coinResponse.data);
  };
  useEffect(() => {
    getCoinList();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="ico-tokenCreate boxShadow mt-5">
          <div className="col-12">
            <h2>
              {t(
                `${router.query.edit === "true" ? "Edit" : "Create New"}  Phase`
              )}
            </h2>
          </div>
          <div className="ico-create-form col-12">
            <form
              className="row"
              onSubmit={(e) => {
                e.preventDefault();
                launchpadCreateUpdatePhaseAction(phaseForm, setLoading, id);
              }}
            >
              <div className="col-md-6 form-input-div">
                <label className="ico-label-box" htmlFor="">
                  {t("Coin price")}
                </label>
                <input
                  type="number"
                  name="coin_price"
                  required
                  value={phaseForm.coin_price}
                  onChange={(e) => {
                    setphaseForm({
                      ...phaseForm,
                      coin_price: e.target.value,
                    });
                  }}
                  className={`ico-input-box`}
                />
              </div>
              <div className="col-md-6 form-input-div">
                <label className="ico-label-box" htmlFor="">
                  {t("Select Coin Currency")}
                </label>
                <select
                  name="coin_currency"
                  className={`ico-input-box`}
                  required
                  onChange={(e) => {
                    setphaseForm({
                      ...phaseForm,
                      coin_currency: e.target.value,
                    });
                  }}
                >
                  <option value="">{t("Select currency")}</option>
                  {coinList.map((item: any, index: any) => (
                    <option
                      key={index}
                      selected={phaseForm.coin_currency === item.coin_type}
                      value={item.coin_type}
                    >
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 form-input-div">
                <label className="ico-label-box" htmlFor="">
                  {t("Maximum purchase price")}
                </label>
                <input
                  type="number"
                  name="maximum_price"
                  required
                  value={phaseForm.maximum_purchase_price}
                  onChange={(e) => {
                    setphaseForm({
                      ...phaseForm,
                      maximum_purchase_price: e.target.value,
                    });
                  }}
                  className={`ico-input-box`}
                />
              </div>
              <div className="col-md-6 form-input-div">
                <label className="ico-label-box" htmlFor="">
                  {t("Minimum purchase price")}
                </label>
                <input
                  type="number"
                  name="maximum_price"
                  required
                  value={phaseForm.minimum_purchase_price}
                  onChange={(e) => {
                    setphaseForm({
                      ...phaseForm,
                      minimum_purchase_price: e.target.value,
                    });
                  }}
                  className={`ico-input-box`}
                />
              </div>
              <div className="col-md-12 form-input-div">
                <label className="ico-label-box" htmlFor="">
                  {t("Phase Title")}
                </label>
                <input
                  type="text"
                  name="phase_title"
                  required
                  value={phaseForm.phase_title}
                  onChange={(e) => {
                    setphaseForm({
                      ...phaseForm,
                      phase_title: e.target.value,
                    });
                  }}
                  className={`ico-input-box`}
                />
              </div>
              <div className="col-md-12 form-input-div">
                <label className="ico-label-box" htmlFor="">
                  {t("Total Token Supply")}
                </label>
                <input
                  type="number"
                  name="total_token_supply"
                  required
                  value={phaseForm.total_token_supply}
                  onChange={(e) => {
                    setphaseForm({
                      ...phaseForm,
                      total_token_supply: e.target.value,
                    });
                  }}
                  className={`ico-input-box`}
                />
              </div>

              <div className="col-md-6 form-input-div">
                <label className="ico-label-box" htmlFor="">
                  {t("Start Date")}
                </label>
                <input
                  type="date"
                  name="start_date"
                  required
                  value={phaseForm.start_date}
                  onChange={(e) => {
                    setphaseForm({
                      ...phaseForm,
                      start_date: e.target.value,
                    });
                  }}
                  className={`ico-input-box`}
                />
              </div>
              <div className="col-md-6 form-input-div">
                <label className="ico-label-box" htmlFor="">
                  {t("End Date")}
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={phaseForm.end_date}
                  onChange={(e) => {
                    setphaseForm({
                      ...phaseForm,
                      end_date: e.target.value,
                    });
                  }}
                  className={`ico-input-box`}
                />
              </div>
              <div className="col-md-12 form-input-div">
                <label className="ico-label-box" htmlFor="">
                  {t("Description")}
                </label>
                <textarea
                  name="description"
                  className={`ico-input-box`}
                  required
                  value={phaseForm.description}
                  onChange={(e) => {
                    setphaseForm({
                      ...phaseForm,
                      description: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="col-md-6 form-input-div">
                <label className="ico-label-box" htmlFor="">
                  {t("Video Link")}
                </label>
                <input
                  type="text"
                  name="video_link"
                  value={phaseForm.video_link}
                  onChange={(e) => {
                    setphaseForm({
                      ...phaseForm,
                      video_link: e.target.value,
                    });
                  }}
                  className={`ico-input-box`}
                />
              </div>

              <div className="col-md-6 form-input-div">
                <label className="ico-label-box" htmlFor="">
                  {t("Facebook Link")}
                </label>
                <input
                  type="text"
                  name="social_link"
                  className={`ico-input-box`}
                  value={phaseForm.social_link["1"]}
                  onChange={(e: any) => {
                    setphaseForm({
                      ...phaseForm,
                      social_link: {
                        ...phaseForm.social_link,
                        ["1"]: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="col-md-6 form-input-div">
                <label className="ico-label-box" htmlFor="">
                  {t("Twitter Link")}
                </label>
                <input
                  type="text"
                  name="social_link"
                  className={`ico-input-box`}
                  value={phaseForm.social_link["2"]}
                  onChange={(e: any) => {
                    setphaseForm({
                      ...phaseForm,
                      social_link: {
                        ...phaseForm.social_link,
                        ["2"]: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="col-md-6 form-input-div">
                <label className="ico-label-box" htmlFor="">
                  {t("Linkedin Link")}
                </label>
                <input
                  type="text"
                  name="social_link"
                  className={`ico-input-box`}
                  value={phaseForm.social_link["3"]}
                  onChange={(e: any) => {
                    setphaseForm({
                      ...phaseForm,
                      social_link: {
                        ...phaseForm.social_link,
                        ["3"]: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="col-md-6 form-input-div">
                <label className="ico-label-box" htmlFor="">
                  {t("Upload Image")}
                </label>
                <input
                  type="file"
                  name="image"
                  required={!phaseForm.editImage}
                  className={`ico-input-box`}
                  onChange={(e: any) => {
                    setphaseForm({
                      ...phaseForm,
                      image: e.target.files[0],
                    });
                  }}
                />
                <img src={phaseForm.editImage} className="img-fluid mt-2" />
              </div>
              <div className="col-md-12 form-input-div">
                <button type="submit" className="primary-btn">
                  {loading
                    ? t("Loading..")
                    : edit
                    ? t("Edit Phase")
                    : t("Create Phase")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { id, edit } = ctx.query;
  await SSRAuthCheck(ctx, "/ico/applied-launchpad");
  const cookies = parseCookies(ctx);
  let icoList: any;
  if (edit) {
    icoList = await phaseListDetails(id, cookies.token);
  }
  return {
    props: {
      id: id,
      edit: edit ? edit : null,
      data: edit ? icoList.data : {},
    },
  };
};
export default CreateEditPhase;
