import useTranslation from "next-translate/useTranslation";
import React from "react";
import { GrFormAdd } from "react-icons/gr";
type faq = {
  question: string;
  answer: string;
};

export default function GiftCardsFaq({
  faq,
  index,
}: {
  faq: faq;
  index: number;
}) {
  const { question, answer } = faq || {};
  const { t } = useTranslation();
  return (
    <div className="col-lg-6 my-2">
      <div id="accordionExample">
        <div>
          <div id="headingThree">
            <button
              className="collapsed d-flex align-items-center gap-15 w-full bg-transparent border-0 text-primary"
              type="button"
              // onClick={faqArrow}
              data-toggle="collapse"
              data-target={`#collapseThree${index}`}
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <span className="gift-card-add-btn">
                <GrFormAdd />
              </span>
              {t(question)}
            </button>
          </div>
          <div
            id={`collapseThree${index}`}
            className="collapse"
            aria-labelledby="headingThree"
            data-parent="#accordionExample"
          >
            <div className="p-3">{t(answer)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
