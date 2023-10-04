import React from "react";
import BlogCard from "./Card";
import { NoItemFound } from "components/NoItemFound/NoItemFound";
import SectionLoading from "components/common/SectionLoading";

const CardSection = ({ blogs, loading }: any) => {
  return (
    <div className="mb-5">
      {loading ? (
        <SectionLoading />
      ) : (
        <>
          <div className="row">
            {blogs.map((blog: any, index: any) => (
              <div className="col-md-6 col-lg-4 my-3" key={index}>
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        </>
      )}
      {blogs.length === 0 && loading === false && <NoItemFound />}
    </div>
  );
};

export default CardSection;
