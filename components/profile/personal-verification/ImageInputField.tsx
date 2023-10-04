import useTranslation from "next-translate/useTranslation";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageInputField = ({ setter, getter }: any) => {
  const { t } = useTranslation("common");
  const onDrop = useCallback(
    (acceptedFiles) => {
      setter(acceptedFiles[0]);
    },
    [setter]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });
  return (
    <div>
      <div className="container cstm-img-picker">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>{t("Drop the files here")}</p>
        </div>
      </div>
      <div className="col-lg-6 mb-lg-0 mb-4">
        <div className="idcard">
          <div className="container cstm-img-picker">
            <img src={getter} className="img-fluid" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageInputField;
