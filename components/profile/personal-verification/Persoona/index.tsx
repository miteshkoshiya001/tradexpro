import React, { useRef, useState } from "react";
//@ts-ignore
import Persona from "persona";
import useTranslation from "next-translate/useTranslation";
import { ThirdPartyKycVerifiedAction } from "state/actions/user";
import { BsPersonBoundingBox } from "react-icons/bs";

const PersonaComponent = ({ personaDetails, setPersonaVerified }: any) => {
  const [options, setOptions] = useState({
    templateId: personaDetails?.PERSONA_KYC_TEMPLATED_ID,
  });
  const { t } = useTranslation("common");

  const embeddedClientRef = useRef(null);
  const createClient = () => {
    //@ts-ignore
    const client = new Persona.Client({
      ...options,
      environment: "sandbox",
      //@ts-ignore
      onLoad: (error) => {
        if (error) {
          console.error(
            `Failed with code: ${error.code} and message ${error.message}`
          );
        }

        client.open();
      },
      //@ts-ignore
      onStart: (inquiryId) => {},
      //@ts-ignore
      onComplete: (inquiryId) => {
        ThirdPartyKycVerifiedAction(
          String(inquiryId.inquiryId),
          setPersonaVerified
        );
      },
      //@ts-ignore
      onEvent: (name, meta) => {
        switch (name) {
          case "start":
            break;
          default:
            console.log(
              `Received event: ${name} with meta: ${JSON.stringify(meta)}`
            );
        }
      },
    });
    //@ts-ignore
    embeddedClientRef.current = client;
    //@ts-ignore
    window.exit = (force) =>
      //@ts-ignore
      client ? client.exit(force) : alert("Initialize client first");
  };
  return (
    <div className="container-fluid text-center p-0">
      <div className="row">
        <div className="col-md-12 mx-auto">
          <div className="boxShadow py-5 px-4 shadow-sm">
            <BsPersonBoundingBox className="Verify_card mb-4 mt-5" />
            <h2>{t("Verify your identity")}</h2>
            <button
              onClick={createClient}
              className="btn nimmu-user-sibmit-button mt-5 w-25 mx-auto mb-5"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaComponent;
