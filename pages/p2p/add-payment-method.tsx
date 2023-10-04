import { CUstomSelect } from "components/common/CUstomSelect";
import Footer from "components/common/footer";
import {
  PAYMENT_METHOD_BANK,
  PAYMENT_METHOD_CARD,
  PAYMENT_METHOD_CARD_TYPE_CREDIT,
  PAYMENT_METHOD_CARD_TYPE_DEBIT,
  PAYMENT_METHOD_MOBILE,
} from "helpers/core-constants";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { useCreatePaymentMethods } from "state/actions/p2p";

const AddPaymentMethod = () => {
  const {
    paymentMethods,
    setPaymentMethods,
    handleSelectedMethod,
    selectedMethods,
    setSelectedMethods,
    setSubmitData,
    SubmitData,
    handleCardSelectedMethod,
    submitData,
    uid,
    editData,
  } = useCreatePaymentMethods();
  const { t } = useTranslation();
  return (
    <>
      <div className="container paymentMethodBox rounded shadow-sm my-5">
        <div className="row">
          <div className="col-md-6 mx-auto ">
            <Link href={`/p2p/p2p-profile`}>
              <div className="mb-3 text-left d-flex align-items-center gap-5 cursor-pointer">
                <IoArrowBack />
                {t("Back")}
              </div>
            </Link>
            <div className="paymentBox d-flex align-items-center border-0">
              <div></div>
              <h2>{uid ? "Edit" : "Add"} payment method</h2>
            </div>
            {!uid && (
              <div className="mt-3">
                <label>Select payment method</label>
                <div className="P2psearchBox position-relative">
                  <CUstomSelect
                    options={paymentMethods}
                    isSearchable={true}
                    handleFunction={handleSelectedMethod}
                    defaultValue={selectedMethods}
                  />
                </div>
              </div>
            )}
            <div className="mt-4">
              <label>Account name</label>
              <div className="P2psearchBox position-relative">
                <input
                  type="text"
                  value={SubmitData.username}
                  onChange={(e) => {
                    setSubmitData({
                      ...SubmitData,
                      username: e.target.value,
                    });
                  }}
                  placeholder="Enter your account name"
                />
              </div>
            </div>

            {selectedMethods?.payment_type === PAYMENT_METHOD_BANK && (
              <>
                <div className="mt-4">
                  <label>Bank Name</label>
                  <div className="P2psearchBox position-relative">
                    <input
                      type="text"
                      placeholder="Enter the name of your bank"
                      value={SubmitData.bank_name}
                      onChange={(e) => {
                        setSubmitData({
                          ...SubmitData,
                          bank_name: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label>Bank Account number</label>
                  <div className="P2psearchBox position-relative">
                    <input
                      type="text"
                      placeholder="Enter bank account number"
                      value={SubmitData.bank_account_number}
                      onChange={(e) => {
                        setSubmitData({
                          ...SubmitData,
                          bank_account_number: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="my-4">
                  <label>Account opening branch</label>
                  <div className="P2psearchBox position-relative">
                    <input
                      type="text"
                      placeholder="Enter bank opening branch name"
                      value={SubmitData.account_opening_branch}
                      onChange={(e) => {
                        setSubmitData({
                          ...SubmitData,
                          account_opening_branch: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="my-4">
                  <label>Transaction Referance</label>
                  <div className="P2psearchBox position-relative">
                    <input
                      type="text"
                      placeholder="Enter transaction referance"
                      value={SubmitData.transaction_reference}
                      onChange={(e) => {
                        setSubmitData({
                          ...SubmitData,
                          transaction_reference: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </>
            )}
            {selectedMethods?.payment_type === PAYMENT_METHOD_CARD && (
              <>
                <div className="my-4">
                  <label>Card number</label>
                  <div className="P2psearchBox position-relative">
                    <input
                      type="text"
                      placeholder="Enter Card Number"
                      value={SubmitData.card_number}
                      onChange={(e) => {
                        setSubmitData({
                          ...SubmitData,
                          card_number: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="my-4">
                  <label>Card Type</label>
                  <div className="P2psearchBox position-relative">
                    <CUstomSelect
                      options={[
                        {
                          value: PAYMENT_METHOD_CARD_TYPE_DEBIT,
                          label: "Debit card",
                        },
                        {
                          value: PAYMENT_METHOD_CARD_TYPE_CREDIT,
                          label: "Credit card",
                        },
                      ]}
                      isSearchable={true}
                      handleFunction={handleCardSelectedMethod}
                      defaultValue={
                        uid
                          ? {
                              value: SubmitData.card_type,
                              label:
                                parseInt(SubmitData.card_type) ===
                                PAYMENT_METHOD_CARD_TYPE_DEBIT
                                  ? "Debit card"
                                  : "Credit card",
                            }
                          : null
                      }
                    />
                  </div>
                </div>
              </>
            )}
            {selectedMethods?.payment_type === PAYMENT_METHOD_MOBILE && (
              <>
                <div className="my-4">
                  <label>Mobile number</label>
                  <div className="P2psearchBox position-relative">
                    <input
                      type="text"
                      placeholder="Enter Mobile Number"
                      value={SubmitData.mobile_account_number}
                      onChange={(e) => {
                        setSubmitData({
                          ...SubmitData,
                          mobile_account_number: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="mt-4 d-flex justify-content-center">
              <button
                className="tableButton ml-3 px-3 px-sm-5"
                onClick={uid ? editData : submitData}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
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
export default AddPaymentMethod;
