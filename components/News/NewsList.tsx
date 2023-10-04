import { formateData } from "common";
import { NoItemFound } from "components/NoItemFound/NoItemFound";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { getNewsByCategoryApi } from "service/news";
import SectionLoading from "components/common/SectionLoading";

export const NewsList = ({
  recentNewsData,
  setRecentNews,
  categories,
  setLoading,
  loading,
  setLinks,
  setSelected,
  selected,
}: any) => {
  const getNewsByCategory = async (id: any) => {
    setLoading(true);
    setSelected(id);
    const CategoryNews = await getNewsByCategoryApi(id, 0, 5, 1);
    setRecentNews(CategoryNews?.data?.data);
    setLinks(CategoryNews?.data?.links);
    setLoading(false);
  };
  const { t } = useTranslation("common");

  return (
    <>
      <div className="row">
        <div className="col-12 mb-3 mt-5 d-flex">
          <div className="newsCategory">
            <ul>
              {categories.map((category: any, index: any) => (
                <li
                  key={index}
                  className={`itemCatagory ${
                    category?.id === selected ? "itemCatagoryactive" : ""
                  }`}
                  onClick={() => {
                    getNewsByCategory(category?.id);
                  }}
                >
                  {category?.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-center col-12 mb-5 ">
          {loading ? (
            <div className="newsLoadingContainer">
              <SectionLoading />
            </div>
          ) : (
            <div className="">
              {recentNewsData.length > 0 &&
                recentNewsData?.map((list: any, index: any) => (
                  <Link key={index} href={"/news/" + list?.post_id}>
                    <div className="newsCard p-4 mt-3">
                      <a href="">
                        <div className="row">
                          <div className="col-md-4">
                            <img
                              className="rounded"
                              src={list.thumbnail}
                              alt=""
                            />
                          </div>
                          <div className="col-md-8 pt-3 pt-md-0">
                            <div className="newsCardText">
                              <h5 className="titleText">{list.title}</h5>
                              <small>{formateData(list.created_at)}</small>
                              <p>{list.description}</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </Link>
                ))}

              {recentNewsData.length === 0 && loading === false && (
                <div className="newsLoadingContainer">
                  <NoItemFound />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
