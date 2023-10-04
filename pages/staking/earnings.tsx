import { StakingTopBar } from "components/Staking/common/TopBar";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { earningsAction } from "state/actions/staking";

const Earnings = () => {
  const [statsDetails, setStatsDetails] = useState<any>();
  useEffect(() => {
    earningsAction(setStatsDetails);
  }, []);
  return (
    <div>
      <div className="">
        <div className="section-top-wrap mb-25">
          <div className="overview-area">
            <div className="overview-left">
              <h2 className="section-top-title">My Earnings</h2>
            </div>
          </div>
        </div>
      </div>
      <StakingTopBar />
      <div className="container">
        <div className=" row">
          <div className="col-6 mt-3">
            <h5>Total Investment</h5>
            {statsDetails?.total_investment.length === 0 ? (
              <p className="p-5 boxShadow text-center mt-3">
                No data available
              </p>
            ) : (
              <table className="table mt-4">
                <thead>
                  <tr>
                    <th scope="col">Coin Type</th>
                    <th scope="col">Total Bonus</th>
                  </tr>
                </thead>
                <tbody>
                  {statsDetails?.total_investment?.map(
                    (item: any, index: any) => (
                      <tr className="tableRow" key={index}>
                        <td>
                          <div className="tableImg d-flex align-items-center">
                            <h6 className="">{item?.coin_type}</h6>
                          </div>
                        </td>
                        <td>
                          <h6 className="mx-2">
                            {parseFloat(item?.total_investment)}
                          </h6>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>

          <div className="col-6 mt-3">
            <h5>Disputed Investment</h5>
            {statsDetails?.total_paid_investment.length === 0 ? (
              <p className="p-5 boxShadow text-center mt-3">
                No data available
              </p>
            ) : (
              <table className="table mt-4">
                <thead>
                  <tr>
                    <th scope="col">Coin Type</th>
                    <th scope="col">Total Bonus</th>
                  </tr>
                </thead>
                <tbody>
                  {statsDetails?.total_paid_investment?.map(
                    (item: any, index: any) => (
                      <tr className="tableRow" key={index}>
                        <td>
                          <div className="tableImg d-flex align-items-center">
                            <h6 className="">{item?.coin_type}</h6>
                          </div>
                        </td>
                        <td>
                          <h6 className="mx-2">
                            {parseFloat(item?.total_investment)}
                          </h6>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
          <div className="col-6 mt-3">
            <h5>Total Running Investment</h5>
            {statsDetails?.total_running_investment.length === 0 ? (
              <p className="p-5 boxShadow text-center mt-3">
                No data available
              </p>
            ) : (
              <table className="table mt-4">
                <thead>
                  <tr>
                    <th scope="col">Coin Type</th>
                    <th scope="col">Total Bonus</th>
                  </tr>
                </thead>
                <tbody>
                  {statsDetails?.total_running_investment?.map(
                    (item: any, index: any) => (
                      <tr className="tableRow" key={index}>
                        <td>
                          <div className="tableImg d-flex align-items-center">
                            <h6 className="">{item?.coin_type}</h6>
                          </div>
                        </td>
                        <td>
                          <h6 className="mx-2">
                            {parseFloat(item?.total_investment)}
                          </h6>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
          <div className="col-6 mt-3">
            <h5>Total Dispributable Investment</h5>
            {statsDetails?.total_unpaid_investment.length === 0 ? (
              <p className="p-5 boxShadow text-center mt-3">
                No data available
              </p>
            ) : (
              <table className="table mt-4">
                <thead>
                  <tr>
                    <th scope="col">Coin Type</th>
                    <th scope="col">Total Bonus</th>
                  </tr>
                </thead>
                <tbody>
                  {statsDetails?.total_unpaid_investment?.map(
                    (item: any, index: any) => (
                      <tr className="tableRow" key={index}>
                        <td>
                          <div className="tableImg d-flex align-items-center">
                            <h6 className="">{item?.coin_type}</h6>
                          </div>
                        </td>
                        <td>
                          <h6 className="mx-2">
                            {parseFloat(item?.total_investment)}
                          </h6>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
          <div className="col-6 mt-3">
            <h5>Total Investment Cancelled</h5>
            {statsDetails?.total_cancel_investment.length === 0 ? (
              <p className="p-5 boxShadow text-center mt-3">
                No data available
              </p>
            ) : (
              <table className="table mt-4">
                <thead>
                  <tr>
                    <th scope="col">Coin Type</th>
                    <th scope="col">Total Bonus</th>
                  </tr>
                </thead>
                <tbody>
                  {statsDetails?.total_cancel_investment?.map(
                    (item: any, index: any) => (
                      <tr className="tableRow" key={index}>
                        <td>
                          <div className="tableImg d-flex align-items-center">
                            <h6 className="">{item?.coin_type}</h6>
                          </div>
                        </td>
                        <td>
                          <h6 className="mx-2">
                            {parseFloat(item?.total_investment)}
                          </h6>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/staking");

  return {
    props: {},
  };
};
export default Earnings;
