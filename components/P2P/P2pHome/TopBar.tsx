import { RiPagesLine } from "react-icons/ri";
import { HiOutlineHome, HiUsers } from "react-icons/hi";
import Link from "next/link";
import { AiOutlineGift, AiOutlineWallet } from "react-icons/ai";
import { GrHomeRounded } from "react-icons/gr";
import { useRouter } from "next/router";
export const P2pTopBar = () => {
  const router = useRouter();
  return (
    <div className="py-3">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ul className="d-flex justify-content-between topBarList">
              <div className="d-flex " style={{ gap: "28px" }}>
                <li>
                  <Link href="/p2p">
                    <a
                      className={`${
                        router.pathname == "/p2p" && "text-primary-color"
                      } `}
                    >
                      <HiOutlineHome />
                      Home
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/p2p/my-order">
                    <a
                      className={`${
                        router.pathname == "/p2p/my-order" &&
                        "text-primary-color"
                      } `}
                    >
                      <RiPagesLine />
                      Orders
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/p2p/p2p-profile">
                    <a
                      className={`${
                        router.pathname == "/p2p/p2p-profile" &&
                        "text-primary-color"
                      } `}
                    >
                      <HiUsers />
                      P2P User Center
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/p2p/p2p-wallet">
                    <a
                      className={`${
                        router.pathname == "/p2p/p2p-wallet" &&
                        "text-primary-color"
                      } `}
                    >
                      <AiOutlineWallet />
                      P2P Wallet
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/p2p/gift-card">
                    <a
                      className={`${
                        router.pathname == "/p2p/gift-card" &&
                        "text-primary-color"
                      } `}
                    >
                      <AiOutlineGift />
                      Gift Card
                    </a>
                  </Link>
                </li>
              </div>
              <li style={{ position: "relative" }}>
                <a
                  href=""
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  More
                </a>
                <div className="dropdown-menu secendary-dropdown-bg">
                  <Link href="/p2p/add-post">
                    <a className="dropdown-item menu-hover">Ad Create</a>
                  </Link>
                  <Link href="/p2p/my-buy-ads">
                    <a className="dropdown-item menu-hover">My Buy Ads</a>
                  </Link>
                  <Link href="/p2p/my-sell-ads">
                    <a className="dropdown-item menu-hover">My Sell Ads</a>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
