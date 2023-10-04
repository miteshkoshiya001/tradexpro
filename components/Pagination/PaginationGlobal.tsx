import React, { useState } from "react";

const PaginationGlobal = ({
  setTimelineData,
  links,
  setLoading,
  setLinks,
  selected,
  LinkTopaginationString,
}: any) => {
  return (
    <div className="row justify-content-center justify-content-md-end pagination_custome">
      <ul className="pagination Paginate mb-5 mt-3">
        {links?.map((link: any, index: number) =>
          link.label === "&laquo; Previous" ? (
            <li
              key={index}
              className="page-item "
              onClick={() => {
                LinkTopaginationString(
                  link,
                  setTimelineData,
                  setLoading,
                  setLinks,
                  selected
                );
              }}>
              <span className="page-link">Previous</span>
            </li>
          ) : link.label === "Next &raquo;" ? (
            <li
              key={index}
              className="page-item "
              onClick={() => {
                LinkTopaginationString(
                  link,
                  setTimelineData,
                  setLoading,
                  setLinks,
                  selected
                );
              }}>
              <span className="page-link">Next</span>
            </li>
          ) : (
            <li
              key={index}
              className="page-item"
              onClick={() => {
                LinkTopaginationString(
                  link,
                  setTimelineData,
                  setLoading,
                  setLinks,
                  selected
                );
              }}>
              <span
                className={`page-link ${
                  link.active === true && "pagination_active shadow"
                }`}>
                {link.label}
              </span>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default PaginationGlobal;
