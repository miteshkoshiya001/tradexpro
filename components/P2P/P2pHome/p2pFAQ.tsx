import { CustomAccordion } from "components/common/CustomAccordion";
import { useState } from "react";

export const P2pFaq = ({ data }: any) => {
  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-12">
          <h3 className="pb-2">FAQS</h3>
        </div>
        <div className="col-md-6">
          {data.p2p_faq.map((faqIten: any, index: any) => (
            <span key={index}>
              <CustomAccordion faqIten={faqIten} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
