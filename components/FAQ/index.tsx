import { FAQ_TYPE_DEPOSIT, FAQ_TYPE_WITHDRAWN } from "helpers/core-constants";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const FAQ = ({ faqs, type }: any) => {
  const { t } = useTranslation("common");
  return (
    <div className="">
      <div id="accordion">
        <h5 className="mb-3">{t("FAQ")}</h5>
        {faqs.map((faq: any, index: any) => (
          <div className="w-full" key={index}>
            <span>
              <div className="accordion" id="accordionExample">
                <div className="card faqAccordion shadow-sm rounded">
                  <div className="card-header" id="headingThree">
                    <button
                      className="d-flex justify-content-between align-items-center collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target={"#collapseThree" + faq.id}
                      aria-expanded="false"
                      aria-controls={"collapseThree" + faq.id}
                      style={{ padding: "10px" }}
                    >
                      {faq?.question}
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 320 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        className="faqDown"
                      >
                        <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
                      </svg>
                    </button>
                  </div>
                  <div
                    id={"collapseThree" + faq.id}
                    className="collapse"
                    aria-labelledby="headingThree"
                    data-parent="#accordionExample"
                    style={{}}
                  >
                    <div className="p-3">{faq?.answer}</div>
                  </div>
                </div>
              </div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
