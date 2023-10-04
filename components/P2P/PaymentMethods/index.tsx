export const PaymentMethodTable = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table mt-4">
              <thead>
                <tr>
                  <th scope="col">Type/Coin</th>
                  <th scope="col">Fiat amount</th>
                  <th scope="col">Price</th>
                  <th scope="col">Crypto amount</th>
                  <th scope="col">Counterparty</th>
                  <th scope="col">Status</th>
                  <th scope="col">Operation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="tableRow">
                  <td>
                    <div className="tableImg d-flex align-items-center">
                      <img
                        src="https://api-tradex.nftarttoken.xyz/images/avatars/yellow-hat.png"
                        alt=""
                      />
                      <h6 className="ml-2">Chirik34</h6>
                    </div>
                  </td>
                  <td>
                    <h6 className="mx-2">12,233.34 EUR</h6>
                  </td>
                  <td>113.60 BDT</td>
                  <td>157.89 USDT</td>
                  <td>
                    <a href="">riralam</a>
                  </td>
                  <td>
                    <h6>Cancelled</h6>
                  </td>
                  <td>
                    <p className="text-warning">Contact</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
