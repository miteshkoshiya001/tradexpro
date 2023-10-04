import Link from "next/link";

export const KnowledgeCard = (subCategory: any) => {
  return (
    <div className="col-md-6 col-lg-4 mt-5 pt-4 pt-lg-0">
      <div className="sub_title h-100">
        <div className="d-flex justify-content-center flex-column align-items-center pt-3">
          <span className="card-top-icon mb-3">
            <i className="fa fa-graduation-cap" aria-hidden="true"></i>
          </span>
          <h5>
            {subCategory.subCategory?.name} (
            {subCategory.subCategory?.knb_articles?.length})
          </h5>
        </div>
        <ul className="m-0 px-3 pt-3">
          {subCategory.subCategory?.knb_articles.map(
            (article: any, index: any) => (
              <Link href={"/knowledgebase/" + article.unique_code} key={index}>
                <li className="article-list">
                  <a className="p_color py-2 d-flex" href="#">
                    <span className="sub_icon">
                      <i className="fa fa-address-card" aria-hidden="true"></i>
                    </span>
                    {article?.title}
                  </a>
                </li>
              </Link>
            )
          )}
        </ul>
      </div>
      <Link
        href={
          "/knowledgebase/article-list/" + subCategory.subCategory.unique_code
        }
      >
        <div className="details-button">
          <a href="">
            Show more
            <i className="ml-2 mt-1 fa fa-angle-right" aria-hidden="true"></i>
          </a>
        </div>
      </Link>
    </div>
  );
};
