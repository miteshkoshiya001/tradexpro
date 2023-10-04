import { KnowledgeCard } from "components/Knowledgebase/knowledge-card";
import { TopBanner } from "components/Knowledgebase/top-banner";
import SectionLoading from "components/common/SectionLoading";
import Footer from "components/common/footer";
import { pageAvailabilityCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { siteSettingResource } from "service/knowledgebase";
import { customPage, landingPage } from "service/landing-page";
import { knowledgebaseSubcategoryListbyIdAction } from "state/actions/knowlegdgbase";

const KnowledgebaseCategory = ({ resorce }: any) => {
  const [list, setList] = useState([]);
  const [details, setDetails] = useState<any>({});
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    router.query.category_id &&
      knowledgebaseSubcategoryListbyIdAction(
        setList,
        setDetails,
        setLoading,
        router.query.category_id
      );
  }, [router.query.category_id]);
  return (
    <>
      <TopBanner resorce={resorce} />
      <section className="mb-5 pb-5">
        <div className="container">
          {Loading ? (
            <div className="row mt-5 pt-5">
              <div className="col-12">
                <SectionLoading />
              </div>
            </div>
          ) : (
            <div className="row mt-5 ">
              <div className="col-12">
                <h1 className="text-center">Subcategory</h1>
                <a
                  className="d-flex align-items-center title-icon mt-5"
                  href=""
                >
                  <i className={details?.icon_class} aria-hidden="true"></i>
                  <h3 className="fw_600 m-0">{details?.name}</h3>
                </a>
              </div>
              {list.map((Subcategory, index: any) => (
                <KnowledgeCard key={index} subCategory={Subcategory} />
              ))}
            </div>
          )}
        </div>
      </section>
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
export default KnowledgebaseCategory;
