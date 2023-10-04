import request from "lib/request";

export const CommonLandingCustomSettings = (locale: any = "en") => {
  return request.get("/common-landing-custom-settings", {
    headers: {
      lang: locale,
    },
  });
};

export const landingPage = (locale: any) => {
  return request.get("/landing", {
    headers: {
      lang: locale,
    },
  });
};
export const landingPageSlug = (locale: any, slug: string) => {
  return request.get(`/landing?slug=${slug}`, {
    headers: {
      lang: locale,
    },
  });
};

export const customPage = () => {
  return request.get("/custom-pages");
};
export const commomSettings = () => {
  return request.get("/common-settings");
};
export const customPageWithSlug = (slug: string) => {
  return request.get(`/pages-details/${slug}`);
};

export const bannerList = () => {
  return request.get("/banner-list");
};
export const announcementList = () => {
  return request.get("/announcement-list");
};

export const featureList = () => {
  return request.get("/feature-list");
};
export const socialMediaList = () => {
  return request.get("/social-media-list");
};

export const bannerDetailsBySlug = (slug: any) => {
  return request.get(`/banner-list/${slug}`);
};

export const announcementDetailsBySlug = (slug: any) => {
  return request.get(`/announcement-list/${slug}`);
};

export const getBlogHomePageDataApi = async () => {
  const { data } = await request.get(`latest-blog-list`);
  return data;
};
