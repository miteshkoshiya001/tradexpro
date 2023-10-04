import { formateData } from "common";
import { ArticalCard } from "components/Knowledgebase/article-card";
import Footer from "components/common/footer";
import { pageAvailabilityCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import { articleDetails } from "service/knowledgebase";
import { customPage, landingPage } from "service/landing-page";
import { getNewsDetails } from "service/news";
import Link from "next/link";

const KnowledgebaseArticleDetails = ({ articleDetails }: any) => {
  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-6 col-lg-8 mt-4">
            <div className="main_img">
              {articleDetails.article_details?.feature_image_url && (
                <img
                  className="rounded"
                  src={articleDetails.article_details?.feature_image_url}
                  alt="img"
                />
              )}
            </div>
            <h1 className="fw_600 pt-4 mb-0">
              {articleDetails.article_details?.title}
            </h1>
            <small className="article-date">
              {formateData(articleDetails.article_details.created_at)}
            </small>
            <div
              dangerouslySetInnerHTML={{
                // __html: clean(details.description),
                __html: articleDetails.article_details.description,
              }}
            ></div>
          </div>

          <div className="col-md-6 col-lg-4 mt-5 mt-lg-0 pt-4 ">
            <div className="row">
              {articleDetails.related_article_list.map(
                (article: any, index: any) => (
                  <div className="col-12 mt-4 mb-1" key={index}>
                    <div className="article_card px-4 pt-4 pb-4 ">
                      <h4 className="fw_600 pt-3 mb-0">
                        <span className="mr-2 h5">
                          <i className="fa fa-address-card"></i>
                        </span>
                        {article?.title}
                      </h4>
                      <small className="article-date">
                        {formateData(article?.created_at)}
                      </small>
                      <p
                        className="p_color pt-3"
                        dangerouslySetInnerHTML={{
                          // __html: clean(details.description),
                          __html: article?.description,
                        }}
                      ></p>
                    </div>
                    <Link href={"/knowledgebase/" + article.unique_code}>
                      <div className="details-button">
                        <a href="#">
                          View more
                          <i
                            className="ml-2 fa fa-long-arrow-right"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { article_id } = ctx.params;
  const Details = await articleDetails(article_id);
  const commonRes = await pageAvailabilityCheck();
  if (parseInt(commonRes.knowledgebase_support_module) !== 1) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      articleDetails: Details.data,
    },
  };
};
export default KnowledgebaseArticleDetails;
