import React from "react";
import Image from "next/image";
import Link from "next/link";

export const SingleLaunchPool = () => {
  return (
    <>
      <div className="container singleLaunch">
        <div className="singleLaunchPadHero">
          <div className="singleLaunchPadHeroFlex">
            <div className="">
              <Image
                className="singleLaunchPadImg"
                src="/launchpad.png"
                height={150}
                width={205}
                layout="fixed"
                alt="---"
              />
            </div>
            <div className="">
              <div className="singleLaunchPadTitle">
                <h2>STEPN</h2>
                <div className="singleLaunchPadStatus">
                  <i className="fa-sharp fa-solid fa-circle-check"></i>
                  <p> FINISHED</p>
                </div>
              </div>

              <div className="singleLaunchPadLinkList">
                <p>STEPN - A Move-to-Earn Health and Fitness Application</p>
                <div className="linkLists">
                  <Link href="/">
                    <div>
                      <i className="fa-sharp fa-solid fa-link"></i>
                      <p>Website</p>
                    </div>
                  </Link>

                  <Link href="/">
                    <div>
                      <i className="fa-solid fa-receipt"></i>
                      <p>Whitepaper</p>
                    </div>
                  </Link>

                  <Link href="/">
                    <div>
                      <i className="fa-sharp fa-solid fa-lightbulb"></i>
                      <p>GMT Research Report</p>
                    </div>
                  </Link>

                  <Link href="/">
                    <div>
                      <i className="fa-sharp fa-solid fa-book"></i>
                      <p>View detailed rules</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="endtimeSingleLaunch">
            <p>End Time :</p>
            <p>2022-03-09</p>
          </div>
        </div>

        <div className="singlePoolTabs">
          <ul className="mb-3 nav nav-pills " id="pills-tab" role="tablist">
            <li className="tabs-item">
              <a
                className="active"
                id="pills-home-tab"
                data-toggle="pill"
                href="#pills-home"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                BNB Pool
              </a>
            </li>
            <li className="tabs-item">
              <a
                className=""
                id="pills-profile-tab"
                data-toggle="pill"
                href="#pills-profile"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                CAKE Pool
              </a>
            </li>
            <li className="tabs-item">
              <a
                className=""
                id="pills-contact-tab"
                data-toggle="pill"
                href="#pills-contact"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
              >
                BUSD Pool
              </a>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div className="launchCoinDetails launchPoolTab row mt-5">
                <div className="col-md-3 mb-5">
                  <p>Total BNB Pool Rewards</p>
                  <span>2,100,000.0000 GAL</span>
                </div>
                <div className="col-md-3">
                  <p>Staking Token</p>
                  <span>BNB</span>
                </div>
                <div className="col-md-3">
                  <p>Farming Period</p>
                  <span>30 Days</span>
                </div>
                <div className="col-md-3">
                  <p>Today’s GAL Pool Rewards</p>
                  <span>45,652.1700 GAL</span>
                </div>
                <div className="col-md-3">
                  <p>Total BNB Staked</p>
                  <span>6,924,524.7741 BNB</span>
                </div>
                <div className="col-md-3">
                  <p>BNB Annual Percentage Yield</p>
                  <span>4.50 %</span>
                </div>
              </div>

              <div className="row fundSection">
                <div>
                  <div className="mt-5">
                    <div className="myFundTitle">
                      <Image
                        src="/busd.svg"
                        alt="--"
                        layout="fixed"
                        width={35}
                        height={30}
                      />
                      <h2>My Funds</h2>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h6 className="mb-3">BUSD Staked</h6>
                    <div className="myFundTitle">
                      <p>---</p>
                      <h2>BUSD</h2>
                    </div>
                    <p>
                      Your staked BUSD has been automatically transferred back
                      to your spot account
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mt-5">
                    <div className="myFundTitle">
                      <Image
                        src="/gal.svg"
                        alt="--"
                        layout="fixed"
                        width={35}
                        height={30}
                      />
                      <h2>My Rewards</h2>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h6 className="mb-3">Total Rewards Received</h6>
                    <div className="myFundTitle">
                      <p>---</p>
                      <h2>GAL</h2>
                    </div>
                    <p>Your rewards have been sent to your spot account</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className="launchCoinDetails launchPoolTab row mt-5">
                <div className="col-md-3 mb-5">
                  <p>Total BNB Pool Rewards</p>
                  <span>2,100,000.0000 GAL</span>
                </div>
                <div className="col-md-3">
                  <p>Staking Token</p>
                  <span>BNB</span>
                </div>
                <div className="col-md-3">
                  <p>Farming Period</p>
                  <span>30 Days</span>
                </div>
                <div className="col-md-3">
                  <p>Today’s GAL Pool Rewards</p>
                  <span>45,652.1700 GAL</span>
                </div>
                <div className="col-md-3">
                  <p>Total BNB Staked</p>
                  <span>6,924,524.7741 BNB</span>
                </div>
                <div className="col-md-3">
                  <p>BNB Annual Percentage Yield</p>
                  <span>4.50 %</span>
                </div>
              </div>

              <div className="row fundSection">
                <div>
                  <div className="mt-5">
                    <div className="myFundTitle">
                      <Image
                        src="/cake.svg"
                        alt="--"
                        layout="fixed"
                        width={35}
                        height={30}
                      />
                      <h2>My Funds</h2>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h6 className="mb-3">BUSD Staked</h6>
                    <div className="myFundTitle">
                      <p>---</p>
                      <h2>BUSD</h2>
                    </div>
                    <p>
                      Your staked BUSD has been automatically transferred back
                      to your spot account
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mt-5">
                    <div className="myFundTitle">
                      <Image
                        src="/gal.svg"
                        alt="--"
                        layout="fixed"
                        width={35}
                        height={30}
                      />
                      <h2>My Rewards</h2>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h6 className="mb-3">Total Rewards Received</h6>
                    <div className="myFundTitle">
                      <p>---</p>
                      <h2>GAL</h2>
                    </div>
                    <p>Your rewards have been sent to your spot account</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
            >
              <div className="launchCoinDetails launchPoolTab row mt-5">
                <div className="col-md-3 mb-5">
                  <p>Total BNB Pool Rewards</p>
                  <span>2,100,000.0000 GAL</span>
                </div>
                <div className="col-md-3">
                  <p>Staking Token</p>
                  <span>BNB</span>
                </div>
                <div className="col-md-3">
                  <p>Farming Period</p>
                  <span>30 Days</span>
                </div>
                <div className="col-md-3">
                  <p>Today’s GAL Pool Rewards</p>
                  <span>45,652.1700 GAL</span>
                </div>
                <div className="col-md-3">
                  <p>Total BNB Staked</p>
                  <span>6,924,524.7741 BNB</span>
                </div>
                <div className="col-md-3">
                  <p>BNB Annual Percentage Yield</p>
                  <span>4.50 %</span>
                </div>
              </div>

              <div className="row fundSection">
                <div>
                  <div className="mt-5">
                    <div className="myFundTitle">
                      <Image
                        src="/busd.svg"
                        alt="--"
                        layout="fixed"
                        width={35}
                        height={30}
                      />
                      <h2>My Funds</h2>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h6 className="mb-3">BUSD Staked</h6>
                    <div className="myFundTitle">
                      <p>---</p>
                      <h2>BUSD</h2>
                    </div>
                    <p>
                      Your staked BUSD has been automatically transferred back
                      to your spot account
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mt-5">
                    <div className="myFundTitle">
                      <Image
                        src="/gal.svg"
                        alt="--"
                        layout="fixed"
                        width={35}
                        height={30}
                      />
                      <h2>My Rewards</h2>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h6 className="mb-3">Total Rewards Received</h6>
                    <div className="myFundTitle">
                      <p>---</p>
                      <h2>GAL</h2>
                    </div>
                    <p>Your rewards have been sent to your spot account</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
