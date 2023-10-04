import { formateData } from "common";
import Footer from "components/common/footer";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { announcementDetailsBySlug } from "service/landing-page";
//@ts-ignore
import sanitizeHtml from "sanitize-html";

const Announcementdetails = ({ details, status }: any) => {
  const { t } = useTranslation("common");
  const clean = (dirty: any) => {
    return sanitizeHtml(dirty, {
      allowedTags: [
        "b",
        "i",
        "em",
        "strong",
        "a",
        "font",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "div",
        "p",
        "br",
        "hr",
        "head",
      ],
      allowedAttributes: {
        a: ["href", "target", "style"],
        div: ["href", "target", "style"],
        b: ["href", "target", "style"],
        i: ["href", "target", "style"],
        em: ["href", "target", "style"],
        strong: ["href", "target", "style"],
        font: ["href", "target", "style"],
        h1: ["href", "target", "style"],
        h2: ["href", "target", "style"],
        h3: ["href", "target", "style"],
        h4: ["href", "target", "style"],
        h5: ["href", "target", "style"],
        h6: ["href", "target", "style"],
        p: ["href", "target", "style"],
      },
    });
  };
  if (status === false) {
    return (
      <div className="container">
        <div className="section-wrapper text-center">
          <h4>{t("404 not found")}</h4>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="container mb-5">
        <div className="section-wrapper-withHtml ">
          <h1 className="display-4 mb-2">{details.title}</h1>
          <p className="mb-2">
            {t("Last revised:")} {formateData(details.updated_at)}
          </p>
          <img src={details.image} className="cover-image mb-5" />
          <div
            dangerouslySetInnerHTML={{
              __html: clean(details.description),
            }}
          ></div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { slug } = ctx.query;
  const { data } = await announcementDetailsBySlug(slug);
  return {
    props: {
      details: data.data,
      status: data.success,
    },
  };
};
export default Announcementdetails;
