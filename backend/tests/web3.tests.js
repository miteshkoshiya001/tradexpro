const web3 = require('web3');
const TronWeb = require("tronweb");
const TronGrid = require("trongrid");

const { contractJson } = require('../src/ContractAbiJson');
const { powerOfTen, customToWei } = require('../src/Heplers/helper');

const client = new web3(
  //   "https://bsc.rpc.blxrbdn.com"
  "https://bsc.getblock.io/d5420557-38c1-44c1-b466-a1055191fdf4/testnet/"
  // "https://bsc.getblock.io/7c96d9de-ac0f-429c-88aa-367c9c2760b5/mainnet/"
  //   "https://rpc-bsc.bnb48.club"
  // "https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3"
);
const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io/",
  headers: {
    "TRON-PRO-API-KEY": "1bef587d-61af-4d33-933b-cbab4baef07a",
  },
});

async function test() {

  let amount = 50000000; 
  let decimal = 18;
  const check = customToWei(amount, decimal);
  console.log(check);
  return check;
  // let contractABI = contractJson();
    // res = await client.eth.getBlockNumber();
    // console.log(res);

    // res = await client.eth.getBlock(25498132);
    // console.log(res);

    // res = await client.eth.getTransaction(
    //   "0x48729dac5657b2bad2f5b6e5be14a333bd1e52de83e43dd347f5dcde5e731f41"
    // );
    // console.log(res);
  // let contractAddress = "0x85194EB5110049bE1E5B10A8334DBE29d5735fa0";
  // const contract = new client.eth.Contract(contractABI, contractAddress);
  // decimalValue = await contract.methods.decimals().call();
  // console.log(decimalValue);
  try {
    const contractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
    contract = await tronWeb.contract().at(contractAddress);
    const adminAccount = "TBnQHhTJfaiihLJxfRH9CURwsNUnuDLdDc";
    tronWeb.setAddress(adminAccount);

    const decimal = await contract.decimals().call();
    
    const getDecimal = powerOfTen(decimal);

    console.log(decimal);
    console.log(getDecimal);

    const tronGrid = new TronGrid(tronWeb);
    // var result = await tronGrid.contract.getEvents(contractAddress, {
    //   only_confirmed: true,
    //   event_name: "Transfer",
    //   limit: 100,
    //   // min_timestamp: min_timestamp,
    //   order_by: "timestamp,desc",
    // });
    // console.log(result);
    const address = "TBnQHhTJfaiihLJxfRH9CURwsNUnuDLdDc";
    const response = await contract.balanceOf(address).call();
    const balance = tronWeb.BigNumber(response._hex) / getDecimal;

    console.log(balance);
  } catch (err) {
    console.log(err);
  }
  
}
test();