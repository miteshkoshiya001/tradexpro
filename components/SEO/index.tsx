import Head from "next/head";
import React from "react";

export const SEO = ({ children, seoData }: any) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={seoData?.seo_social_title} />
        <meta name="description" content={seoData?.seo_meta_description} />
        <meta name="keywords" content={seoData?.seo_meta_keywords} />
        <meta property="og:image" content={seoData?.seo_image} />
      </Head>
      {children}
    </div>
  );
};
