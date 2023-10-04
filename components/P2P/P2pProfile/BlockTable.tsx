export const BlockTable = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="paymentMethodBox mt-4 rounded shadow-sm">
            <div className="row">
              <div className="col-12">
                <h5 className="p-4">Blocked User</h5>
                <div className="p-4">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Counterparty</th>
                          <th scope="col">Reason</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="tableRow">
                          <td className="py-1">
                            <div className="tableImg d-flex align-items-center">
                              <img
                                src="https://api-tradex.nftarttoken.xyz/images/avatars/yellow-hat.png"
                                alt=""
                              />
                              {/* <h4 className="tableImg">
                                <b>F</b>
                                </h4> */}
                              <h5>Chirik34</h5>
                            </div>
                          </td>
                          <td>Other</td>
                          <td>UnBlock</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
