import { Search } from "components/common/search";
import Link from "next/link";
import { useState } from "react";
import { knowledgebaseArticleSearchAction } from "state/actions/knowlegdgbase";
import OutsideClickHandler from "react-outside-click-handler";

export const TopBanner = ({ resorce }: any) => {
  const [suggestions, setSuggestions] = useState(true);

  const [lists, setLists] = useState([]);
  
  return (
    <section
      className=""
      style={{
        backgroundImage: resorce?.cover_image
          ? `url(${resorce?.cover_image})`
          : "url(/top_bg.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 text-center text-white mt-5 pt-5">
            <h1 className="text-white">
              {resorce?.knowledgebase_page_cover_first_title
                ? resorce?.knowledgebase_page_cover_first_title
                : "How can we help you ?"}
            </h1>
          </div>
          <div className="col-md-6 mx-auto pb-5">
            <OutsideClickHandler onOutsideClick={() => setSuggestions(false)}>
              <form>
                <div className="input-group my-3 mx-auto pb-5">
                  <div className="d-flex w-100 rounded top_search">
                    <input
                      className="w-100 px-2 py-2 rounded-pill border-0"
                      type="text"
                      name="notes"
                      onChange={(e: any) => {
                        knowledgebaseArticleSearchAction(
                          e.target.value,
                          setLists
                        );
                        setSuggestions(true);
                      }}
                    />
                    {/* <button
                    className="border-0 px-4 btn-secondary rounded-r"
                    type="submit"
                  >
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button> */}
                  </div>

                  {suggestions && (
                    <div
                      className="search-filter ps-1 rounded"
                      id="append-search-result"
                    >
                      {lists.map((list: any, index: number) => (
                        <Link
                          key={index}
                          href={"/knowledgebase/" + list.unique_code}
                        >
                          <a href="">{list?.title}</a>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </form>
            </OutsideClickHandler>
          </div>
        </div>
      </div>
    </section>
  );
};
