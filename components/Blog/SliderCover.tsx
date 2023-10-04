import moment from "moment";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";
const SliderCover = ({ featuredblogs }: any) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  return (
    <div className="mt-4">
      <Slider className="blogSlider" {...settings}>
        {featuredblogs?.map((featuredblog: any, index: any) => (
          <Link href={"/blog/" + featuredblog?.post_id} key={index}>
            <a>
              <div className="row mt-4">
                <div className="col-md-5">
                  <img
                    className="SliderBlog rounded"
                    src={featuredblog?.thumbnail}
                  />
                </div>
                <div className="col-md-7 blogSliderText">
                  <h1 className="pt-4 pb-3 pt-md-0 titleText">
                    {featuredblog?.title}
                  </h1>
                  <small>
                    {moment(featuredblog?.createdAt)
                      .subtract(1, "days")
                      .calendar()}
                  </small>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default SliderCover;
