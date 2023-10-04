import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";

import {
  SSRAuthCheck,
  pageAvailabilityCheck,
} from "middlewares/ssr-authentication-check";
import { getBlogNewsSettings, getNewsDetails } from "service/news";
import { GetServerSideProps } from "next";
import { formateData } from "common";
import SocialShare from "components/common/SocialShare";
import { customPage, landingPage } from "service/landing-page";
import Footer from "components/common/footer";
import CommentSection from "components/Blog/CommentSection";
import { PostCommentAction } from "state/actions/news";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setLoading } from "state/reducer/user";

const NewsDetails = ({ BlogNewsSettings }: any) => {
  const [newsDetails, setnewsDetails] = useState<any>();

  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const getDetails = async (id: any) => {
    dispatch(setLoading(true));
    const newsDetails = await getNewsDetails(id);
    setnewsDetails(newsDetails?.data);
    dispatch(setLoading(false));
  };
  useEffect(() => {
    id && getDetails(id);
  }, []);
  return (
    <>
      <div className="container">
        <Link href="/news">
          <a>
            <h3 className="pb-3 newsDetailsTitle sectionTitle d-flex align-items-center">
              <BiChevronLeft />
              {t("Back")}
            </h3>
          </a>
        </Link>

        <div className="row">
          <div className="col-md-8">
            <div className="newsCardText mt-4">
              <h3 className="titleText">{newsDetails?.details?.title}</h3>
              <small>{formateData(newsDetails?.details?.created_at)}</small>
              <img
                className="my-3 rounded"
                src={newsDetails?.details?.thumbnail}
                alt=""
              />
              <div
                className="mt-4"
                dangerouslySetInnerHTML={{
                  __html: newsDetails?.details?.body,
                }}
              ></div>
            </div>
          </div>
          <div className="col-md-4">
            <SocialShare
              url={
                process.env.NEXT_PUBLIC_HOSTED_CLIENT_URL +
                "news/" +
                newsDetails?.details?.post_id
              }
            />

            {newsDetails?.related?.data.map((item: any, index: any) => (
              <div className="newsCard p-4 mt-2" key={index}>
                <a href="">
                  <div className="row">
                    <div className="col-12">
                      <img className="rounded" src={item.thumbnail} alt="" />
                    </div>
                    <div className="col-12 pt-3">
                      <div className="newsCardText">
                        <h3 className="titleText">{item.title}</h3>
                        <small>{formateData(item.created_at)}</small>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
        {parseInt(BlogNewsSettings?.news_comment_enable) === 1 && (
          <CommentSection
            comments={newsDetails?.comments}
            post_id={newsDetails?.details?.post_id}
            PostCommentAction={PostCommentAction}
            comment_allow={newsDetails?.details?.comment_allow}
          />
        )}
      </div>
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  // await SSRAuthCheck(ctx, "/news");
  const { id } = ctx.params;
  const newsDetails = await getNewsDetails(id);
  const { data: BlogNewsSettings } = await getBlogNewsSettings();
  const commonRes = await pageAvailabilityCheck();
  if (parseInt(commonRes.blog_news_module) !== 1) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      newsDetails: newsDetails.data,
      BlogNewsSettings: BlogNewsSettings,
    },
  };
};
export default NewsDetails;
