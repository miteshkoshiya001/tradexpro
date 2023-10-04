import CardSection from "components/Blog/CardSection";
import SliderCover from "components/Blog/SliderCover";
import TabSection from "components/Blog/TabSection";
import Footer from "components/common/footer";
import { Search } from "components/common/search";
import { pageAvailabilityCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { getBlogNewsSettings } from "service/news";
import { BlogHomePageAction, BlogSearchAction } from "state/actions/blog";

const Index = ({}: any) => {
  const [loading, setLoading] = useState(false);
  const [featuredBlogs, setfeaturedBlogs] = useState<any>();
  const [categories, setcategories] = useState();
  const [BlogNewsSettings, setBlogNewsSettings] = useState<any>(false);
  const [recentBlogsState, setRecentBlogState] = useState([]);

  const getIt = async () => {
    setLoading(true);
    const { FeaturedBlogs, RecentBlogs, Categories } = await BlogHomePageAction();
    setfeaturedBlogs(FeaturedBlogs.data);
    setRecentBlogState(RecentBlogs.data.data);
    setcategories(Categories.data);
    const { data: BlogNewsSettings } = await getBlogNewsSettings();
    setBlogNewsSettings(BlogNewsSettings);
    setLoading(false);
  };
  useEffect(() => {
    getIt();
  }, []);
  return (
    <>
      <div className="">
        <div className="container ">
          <div className="row align-items-center">
            <div className="col-md-7">
              <h2>{BlogNewsSettings?.blog_feature_heading}</h2>
              <p>{BlogNewsSettings?.blog_feature_description}</p>
            </div>
            <div className="col-md-5">
              {parseInt(BlogNewsSettings?.blog_search_enable) === 1 && (
                <Search searchFunction={BlogSearchAction} linkName={"blog"} />
              )}
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div className="container">
        <SliderCover featuredblogs={featuredBlogs?.data} />
        <TabSection
          categories={categories}
          setRecentBlogState={setRecentBlogState}
          setLoading={setLoading}
        />
        <CardSection blogs={recentBlogsState} loading={loading} />

        {/* <Pagination /> */}
      </div>
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  // const { FeaturedBlogs, RecentBlogs, Categories } = await BlogHomePageAction(
  //   ctx.locale
  // );
  // const cookies = parseCookies(ctx);
  // const response = await GetUserInfoByTokenServer(cookies.token);
  // const { data: BlogNewsSettings } = await getBlogNewsSettings();
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
      // featuredBlogs: FeaturedBlogs.data,
      // recentBlogs: RecentBlogs.data,
      // categories: Categories?.data,
      // BlogNewsSettings: BlogNewsSettings,
    },
  };
};
export default Index;
