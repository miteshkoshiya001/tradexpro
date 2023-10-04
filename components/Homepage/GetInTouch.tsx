import ImageComponent from "components/common/ImageComponent";
import React from "react";

const GetInTouch = ({ landing, featureListdata }: any) => {
  return (
    <div>
      {parseInt(landing.landing_sixth_section_status) === 1 && (
        <section className="get-touch-area">
          <div className="container">
            <div className="section-title mb-3">
              <h2 className="title">{landing?.landing_feature_title}</h2>
            </div>

            <div className="row">
              {featureListdata?.map((feature: any, index: any) => (
                <div className="col-lg-4 col-md-6 mt-4" key={index}>
                  <a
                    href={`${
                      feature?.feature_url !== "" &&
                      feature?.feature_url != null
                        ? feature?.feature_url
                        : "#"
                    }`}
                    target={`${
                      feature?.feature_url !== "" &&
                      feature?.feature_url != null
                        ? "_blank"
                        : "_self"
                    }`}
                    rel="noreferrer"
                    className="single-card"
                  >
                    <img
                      className="card-icon"
                      src={feature.feature_icon}
                      alt="icon"
                    />
                    <h3 className="card-title">{feature?.feature_title}</h3>
                    <p className="card-content">{feature?.description}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default GetInTouch;
