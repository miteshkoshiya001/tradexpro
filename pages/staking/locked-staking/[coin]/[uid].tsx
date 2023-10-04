import { formateData } from "common";
import BackButton from "components/P2P/BackButton";
import SectionLoading from "components/common/SectionLoading";
import Footer from "components/common/footer";
import { STAKING_TERMS_TYPE_STRICT } from "helpers/core-constants";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TotalInvestmentBonus } from "service/staking";
import {
  GetOfferlistDetailsAction,
  InvesmentSubmitAction,
} from "state/actions/staking";

const LockedStaking = () => {
  const [loading, setLoading] = useState(false);
  const [offerList, setofferList] = useState([]);
  const [totalBonus, setTotalBonus] = useState(null);
  const [buttonLoading, setbuttonLoading] = useState(false);
  const [isChecked, setisChecked] = useState(false);
  const [amount, setAmount] = useState(0);
  const [autoRenew, setAutoRenew] = useState(1);
  const [details, setDetails] = useState<any>();
  const router = useRouter();
  const { uid, coin } = router.query;
  const handleCheckboxChange = (event: any) => {
    setisChecked(event.target.checked);
  };
  const [selectedDayUid, setSelectedDayUid] = useState(uid);

  const handleAutoRenewChange = (event: any) => {
    if (event.target.checked) {
      setAutoRenew(2);
    } else {
      setAutoRenew(1);
    }
  };
  useEffect(() => {
    uid && GetOfferlistDetailsAction(uid, setDetails, setLoading, setofferList);
    setSelectedDayUid(uid);
  }, [uid]);
  const getBonus = async () => {
    const response = await TotalInvestmentBonus(uid, amount);
    if (response.success) {
      setTotalBonus(response?.data?.total_bonus);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      getBonus();
    }, 1000);
  }, [amount]);
  return (
    <div className="">
      <div className="container">
        {loading ? (
          <SectionLoading />
        ) : (
          <div className="col-12 p-5 boxShadow mb-5 mt-5">
            <div className="mt-3 mb-3">
              <BackButton />
            </div>
            <h1 className="ny-3">Staking</h1>
            <hr />
            <div className="rounded">
              <div className="row">
                <div className="col-md-6">
                  <div className="tableImg d-flex align-items-center">
                    <img src={details?.coin_icon} alt="" />
                    <h5>{details?.coin_type}</h5>
                  </div>
                  <div className="row pt-6 mt-3">
                    <div className="col-lg-12">
                      <div className="est-price">
                        <p>Type</p>
                        <h6 className="pl-3 text-warning">
                          {details?.terms_type === STAKING_TERMS_TYPE_STRICT
                            ? "Locked"
                            : "Flexible"}
                        </h6>
                      </div>
                      <div className="est-price">
                        <p>Duration</p>
                        <td>
                          <div className="d-flex align-items-center">
                            {offerList?.map((offer: any, index: any) => (
                              <div
                                className={
                                  selectedDayUid === offer?.uid
                                    ? "StakingDaysActive"
                                    : "StakingDays"
                                }
                                key={index}
                                onClick={() => {
                                  router.push(
                                    `/staking/locked-staking/${coin}/${offer?.uid}`
                                  );
                                }}
                              >
                                {offer?.period} Days
                              </div>
                            ))}
                          </div>
                        </td>
                      </div>
                      <div className="est-price">
                        <p>Stake Date</p>
                        <h6 className="pl-3">
                          {formateData(details?.stake_date)}
                        </h6>
                      </div>
                      <div className="est-price">
                        <p>Value Date</p>
                        <h6 className="pl-3">
                          {formateData(details?.value_date)}
                        </h6>
                      </div>
                      <div className="est-price">
                        <p>Interest Period</p>
                        <h6 className="pl-3">
                          {details?.interest_period} Days
                        </h6>
                      </div>
                      <div className="est-price">
                        <p>Interest End Date</p>
                        <h6 className="pl-3">{details?.interest_end_date}</h6>
                      </div>
                      {details?.terms_type !== STAKING_TERMS_TYPE_STRICT && (
                        <div className="est-price">
                          <p>Minimum Maturity Period</p>
                          <h6 className="pl-3">
                            {details?.minimum_maturity_period} Day
                          </h6>
                        </div>
                      )}
                      <div className="est-price">
                        <p>Minimum Amount</p>
                        <h6 className="pl-3">{details?.minimum_investment}</h6>
                      </div>
                      <div className="est-price">
                        <p>Available Amount</p>
                        <h6 className="pl-3">
                          {!parseFloat(details?.total_investment_amount)
                            ? parseFloat(details?.maximum_investment) - 0
                            : parseFloat(details?.maximum_investment) -
                              parseFloat(details?.total_investment_amount)}
                        </h6>
                      </div>
                      {details?.terms_type !== STAKING_TERMS_TYPE_STRICT && (
                        <div className="est-price">
                          <p>Minimum Maturity Period</p>
                          <h6 className="pl-3">
                            {details?.minimum_maturity_period} Day
                          </h6>
                        </div>
                      )}
                      <div className="est-price">
                        <p>Estimated Intereste</p>
                        <h6 className="pl-3">{totalBonus}</h6>
                      </div>
                      <div className=" mt-5">
                        <h4>Enable Auto Staking</h4>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={autoRenew === 1 ? false : true}
                            name="auto_renew_status"
                            onChange={handleAutoRenewChange}
                          />
                          <span className="slider round"></span>
                        </label>
                        <br />
                        <small>
                          Auto Staking is a feature that lets you earn staking
                          rewards automatically without any manual effort.
                        </small>
                      </div>
                      <div className="est-price mt-5">
                        <h4>Est. APR</h4>
                        <h4 className="text-success">
                          {details?.offer_percentage}%
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <form className="col-md-6">
                  <div>
                    <label>Lock Amount</label>
                    <div className="P2psearchBox position-relative">
                      <input
                        type="number"
                        placeholder=""
                        defaultValue={amount}
                        onChange={(e: any) => {
                          setAmount(e.target.value);
                        }}
                      />
                      {/* <p className="limitBalance my-2">
                        Available Amount 500000.3215
                      </p> */}
                      <button>
                        <span className="ml-3 text-muted">
                          {details?.coin_type}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="">
                    <div className="pt-5">
                      <h5 className="mb-4">Terms and Conditions</h5>
                      {parseFloat(details?.user_minimum_holding_amount) > 0 && (
                        <div className="">
                          <b>
                            - You must have atlest{" "}
                            {parseFloat(details?.user_minimum_holding_amount)}{" "}
                            {details?.coin_type} in your account
                          </b>
                        </div>
                      )}
                      {parseFloat(details?.registration_before) > 0 && (
                        <div className="">
                          <b>
                            - You must have registered before{" "}
                            {parseFloat(details?.registration_before)} days
                          </b>
                        </div>
                      )}
                      {parseFloat(details?.phone_verification) > 0 && (
                        <div className="">
                          <b>- You must have verified phone number </b>
                        </div>
                      )}
                      {parseFloat(details?.kyc_verification) > 0 && (
                        <div className="">
                          <b>- You must have completed your KYC Verification</b>
                        </div>
                      )}

                      <div
                        dangerouslySetInnerHTML={{
                          // __html: clean(details.description),
                          __html: details?.terms_condition,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="form-group mt-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="agreeCheck"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <label className="form-check-label" htmlFor="agreeCheck">
                        I agree to the terms and conditions
                      </label>
                    </div>
                  </div>
                  <div className="mt-3 d-flex justify-content-center">
                    <button
                      className="primary-btn-outline w-100 "
                      type="button"
                      disabled={isChecked ? false : true}
                      onClick={() => {
                        InvesmentSubmitAction(
                          uid,
                          autoRenew,
                          amount,
                          setbuttonLoading,
                          router
                        );
                      }}
                    >
                      {buttonLoading ? "Please wait" : "Confirm"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/staking");

  return {
    props: {},
  };
};
export default LockedStaking;
