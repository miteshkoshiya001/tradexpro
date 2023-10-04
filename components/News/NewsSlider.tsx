import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export const NewsSlider = ({ PopularNews }: any) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="row mt-4">
      <div className="col-12">
        <Slider {...settings}>
          {PopularNews?.map((item: any, index: any) => (
            <Link href={"/news/" + item?.post_id} key={index}>
              <a>
                <div>
                  <img
                    className="rounded SliderNews"
                    src={item?.thumbnail}
                    alt=""
                  />
                </div>
              </a>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};
