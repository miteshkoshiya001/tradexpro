import { ArticalCard } from "components/Knowledgebase/article-card";
import { TopBanner } from "components/Knowledgebase/top-banner";
import SectionLoading from "components/common/SectionLoading";
import Footer from "components/common/footer";
import { pageAvailabilityCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { siteSettingResource } from "service/knowledgebase";
import { customPage, landingPage } from "service/landing-page";
import { knowledgebaseArticleListAction } from "state/actions/knowlegdgbase";

const KnowledgebaseArticleList = ({ resorce }: any) => {
  const [list, setList] = useState([]);
  const [details, setDetails] = useState<any>({});
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    router.query.sub_category_id &&
      knowledgebaseArticleListAction(
        setList,
        setDetails,
        setLoading,
        router.query.sub_category_id
      );
  }, [router.query.sub_category_id]);
  return (
    <>
      <TopBanner resorce={resorce} />

      {Loading ? (
        <div className="row mt-5 pt-5">
          <div className="col-12">
            <SectionLoading />
          </div>
        </div>
      ) : (
        <section className="mb-5 pb-5">
          <div className="container">
            <div className="row mt-5 ">
              <div className="col-12">
                <h1 className="text-center">{details?.name}</h1>
              </div>
              {list?.map((article: any, index: any) => (
                <ArticalCard key={index} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const commonRes = await pageAvailabilityCheck();
  const resorce = await siteSettingResource();
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
      resorce: resorce,
    },
  };
};
export default KnowledgebaseArticleList;
