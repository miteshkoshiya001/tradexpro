import Footer from "components/common/footer";
import SectionLoading from "components/common/SectionLoading";
import { P2pAdvantage } from "components/P2P/P2pHome/P2pAdvantage";
import { P2pDataTable } from "components/P2P/P2pHome/P2pDataTable";
import { P2pFaq } from "components/P2P/P2pHome/p2pFAQ";
import { P2pFilter } from "components/P2P/P2pHome/P2pFilter";
import { P2pPaymentMethod } from "components/P2P/P2pHome/P2pPaymentMethod";
import { P2pTab } from "components/P2P/P2pHome/P2pTab";
import { P2pWork } from "components/P2P/P2pHome/P2pWork";
import { P2pTopBar } from "components/P2P/P2pHome/TopBar";
import { BUY } from "helpers/core-constants";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAdsMarketSettings } from "service/p2p";
import { landingPageAction, landingSettingsAction } from "state/actions/p2p";
import { RootState } from "state/store";

const P2P = ({ data }: any) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  const [settings, setSettings] = useState<any>([]);
  const [history, setHistory] = useState<any>([]);
  const [stillHistory, setStillHistory] = useState<any>([]);
  const [filters, setFilters] = useState({
    type: BUY,
    amount: 0,
    coin: null,
    currency: "all",
    payment_method: "all",
    country: "all",
    per_page: 10,
    page: 1,
  });
  const LinkTopaginationString = (page: any) => {
    const url = page.url.split("?")[1];
    const number = url.split("=")[1];
    landingPageAction(
      filters.type,
      filters.amount,
      filters.coin,
      filters.currency,
      filters.payment_method,
      filters.country,
      filters.per_page,
      parseInt(number),
      setHistory,
      setProcessing,
      setStillHistory,
      setSettings
    );
  };
  useEffect(() => {
    landingSettingsAction(
      setProcessing,
      setSettings,
      setFilters,
      filters,
      data
    );
  }, []);
  const changeBackground = () => {
    const elements = document.getElementsByClassName("p2p_bg");

    // Loop through the elements and add the background image
    for (let i = 0; i < elements.length; i++) {
      //@ts-ignore
      elements[i].style.backgroundImage = `url('${data?.p2p_banner_img}')`;
    }
  };
  useEffect(() => {
    changeBackground();
  }, []);
  useEffect(() => {
    filters.coin &&
      landingPageAction(
        filters.type,
        filters.amount,
        filters.coin,
        filters.currency,
        filters.payment_method,
        filters.country,
        filters.per_page,
        filters.page,
        setHistory,
        setProcessing,
        setStillHistory,
        setSettings
      );
  }, [filters]);
  return (
    <>
      <div className="mb-5">
        <div className="p2p_bg">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                {data?.p2p_banner_header && (
                  <h2 className="text-white">{data?.p2p_banner_header}</h2>
                )}
                {data?.p2p_banner_des && (
                  <p className="text-white">{data?.p2p_banner_des}</p>
                )}
              </div>
              {/* <div className="col-md-12">{isLoggedIn && <P2pTopBar />}</div> */}
            </div>
          </div>
        </div>
        {isLoggedIn && <P2pTopBar />}
        <P2pTab setFilters={setFilters} filters={filters} settings={settings} />
        <P2pFilter
          setFilters={setFilters}
          filters={filters}
          settings={settings}
        />
        {processing ? (
          <SectionLoading />
        ) : (
          <P2pDataTable
            history={history}
            filters={filters}
            isLoggedIn={isLoggedIn}
          />
        )}

        {history?.length > 0 && (
          <div className="pagination-wrapper" id="assetBalances_paginate">
            <span>
              {stillHistory?.links?.map((link: any, index: number) =>
                link.label === "&laquo; Previous" ? (
                  <a
                    className="paginate-button"
                    onClick={() => {
                      if (link.url) LinkTopaginationString(link);
                    }}
                    key={index}
                  >
                    <i className="fa fa-angle-left"></i>
                  </a>
                ) : link.label === "Next &raquo;" ? (
                  <a
                    className="paginate-button"
                    onClick={() => LinkTopaginationString(link)}
                    key={index}
                  >
                    <i className="fa fa-angle-right"></i>
                  </a>
                ) : (
                  <a
                    className={`paginate_button paginate-number ${
                      link.active === true && "text-warning"
                    }`}
                    aria-controls="assetBalances"
                    data-dt-idx="1"
                    onClick={() => LinkTopaginationString(link)}
                    key={index}
                  >
                    {link.label}
                  </a>
                )
              )}
            </span>
          </div>
        )}
        <P2pWork data={data} />
        <P2pAdvantage data={data} />
        {data?.p2p_faq.length > 0 && <P2pFaq data={data} />}
        <P2pPaymentMethod data={data} />
      </div>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { data } = await getAdsMarketSettings();
  return {
    props: {
      data: data,
    },
  };
};
export default P2P;
