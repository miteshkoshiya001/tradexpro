import { KnowledgeCard } from "components/Knowledgebase/knowledge-card";
import { TopBanner } from "components/Knowledgebase/top-banner";
import SectionLoading from "components/common/SectionLoading";
import Footer from "components/common/footer";
import {
  SSRAuthCheck,
  pageAvailabilityCheck,
} from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteSettingResource } from "service/knowledgebase";
import { customPage, landingPage } from "service/landing-page";
import { getKnowledgebaseInfoAction } from "state/actions/knowlegdgbase";

const Knowledgebase = ({ resorce }: any) => {
  const [loading, setLoading] = useState(true);
  const [knowledgebase, setKnowledgebase] = useState([]);
  useEffect(() => {
    getKnowledgebaseInfoAction(setKnowledgebase, setLoading);
  }, []);
  return (
    <>
      <TopBanner resorce={resorce} />
      <section className="mb-5 pb-5">
        <div className="container">
          {loading ? (
            <div className="row mt-5 pt-5">
              <div className="col-12">
                <SectionLoading />
              </div>
            </div>
          ) : (
            knowledgebase.map((section: any, key: any) => (
              <div className="row mt-5 pt-5" key={key}>
                <div className="col-12">
                  <Link
                    href={
                      "/knowledgebase/sub-category-list/" + section.unique_code
                    }
                  >
                    <a className="d-flex align-items-center title-icon" href="">
                      <i className="fa-sharp fa-solid fa-house"></i>
                      <h3 className="fw_600 m-0">{section?.name}</h3>
                    </a>
                  </Link>
                </div>

                {section?.knb_sub_category.map(
                  (subCategory: any, index: any) => (
                    <KnowledgeCard key={index} subCategory={subCategory} />
                  )
                )}
              </div>
            ))
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
export default Knowledgebase;
