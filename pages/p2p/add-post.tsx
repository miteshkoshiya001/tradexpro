import Footer from "components/common/footer";
import SectionLoading from "components/common/SectionLoading";
import { AddPostOne } from "components/P2P/AddPost/AddPostStep_one";
import { AddPostThree } from "components/P2P/AddPost/AddPostStep_three";
import { AddPostTwo } from "components/P2P/AddPost/AddPostStep_two";
import { P2pTopBar } from "components/P2P/P2pHome/TopBar";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAddPostInitial } from "state/actions/p2p";

const AddPost = () => {
  const {
    data,
    loading,
    addStep,
    setAddStep,
    selectedAsset,
    selectedCurrency,
    setSelectedAsset,
    setselectedCurrency,
    pricePoint,
    priceType,
    setPriceType,
    setPricePoint,
    setSelectedPayment,
    selectedPayment,
    selectedPaymentTime,
    setSelectedPaymentTime,
    Amount,
    setAmount,
    terms,
    setTerms,
    auto_reply,
    setAuto_reply,
    selectedCountry,
    setSelectedCountry,
    registerDays,
    coinHolding,
    setregisterDays,
    setcoinHolding,
    adsType,
    UpdateP2pAdsAction,
    setAdsType,
    createUpdateP2pAdsAction,
    uid,
    getAvailableBalanceAction,
  } = useAddPostInitial();
  const router = useRouter();

  useEffect(() => {
    if (data?.data?.is_payment_method_available === false) {
      router.push("/p2p/add-payment-method");
    }
  }, [data?.data?.is_payment_method_available]);
  return (
    <>
      {loading ? (
        <SectionLoading />
      ) : (
        <div className="mb-5">
          <P2pTopBar />
          <div className="adPost_bg py-3 mb-5">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h3>{uid ? "Edit ads" : "Post Normal Ad"}</h3>
                </div>
              </div>
            </div>
          </div>
          {/* <AddPostStep /> */}
          <div className="container">
            <div className="row">
              {!uid && (
                <div className="col-6">
                  <button
                    className={`addTabButton ${
                      adsType === 1 && "buySellBoxActive"
                    }`}
                    onClick={() => setAdsType(1)}
                  >
                    I Want to Buy
                  </button>
                </div>
              )}
              {!uid && (
                <div className="col-6">
                  <button
                    className={`addTabButton ${
                      adsType === 2 && "buySellBoxActive"
                    }`}
                    onClick={() => setAdsType(2)}
                  >
                    I Want to Sell
                  </button>
                </div>
              )}

              {addStep === "stepOne" && (
                <AddPostOne
                  data={data}
                  setAddStep={setAddStep}
                  selectedAsset={selectedAsset}
                  selectedCurrency={selectedCurrency}
                  setSelectedAsset={setSelectedAsset}
                  setselectedCurrency={setselectedCurrency}
                  pricePoint={pricePoint}
                  priceType={priceType}
                  setPriceType={setPriceType}
                  setPricePoint={setPricePoint}
                  uid={uid}
                />
              )}
              {addStep === "stepTwo" && (
                <AddPostTwo
                  setAddStep={setAddStep}
                  selectedAsset={selectedAsset}
                  data={data}
                  selectedPayment={selectedPayment}
                  setSelectedPayment={setSelectedPayment}
                  selectedCurrency={selectedCurrency}
                  selectedPaymentTime={selectedPaymentTime}
                  setSelectedPaymentTime={setSelectedPaymentTime}
                  amount={Amount}
                  setAmount={setAmount}
                  getAvailableBalanceAction={getAvailableBalanceAction}
                />
              )}
              {addStep === "stepThree" && (
                <AddPostThree
                  setAddStep={setAddStep}
                  terms={terms}
                  data={data}
                  setTerms={setTerms}
                  auto_reply={auto_reply}
                  setAuto_reply={setAuto_reply}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                  registerDays={registerDays}
                  coinHolding={coinHolding}
                  uid={uid}
                  setregisterDays={setregisterDays}
                  setcoinHolding={setcoinHolding}
                  UpdateP2pAdsAction={UpdateP2pAdsAction}
                  createUpdateP2pAdsAction={createUpdateP2pAdsAction}
                />
              )}
            </div>
          </div>
        </div>
      )}

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
export default AddPost;
