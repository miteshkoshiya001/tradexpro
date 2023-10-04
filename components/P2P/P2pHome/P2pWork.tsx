import { useState } from "react";
import { P2pWorkCard } from "./P2pWorkCard";
import { BsCashCoin } from "react-icons/bs";
import { FcDocument, FcMoneyTransfer } from "react-icons/fc";

export const P2pWork = ({ data }: any) => {
  const [buySellCrypto, setBuySellCrypto] = useState(true);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 px-3 px-md-0">
          <div className="p2pWork p-4 p-md-5">
            <div className="d-block d-sm-flex justify-content-between text-center text-sm-start">
              <h3>How P2P works</h3>
              <div className="p2pWorkBtn pt-4 pt-sm-0">
                <button
                  onClick={() => setBuySellCrypto(true)}
                  className={`${buySellCrypto && "buySellBoxActive"}`}
                >
                  Buy Crypto
                </button>
                <button
                  className={`${!buySellCrypto && "buySellBoxActive"}`}
                  onClick={() => setBuySellCrypto(false)}
                >
                  Sell Crypto
                </button>
              </div>
            </div>
            <div className="row mt-4">
              {buySellCrypto === true ? (
                <>
                  <P2pWorkCard
                    title={data?.p2p_buy_step_1_heading}
                    discription={data?.p2p_buy_step_1_des}
                    icon={data?.p2p_buy_step_1_icon}
                  />
                  <P2pWorkCard
                    title={data?.p2p_buy_step_2_heading}
                    discription={data?.p2p_buy_step_2_des}
                    icon={data?.p2p_buy_step_2_icon}
                  />
                  <P2pWorkCard
                    title={data?.p2p_buy_step_3_heading}
                    discription={data?.p2p_buy_step_3_des}
                    icon={data?.p2p_buy_step_3_icon}
                  />
                </>
              ) : (
                <>
                  <P2pWorkCard
                    title={data?.p2p_sell_step_1_heading}
                    discription={data?.p2p_sell_step_1_des}
                    icon={data?.p2p_sell_step_1_icon}
                  />
                  <P2pWorkCard
                    title={data?.p2p_sell_step_2_heading}
                    discription={data?.p2p_sell_step_2_des}
                    icon={data?.p2p_sell_step_2_icon}
                  />
                  <P2pWorkCard
                    title={data?.p2p_sell_step_3_heading}
                    discription={data?.p2p_sell_step_3_des}
                    icon={data?.p2p_sell_step_3_icon}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
