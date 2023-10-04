const express = require("express");

const {
  getData,
  generateAddress,
  getWalletBalance,
  sendToken,
  checkEstimateGasFees,
  sendEth,
  getTransactionByContractAddress,
  getDataByTransactionHash,
  getLatestEvents,
  getContractDetails,
  getAddressFromPK,
  testBitgo,
} = require("../Controllers/TokenController");
const trx = require("../Controllers/TrxController");
const trc20 = require("../Controllers/TrcTokenController");

const { checkSecurity } = require("../middleware/common/SecurityCheck");
const {
  CheckBalanceValidators,
  CheckBalanceValidatorHandler,
} = require("../Validator/GetBalanceValidator");

const route = express.Router();

route.use(checkSecurity);
route.get("/", getData);
route.post("/create-wallet", generateAddress);
route.post(
  "/check-wallet-balance",
  CheckBalanceValidators,
  CheckBalanceValidatorHandler,
  getWalletBalance
);
route.post("/send-eth", sendEth);
route.post("/send-token", sendToken);
// route.post("/get-contract-transaction", getTransactionByContractAddress)
route.post("/check-estimate-gas", checkEstimateGasFees);
route.post("/get-transaction-data", getDataByTransactionHash);
route.post("/get-transfer-event", getLatestEvents);
route.post("/get-contract-details", getContractDetails);
route.post("/get-address-by-pk", getAddressFromPK);
route.post("/get-trx-account", trx.getTrxAccount);
route.post("/get-trx-address", trx.getTrxAddressByPk);
route.post("/check-trx-address", trx.checkTrxAddress);
route.post("/get-trx-confirmed-transaction", trx.getTrxConfirmedTransaction);
route.post("/get-trc-transaction-event-watch", trc20.getTrc20TransferEvent);
route.post("/check-gas", trc20.getTrc20TransferEvent);
route.post("/get-trx-transaction", trx.getTrxTransactionBlock);
route.post("/get-trx-estimate-gas", trx.getTrxEstimateGas);

route.post("/test-bitgo", testBitgo);

module.exports = route;
