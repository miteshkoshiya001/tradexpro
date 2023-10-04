import type { GetServerSideProps, NextPage } from "next";
import ProfileSidebar from "layout/profile-sidebar";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import NidModal from "components/profile/personal-verification/NidModal";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getKycDetailsAction } from "state/actions/user";
import useTranslation from "next-translate/useTranslation";
import { MdPersonAddDisabled } from "react-icons/md";
import { BsPersonCheck } from "react-icons/bs";
import { KycActiveList } from "service/user";
import {
  KYC_DRIVING_VERIFICATION,
  KYC_EMAIL_VERIFICATION,
  KYC_NID_VERIFICATION,
  KYC_PASSPORT_VERIFICATION,
  KYC_PHONE_VERIFICATION,
  KYC_TYPE_DISABLE,
  KYC_TYPE_MANUAL,
  KYC_TYPE_PERSONA,
  KYC_VOTERS_CARD_VERIFICATION,
} from "helpers/core-constants";
import Footer from "components/common/footer";
import ImageComponent from "components/common/ImageComponent";
import SectionLoading from "components/common/SectionLoading";

const Persona = dynamic(
  () => import("components/profile/personal-verification/Persoona"),
  { ssr: false }
);
const PersonalVerification: NextPage = () => {
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const [personaVerified, setPersonaVerified] = useState(false);
  const [type, setType] = useState<string>("");
  const [verificationType, setVerificationType] = useState<number>();
  const [kycDetails, setKycDetails] = useState<any>();
  const [kycActiveList, setKycActiveList] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getKycDetailsAction(
        setKycDetails,
        setKycActiveList,
        setLoading,
        setVerificationType,
        setPersonaVerified
      )
    );
  }, []);

  return (
    <>
      <div className="page-wrap">
        <ProfileSidebar />
        <div className="page-main-content">
          <div className="container-fluid">
            <div className="section-top-wrap mb-25 inner-section-margin-top">
              <div className="profle-are-top">
                <h2 className="section-top-title">
                  {t("Personal Verification")}
                </h2>
              </div>
            </div>
            {verificationType === KYC_TYPE_MANUAL && (
              <NidModal type={type} kycDetails={kycDetails} />
            )}

            <div className="profile-area">
              <div className="section-wrapper border-0">
                {loading ? (
                  <>
                    <SectionLoading />
                  </>
                ) : (
                  <div className="row">
                    {verificationType === KYC_TYPE_MANUAL && (
                      <div className="col-lg-12">
                        <div className="cp-user-profile-header">
                          <h5>{t("Select Your ID Type")}</h5>
                        </div>

                        <div className="cp-user-profile-info-id-type">
                          {kycActiveList?.map(
                            (item: any, index: number) =>
                              item.type != KYC_PHONE_VERIFICATION &&
                              item.type != KYC_EMAIL_VERIFICATION && (
                                <div
                                  key={`kyc${index}`}
                                  className="id-card-type mb-5"
                                  onClick={() => {
                                    {
                                      item.type == KYC_PASSPORT_VERIFICATION &&
                                        kycDetails?.passport?.status;
                                      setType("passport");
                                    }
                                    {
                                      item.type == KYC_DRIVING_VERIFICATION &&
                                        setType("driving");
                                    }
                                    {
                                      item.type == KYC_NID_VERIFICATION &&
                                        setType("nid");
                                    }
                                    {
                                      item.type ==
                                        KYC_VOTERS_CARD_VERIFICATION &&
                                        setType("voter");
                                    }
                                  }}
                                >
                                  <div
                                    className="id-card"
                                    data-toggle="modal"
                                    data-target=".cp-user-idverifymodal"
                                  >
                                    <ImageComponent
                                      src={item.image}
                                      className="p-5"
                                      layout="fill"
                                      objectFit="inherit"
                                    />
                                  </div>
                                  <div
                                    className={`card-bottom ${
                                      item.type == KYC_PASSPORT_VERIFICATION
                                        ? kycDetails?.passport?.status ==
                                          "Pending"
                                          ? "pending"
                                          : kycDetails?.passport?.status ==
                                            "Approved"
                                          ? "success"
                                          : ""
                                        : item.type == KYC_DRIVING_VERIFICATION
                                        ? kycDetails?.driving?.status ==
                                          "Pending"
                                          ? "pending"
                                          : kycDetails?.driving?.status ==
                                            "Approved"
                                          ? "success"
                                          : ""
                                        : item.type == KYC_NID_VERIFICATION
                                        ? kycDetails?.nid?.status == "Pending"
                                          ? "pending"
                                          : kycDetails?.nid?.status ==
                                            "Approved"
                                          ? "success"
                                          : ""
                                        : item.type ==
                                          KYC_VOTERS_CARD_VERIFICATION
                                        ? kycDetails?.voter?.status == "Pending"
                                          ? "pending"
                                          : kycDetails?.voter?.status ==
                                            "Approved"
                                          ? "success"
                                          : ""
                                        : ""
                                    }`}
                                  >
                                    <span className="text-warning">
                                      {item.type == KYC_PASSPORT_VERIFICATION &&
                                        kycDetails?.passport?.status}
                                      {item.type == KYC_DRIVING_VERIFICATION &&
                                        kycDetails?.driving?.status}
                                      {item.type == KYC_NID_VERIFICATION &&
                                        kycDetails?.nid?.status}
                                      {item.type ==
                                        KYC_VOTERS_CARD_VERIFICATION &&
                                        kycDetails?.voter?.status}
                                    </span>
                                    <h5>{item.name}</h5>
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    )}

                    {verificationType === KYC_TYPE_PERSONA && (
                      <>
                        {!personaVerified &&
                          kycDetails.perona_credentials_details && (
                            <Persona
                              personaDetails={
                                kycDetails.perona_credentials_details
                              }
                              setPersonaVerified={setPersonaVerified}
                            />
                          )}
                        {personaVerified && (
                          <div className="container-fluid text-center p-0">
                            <div className="row">
                              <div className="col-md-12 mx-auto">
                                <div className="boxShadow py-5 px-4 shadow-sm">
                                  <BsPersonCheck className="Verify_card mb-4 mt-5" />
                                  <h2 className="mb-5">
                                    {t("Kyc Verified Successfully")}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    {verificationType === KYC_TYPE_DISABLE && (
                      <div className="container-fluid text-center p-0">
                        <div className="row">
                          <div className="col-md-12 mx-auto">
                            <div className="boxShadow py-5 px-4 shadow-sm">
                              <MdPersonAddDisabled className="Verify_card mb-4 text-warning mt-5" />
                              <h2 className="mb-5">{t("Kyc disabled")}</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
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
  await SSRAuthCheck(ctx, "/user/personal-verification");
  return {
    props: {},
  };
};

export default PersonalVerification;
