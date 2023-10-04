import useTranslation from "next-translate/useTranslation";
import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
const SocialShare = (url: any) => {
  const { t } = useTranslation("common");

  return (
    <div className="col-md-4 ">
      <h4 className="mt-4 ">{t("Share")}</h4>
      <div className="my-3 newsShare d-flex align-items-center">
        <a href="">
          <FacebookShareButton
            url={url}
            quote={"Share on facebook"}
            hashtag="#muo">
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </a>
        <a href="">
          <TwitterShareButton url={url}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </a>
        <a href="">
          <RedditShareButton url={url}>
            <RedditIcon size={32} round />
          </RedditShareButton>
        </a>
        <a href="">
          <InstapaperShareButton url={url}>
            <InstapaperIcon size={32} round />
          </InstapaperShareButton>
        </a>
        <a href="">
          <WhatsappShareButton url={url}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </a>
      </div>
    </div>
  );
};

export default SocialShare;
