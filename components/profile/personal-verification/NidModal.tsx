import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  UploadDrivingLicenceImageAction,
  UploadNidImageAction,
  UploadPassportImageAction,
  UploadVoterImageAction,
} from "state/actions/user";

const NidModal = ({ type, kycDetails }: any) => {
  const [previousType, setPreviousType] = useState<string>("");
  const [frontSide, setFrontSide] = useState(null);
  const [showFront, setShowFront] = useState(null);
  const [showBack, setShowBack] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [backSide, setBackSide] = useState(null);
  const [showSelfe, setShowSelfe] = useState(null);
  const [selfeSide, setSelfeSide] = useState(null);
  const [existingKyc, setExistingKyc] = useState<any>();
  const { t } = useTranslation("common");
  if (type !== previousType) {
    setPreviousType(type);
    setFrontSide(null);
    setBackSide(null);
    setSelfeSide(null);
  }
  const storeSelectedFile = (e: any, setState: any, side: number) => {
   const file = e.target.files[0];
   if (file.size > 2 * 1024 * 1024) {
     toast.error(t("File size must be less than 2MB"));
     return;
   }
    var reader = new FileReader();
    reader.onloadend = function (e) {
      setState(reader.result);
    };
    if (side === 1) {
      // @ts-ignore
      setShowFront(URL.createObjectURL(e.target.files[0]));
      setState(e.target.files[0]);
    } else if (side === 3) {
      // @ts-ignore
      setShowSelfe(URL.createObjectURL(e.target.files[0]));
      setState(e.target.files[0]);
    } else {
      // @ts-ignore
      setShowBack(URL.createObjectURL(e.target.files[0]));
      setState(e.target.files[0]);
    }
  };

  const uploadImage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const formData: any = new FormData();
    formData.append("file_two", frontSide);
    formData.append("file_three", backSide);
    formData.append("file_selfie", selfeSide);
    if (type === "nid") {
      UploadNidImageAction(formData, setProcessing);
    } else if (type === "driving") {
      UploadDrivingLicenceImageAction(formData, setProcessing);
    } else if (type === "passport") {
      UploadPassportImageAction(formData, setProcessing);
    } else if (type === "voter") {
      UploadVoterImageAction(formData, setProcessing);
    }
  };
  const loadCard = () => {
    if (type === "nid") {
      setExistingKyc(kycDetails?.nid);
    } else if (type === "driving") {
      setExistingKyc(kycDetails?.driving);
    } else if (type === "passport") {
      setExistingKyc(kycDetails?.passport);
    } else if (type === "voter") {
      setExistingKyc(kycDetails?.voter);
    }
  };
  useEffect(() => {
    loadCard();
  }, [type]);

  return (
    <div
      className="modal fade cp-user-idverifymodal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <form id="nidUpload" className="Upload">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="card-list">
                      <div
                        className="alert alert-danger d-none error_msg"
                        id="error_msg"
                        role="alert"
                      ></div>
                      <div
                        className="alert alert-success d-none succ_msg"
                        role="alert"
                      ></div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-lg-0 mb-4">
                    <div className="idcard">
                      <h3 className="title" onClick={() => {}}>
                        {t("Front Side")}
                      </h3>
                      <div className="container cstm-img-picker">
                        <label className="container cstm-img-picker">
                          {frontSide && (
                            //@ts-ignore
                            <img src={showFront} className="img-fluid" alt="" />
                          )}

                          {existingKyc?.front_image ? (
                            <img
                              src={existingKyc?.front_image}
                              className="img-fluid"
                              alt=""
                            />
                          ) : (
                            <>
                              <input
                                type="file"
                                name="front_side"
                                onChange={(e: any) => {
                                  storeSelectedFile(e, setFrontSide, 1);
                                }}
                              />
                              <span className="upload-img-btn">
                                {t("Upload Image")}
                              </span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-lg-0 mb-4">
                    <div className="idcard">
                      <h3 className="title">{t("Back Side")}</h3>
                      <div className="container cstm-img-picker">
                        <label className="container cstm-img-picker">
                          {backSide && (
                            //@ts-ignore
                            <img src={showBack} className="img-fluid" alt="" />
                          )}

                          {existingKyc?.back_image ? (
                            <img
                              src={existingKyc?.back_image}
                              className="img-fluid"
                              alt=""
                            />
                          ) : (
                            <>
                              <input
                                type="file"
                                name="front_side"
                                onChange={(e) => {
                                  storeSelectedFile(e, setBackSide, 2);
                                }}
                              />
                              <span className="upload-img-btn">
                                {t("Upload Image")}
                              </span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 mb-lg-0 mb-4 mt-5">
                    <div className="idcard">
                      <h3 className="title">{t("Selfie Image")}</h3>
                      <div className="container cstm-img-picker">
                        <label className="container cstm-img-picker">
                          {showSelfe && (
                            //@ts-ignore
                            <img src={showSelfe} className="img-fluid" alt="" />
                          )}
                          {existingKyc?.selfie ? (
                            <img
                              src={existingKyc?.selfie}
                              className="img-fluid"
                              alt=""
                            />
                          ) : (
                            <>
                              <input
                                type="file"
                                name="file_selfie"
                                onChange={(e) => {
                                  storeSelectedFile(e, setSelfeSide, 3);
                                }}
                              />
                              <span className="upload-img-btn">
                                {t("Upload Image")}
                              </span>
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>
                  {!existingKyc?.file_selfie && !existingKyc?.file_selfie && (
                    <button
                      type="submit"
                      className="btn nimmu-user-sibmit-button mt-5"
                      onClick={(e) => {
                        uploadImage(e);
                      }}
                    >
                      {processing ? (
                        <>
                          <span
                            className="spinner-border spinner-border-md"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span>{t("Please wait")}</span>
                        </>
                      ) : (
                        t("Upload")
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NidModal;
