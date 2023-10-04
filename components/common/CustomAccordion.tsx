import { FaAngleDown } from "react-icons/fa";
import { useState } from "react";

export const CustomAccordion = ({ faqIten }: any) => {
  const [faqDown, setFaqDown] = useState(true);
  const faqArrow = () => setFaqDown(!faqDown);

  return (
    <div className="accordion" id="accordionExample">
      <div className="card faqAccordion shadow-sm">
        <div className="card-header" id="headingThree">
          <button
            className="collapsed d-flex justify-content-between align-items-center"
            type="button"
            onClick={faqArrow}
            data-toggle="collapse"
            data-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            {faqIten?.question}
            <FaAngleDown className={`${faqDown ? "faqDown" : ""}`} />
          </button>
        </div>
        <div
          id="collapseThree"
          className="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordionExample"
        >
          <div className="p-3">{faqIten?.answer}</div>
        </div>
      </div>
    </div>
  );
};
