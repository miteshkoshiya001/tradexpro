import Footer from "components/common/footer";
import { P2pTopBar } from "components/P2P/P2pHome/TopBar";
import { OrderTable } from "components/P2P/P2pOrder/OrderTable";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { myP2pDisputeAction, myP2pOrderAction } from "state/actions/p2p";

const P2pOrder = () => {
  const [selectedMenu, setselectedMenu] = useState<any>(1);

  return (
    <>
      <div className="mb-5">
        <div className="section-top-wrap mb-25">
          <div className="overview-area">
            <div className="overview-left">
              <h2 className="section-top-title">My Orders</h2>
            </div>
          </div>
        </div>
        <P2pTopBar />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul className="d-flex p2pTabList py-3 tableRow">
                <li
                  onClick={() => {
                    setselectedMenu(1);
                  }}
                >
                  <a
                    className={`${
                      selectedMenu === 1 && "p2pOrderTabListActive"
                    }`}
                  >
                    All Orders
                  </a>
                </li>
                <li
                  onClick={() => {
                    setselectedMenu(2);
                  }}
                >
                  <a
                    className={`${
                      selectedMenu === 2 && "p2pOrderTabListActive"
                    }`}
                  >
                    Disputed Orders
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {selectedMenu === 1 && (
          <OrderTable actionFunction={myP2pOrderAction} filter={true} />
        )}
        {selectedMenu === 2 && (
          <OrderTable actionFunction={myP2pDisputeAction} />
        )}
      </div>
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/p2p");

  return {
    props: {},
  };
};
export default P2pOrder;
