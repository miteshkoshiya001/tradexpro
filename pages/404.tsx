import React from "react";

function PageNotFound() {
  return (
    <div className="notFound-container">
      {/* <h1 className="">404</h1> */}
      <img src="/not_found.svg" height={300} alt="" />
      <p className="">The page you are looking for could not be found.</p>
    </div>
  );
}

export default PageNotFound;
