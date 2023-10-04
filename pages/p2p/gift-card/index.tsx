import { NoItemFound } from "components/NoItemFound/NoItemFound";
import P2PGiftCardNavbar from "components/P2P/p2p-gift-card/p2p-gift-card-navbar/P2PGiftCardNavbar";
import { CUstomSelect } from "components/common/CUstomSelect";
import SectionLoading from "components/common/SectionLoading";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { getGiftCardTradeHeder } from "service/p2p";
import Select from "react-select";
import {
  getAllGiftCardAdsApi,
  getCreateAdsSettingsDataApi,
} from "service/p2pGiftCards";

const options = [
  { value: 1, label: "Bank Transfer" },
  { value: 2, label: "Crypto Transfer" },
];
const limit = 15;

export default function Index({ data }: any) {
  const router = useRouter();
  const [allGiftCardAds, setAllGiftCardAds] = useState<any>({});
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const [selectedPaymentType, setSelectedPaymentType] = useState<any>({});
  const [selectedCurrencyType, setSelectedCurrencyType] = useState<any>({});
  const [selectedPayment, setSelectedPayment] = useState<any>({});
  const [selectedCountry, setSelectedCountry] = useState<any>({});
  const [price, setPrice] = useState("");

  useEffect(() => {
    getCreateAdsSettingsData();
  }, []);

  useEffect(() => {
    getAllGiftCardAds(1);
  }, [
    selectedPaymentType,
    selectedCurrencyType,
    selectedPayment,
    selectedCountry,
    price,
  ]);

  const getCreateAdsSettingsData = async () => {
    const data: any = await getCreateAdsSettingsDataApi();
    if (!data?.success) {
      toast.error(data?.message);
      return;
    }

    setSettings(data?.data);
  };

  const getAllGiftCardAds = async (page: any) => {
    setLoading(true);
    const data = await getAllGiftCardAdsApi(
      selectedPaymentType?.value || "",
      selectedCurrencyType?.value || "",
      price,
      selectedPayment?.value || "",
      selectedCountry?.value || "",
      page,
      limit
    );
    setLoading(false);

    if (!data.success) {
      toast.error(data.message);
      return;
    }
    setAllGiftCardAds(data.data);
  };

  const handlePageClick = (event: any) => {
    getAllGiftCardAds(event.selected + 1);
  };

  const handleBuyFunc = (uid: any) => {
    router.push(`/p2p/gift-card/ads/details/${uid}`);
  };
  const changeBackground = () => {
    const elements = document.getElementsByClassName("p2p_bg");

    // Loop through the elements and add the background image
    for (let i = 0; i < elements.length; i++) {
      //@ts-ignore
      elements[i].style.backgroundImage = `url('${data?.banner}')`;
    }
  };
  useEffect(() => {
    changeBackground();
  }, []);

  const resetHandler = () => {
    setSelectedPaymentType({});
    setSelectedCurrencyType({});
    setSelectedPayment({});
    setSelectedCountry({});
    setPrice("");
  };

  return (
    <section>
      <div className="p2p_bg">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              {data?.header && <h2 className="text-white">{data?.header}</h2>}
              {data?.p2p_banner_des && (
                <p className="text-white">{data?.description}</p>
              )}
            </div>
            {/* <div className="col-md-12">{isLoggedIn && <P2pTopBar />}</div> */}
          </div>
        </div>
      </div>
      {/* second nav */}
      <P2PGiftCardNavbar />
      {/* filter part */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-2">
            <label>Price</label>
            <div className="P2psearchBox position-relative">
              <input
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-2">
            <div className="form-group p2pSelectFilter">
              <label> Payment Type</label>
              <Select
                classNamePrefix={"custom-select"}
                options={options}
                onChange={setSelectedPaymentType}
                value={selectedPaymentType}
              />
            </div>
          </div>
          <div className="col-md-2">
            <div className="form-group p2pSelectFilter">
              <label> Currency Type</label>
              <Select
                classNamePrefix={"custom-select"}
                options={
                  selectedPaymentType.value === 1
                    ? settings?.currency
                    : settings?.assets
                }
                value={selectedCurrencyType}
                onChange={setSelectedCurrencyType}
              />
            </div>
          </div>
          <div className="col-md-2">
            <div className="form-group p2pSelectFilter">
              <label>Payment Method</label>
              <Select
                classNamePrefix={"custom-select"}
                options={settings?.payment_method}
                value={selectedPayment}
                onChange={setSelectedPayment}
              />
            </div>
          </div>
          <div className="col-md-2">
            <div className="form-group p2pSelectFilter">
              <label>Available Region(s)</label>
              <Select
                classNamePrefix={"custom-select"}
                options={settings?.country}
                value={selectedCountry}
                onChange={setSelectedCountry}
              />
            </div>
          </div>
          <div className="col-md-2">
            <div className="d-flex h-full align-items-end pb-3">
              <button className="tableButton" onClick={resetHandler}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* item part */}
      <div className="container">
        {loading ? (
          <SectionLoading />
        ) : (
          <div className="table-responsive mt-5">
            {allGiftCardAds?.data?.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Advertisers</th>
                    <th scope="col">Price</th>
                    <th scope="col">Value of gift card</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Trade</th>
                  </tr>
                </thead>
                <tbody>
                  {allGiftCardAds?.data?.map((item: any, index: number) => (
                    <tr className="tableRow" key={index}>
                      <td>
                        <div className="tableImg d-flex align-items-center">
                          <img src={item?.user?.photo} alt="" />
                          <h5>{item?.user?.nickname || "Unknown"}</h5>
                        </div>
                      </td>
                      <td>{item.price}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <h6 className="limitBalance">{item?.amount}</h6>
                        </div>
                        {/* <div className="d-flex align-items-center">
                          <small className="mr-2">Limit</small>
                          <h6 className="limitBalance">{item?.time_limit}</h6>
                        </div> */}
                      </td>
                      <td>
                        {Number(item.payment_currency_type) === 1 ? (
                          item.payment_methods.map((item: any, index: any) => (
                            <span
                              className="mr-1 bg-primary-color px-2 py-1 rounded text-white"
                              key={index}
                            >
                              {item.admin_pamynt_method.name}
                            </span>
                          ))
                        ) : (
                          <span className="mr-1 bg-card-primary-color px-2 py-1 rounded text-white">
                            Crypto
                          </span>
                        )}
                      </td>

                      <td>
                        <button
                          className="tableButton p2p-gift-card-adds-margin-bottom"
                          onClick={() => handleBuyFunc(item.uid)}
                        >
                          Buy Gift Card
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="my-5">
                <NoItemFound />
              </div>
            )}
          </div>
        )}
        <div className="row justify-content-center my-5">
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(allGiftCardAds.total / limit)}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className={`d-flex align-items-center justify-content-center`}
            pageLinkClassName={`paginate-number`}
            activeLinkClassName={`active-paginate-cls`}
            previousLinkClassName={`text-primary-color text-25 mr-2`}
            nextLinkClassName={`text-primary-color text-25 ml-2`}
          />
        </div>
      </div>
    </section>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { data } = await getGiftCardTradeHeder();
  return {
    props: {
      data: data,
    },
  };
};
