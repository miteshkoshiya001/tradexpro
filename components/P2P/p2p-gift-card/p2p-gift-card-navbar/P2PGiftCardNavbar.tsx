import Link from "next/link";
import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { HiOutlineHome } from "react-icons/hi";
import { RiPagesLine } from "react-icons/ri";
export default function P2PGiftCardNavbar() {
  return (
    <div>
      <div className="py-3 border-bottom primary-border-color p2p-gift-card-navbar-margin-top">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <ul className="d-flex justify-content-between topBarList">
                <div className="p2p-gift-card-navbar-lists" style={{ gap: "28px" }}>
                  <li>
                    <Link href="/p2p/gift-card">
                      <a>
                        <HiOutlineHome />
                        Home
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/p2p/gift-card/ads/orders">
                      <a>
                        <RiPagesLine />
                        Orders
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/p2p/gift-card/lists">
                      <a>
                        <AiOutlineGift />
                        Gift Card Lists
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/p2p/gift-card/my-adds">
                      <a>
                        <AiOutlineGift />
                        My Gift Card Ads
                      </a>
                    </Link>
                  </li>
                </div>
                {/* <li style={{position:'relative'}}>
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
          </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
