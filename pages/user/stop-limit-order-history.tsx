import type { GetServerSideProps, NextPage } from "next";
import ReportSidebar from "layout/report-sidebar";
import React, { useState } from "react";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import {
  AllStopLimitOrdersHistoryAction,
  handleSearchItems,
} from "state/actions/reports";
import SectionLoading from "components/common/SectionLoading";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import Footer from "components/common/footer";
import { customPage, landingPage } from "service/landing-page";
import CustomDataTable from "components/Datatable";

const BuyOrderHistory: NextPage = () => {
  const { t } = useTranslation("common");
  const [sortingInfo, setSortingInfo] = useState<any>({
    column_Header: "created_at",
    order_by: "desc",
  });

  const [processing, setProcessing] = useState<boolean>(false);
  const [history, setHistory] = useState<any>([]);
  const [stillHistory, setStillHistory] = useState<any>([]);
  const [selectedLimit, setSelectedLimit] = useState<any>("10");
  const [search, setSearch] = useState('')
  const LinkTopaginationString = (page: any) => {
    const url = page.url.split("?")[1];
    const number = url.split("=")[1];
    AllStopLimitOrdersHistoryAction(
      selectedLimit,
      parseInt(number),
      setHistory,
      setProcessing,
      setStillHistory,
      sortingInfo.column_name,
      sortingInfo.order_by,
      search
    );
  };
  const getReport = async () => {
    AllStopLimitOrdersHistoryAction(
      selectedLimit,
      1,
      setHistory,
      setProcessing,
      setStillHistory,
      sortingInfo.column_name,
      sortingInfo.order_by,
      search
    );
  };
  const columns = [
    {
      Header: "Base Coin",
      accessor: "base_coin",
    },
    {
      Header: "Trade Coin",
      accessor: "trade_coin",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Order Type",
      accessor: "order_type",
    },
    {
      Header: t("Date"),
      accessor: "created_at",
    },
  ];

  React.useEffect(() => {
    getReport();
    return () => {
      setHistory([]);
    };
  }, [selectedLimit, search]);
  return (
    <>
      <div className="page-wrap rightMargin">
        <ReportSidebar />

        <div className="page-main-content">
          <div className="container-fluid">
            <div className="section-top-wrap mb-25 inner-section-margin-top">
              <div className="overview-area">
                <div className="overview-left">
                  <h2 className="section-top-title">
                    {t("Stop Limit Order History")}
                  </h2>
                </div>
              </div>
            </div>

            <div className="asset-balances-area">
             
                <div className="asset-balances-left">
                  <div className="section-wrapper ">
                    <div className="tableScroll">
                      <CustomDataTable
                        columns={columns}
                        data={history}
                        stillHistory={stillHistory}
                        paginateFunction={LinkTopaginationString}
                        setSelectedLimit={setSelectedLimit}
                        selectedLimit={selectedLimit}
                        setSearch={setSearch}
                        search={search}
                        processing={processing}
                      />
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/buy-order-history");
  const { data } = await landingPage(ctx.locale);
  const { data: customPageData } = await customPage();
  return {
    props: {
      socialData: data.media_list,
      copyright_text: data?.copyright_text,
      customPageData: customPageData.data,
    },
  };
};

export default BuyOrderHistory;
