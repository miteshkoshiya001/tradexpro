export const P2pBlogCard = ({ item }: any) => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="newsCard p-4 mt-4">
        <a href="">
          <div className="row">
            <div className="col-12">
              <img className="rounded" src={item.img} alt="" />
            </div>
            <div className="col-12 pt-3">
              <div className="newsCardText">
                <h4 className="titleText">{item.title}</h4>
                <small>{item.date}</small>
                <p>{item.discription}</p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};
