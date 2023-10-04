import { useRouter } from "next/router";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

const BackButton = () => {
  const router = useRouter();
  return (
    <div>
      <div
        onClick={() => {
          router.back();
        }}
      >
        <BiArrowBack />
        Back
      </div>
    </div>
  );
};

export default BackButton;
