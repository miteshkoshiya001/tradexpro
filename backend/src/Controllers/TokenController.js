const { publicDecrypt } = require("crypto");
const { response } = require("express");
const Web3 = require("web3");
const {contractJson} = require("../../src/ContractAbiJson");
const { contract_decimals,customFromWei,customToWei, gasLimit } = require("../Heplers/helper");
const trc20Token = require("./TrcTokenController");
const trxToken = require("./TrxController");
const abi = require('web3-eth-abi');

// ERC20_TOKEN = 4
// BEP20_TOKEN = 5
// TRC20_TOKEN = 6

// BALANCE_TYPE_BASE_COIN_BALANCE= 1
// BALANCE_TYPE_TOKEN_BALANCE= 2
// BALANCE_TYPE_BOTH_BALANCE= 3

function getData(req, res)
{
    let tokenBalance = 100;
    let tokenBalance1 = Web3.utils.fromWei(tokenBalance.toString(), 'picoether');
    let tokenBalance2 = Web3.utils.toWei(tokenBalance.toString(), 'picoether');
    let dc = customFromWei(tokenBalance,6);
    let dc2 = customToWei(tokenBalance,6);
    res.send({
        status: true,
        message: "data successfully",
        data: {
            'data' : 'exapmle data ',
            'data0' : tokenBalance,
            'data1' : tokenBalance1,
            'data2' : tokenBalance2,
            'data3' : dc,
            'data4' : dc2,

        }
    });
}

// get token decimal
async function getContractDecimal(contractInstance)
{
    const decimal = await contractInstance.methods.decimals().call();
    return decimal;
}
/*{
    address: '0x33B380d0b8B1e5Bc3Efb364FCf4eaEA46834Eb96',
    privateKey: '0x32ddeae1c7302f484e35a53685edab78147a78757bba755d5094497f60307fce',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt]
}*/

async function generateAddress(req, res) 
{
    try {
        const network = req.headers.chainlinks;
        const networkType = req.headers.networktype;
    
        if (network) {
            if (parseInt(networkType) == 6) {
                await trxToken.createAccount(req,res);
            } else {
            
                const connectWeb3 = new Web3(new Web3.providers.HttpProvider(network));
            
                let wallet = await connectWeb3.eth.accounts.create();
                if (wallet) {
                    res.json({
                        status: true,
                        message: "Wallet created successfully",
                        data: wallet
                    });
                } else {
                    res.json({
                        status: false,
                        message: "Wallet not generated",
                        data: {}
                    });
                }
            }
            
        } else {
            res.json({
                status: false,
                message: "No chain provided",
                data: {}
            });
        }
    } catch(e){
        res.json({
            status: false,
            message: e.message,
            data: {}
        });
    }
    
}

async function getWalletBalance(req, res)
{
    try {
        const network = req.headers.chainlinks;
        const networkType = req.headers.networktype;
        let contractJsons = contractJson();
        let tokenDecimal = '';
        if (network) {
            const type = req.body.type;
            const address = req.body.address;
            let netBalance = 0;
            let tokenBalance = 0;
            
            if (parseInt(networkType) == 6) {
                await trxToken.getTronBalance(req,res);
            } else {
                
                const web3 = new Web3(network);
                if (type == 1) {
                    netBalance = await web3.eth.getBalance(address);
                    netBalance = Web3.utils.fromWei(netBalance.toString(), 'ether');

                } else if(type == 2) {
                    const contractAddress = req.body.contract_address;
                    if (contractAddress) {
                        const contractInstance = new web3.eth.Contract(contractJsons, contractAddress);
                        tokenBalance = await contractInstance.methods.balanceOf(address).call();
                        tokenDecimal = await getContractDecimal(contractInstance);

                        tokenBalance = customFromWei(tokenBalance, tokenDecimal);
                       
                    } else {
                        res.json({
                            status: false,
                            message: "Contract address required",
                            data: {}
                        });
                    } 

                } else {
                    const contractAddress = req.body.contract_address;
                    if (contractAddress) {
                        netBalance = await web3.eth.getBalance(address);
                        netBalance = Web3.utils.fromWei(netBalance.toString(), 'ether');

                        const contractInstance = new web3.eth.Contract(contractJsons, contractAddress);
                        tokenBalance = await contractInstance.methods.balanceOf(address).call();
                        tokenDecimal = await getContractDecimal(contractInstance);
                        
                        tokenBalance = customFromWei(tokenBalance, tokenDecimal);
                        
                    } else {
                        res.json({
                            status: false,
                            message: "Contract address required",
                            data: {}
                        });
                    } 
                }
                const data = {
                    net_balance : netBalance,
                    token_balance : tokenBalance
                }

                res.send({
                    status: true,
                    message: "process successfully",
                    data: data
                });
            }
        
        } else {
            res.json({
                status: false,
                message: "No chain provided",
                data: {}
            });
        }
    } catch(e){
        console.log('getWalletBalance');
        console.log(e);
        res.json({
            status: false,
            message: e.message,
            data: {}
        });
    }
}

// calculate estimate gas fees
async function calculateEstimateGasFees(req,type)
{
    let data = "";
    try {
        const network = req.headers.chainlinks;
        const web3 = new Web3(network);
        let amount = req.body.amount_value;
        let gasPrice =  await web3.eth.getGasPrice();
        // gasPrice = Web3.utils.fromWei(gasPrice.toString(), 'gwei');
        console.log('gas price');
        console.log(gasPrice);
        const fromAddress = req.body.from_address;
        const receiverAddress = req.body.to_address;
        let usedGasLimit = req.body.gas_limit;
        let gasFees = 0;
        let finalGasFees = 0;
        
        if (type == 1) {
            const contractAddress = req.body.contract_address;
            let contractJsons = contractJson();
            const contract = new web3.eth.Contract(contractJsons, contractAddress);
            const contractDecimal = await getContractDecimal(contract);
            console.log("contractDecimal", contractDecimal);
            amount = customToWei(amount, contractDecimal);
            console.log("amount", amount);
            if (Number(usedGasLimit) > 0) {
                gasFees = Number(usedGasLimit) * Number(gasPrice);
            } else {
                console.log('before estimate')
                var estimateGasStatus = false
                var estimateGasMessage = ''
                const estimatedGasRes = await contract.methods.transfer(receiverAddress, amount)
                                                                .estimateGas({ from: fromAddress }).catch(e=>{
                                                                    estimateGasStatus = true
                                                                    estimateGasMessage = e.message
                                                                });
                if(estimateGasStatus)
                {
                    return data = {
                        status: false,
                        message: estimateGasMessage
                    }
                }
                console.log('estimateGas');
                console.log(estimatedGasRes);
                usedGasLimit = parseInt(estimatedGasRes/2) + estimatedGasRes;
                console.log('usedGasLimit');
                console.log(usedGasLimit);
                gasFees = Number(usedGasLimit) * Number(gasPrice);
            }
            console.log('gasFees');
            console.log(gasFees);
            finalGasFees = Web3.utils.fromWei(gasFees.toString());
            
            console.log(finalGasFees);
            data = {
                status: true,
                message: 'Calculate gas fees successfully!',
                amount : amount,
                tx: 'ok',
                gasLimit: usedGasLimit,
                gasPrice: gasPrice,
                estimateGasFees: finalGasFees
            }
        
        } else {
            const chainId = req.body.chain_id;
            console.log('type 2')
            amount = Web3.utils.toWei(amount.toString(), 'ether');
            if (usedGasLimit > 0) {
                gasFees = (usedGasLimit * gasPrice);
            } else {
                let transaction = {
                    from: fromAddress,
                    to: receiverAddress,
                    value: amount,
                    chainId: chainId  
                };
                console.log(transaction)
                let estimateGas = await web3.eth.estimateGas(transaction)
                console.log('estimateGas');
                console.log(estimateGas);
                usedGasLimit = parseInt(estimateGas/2) + estimateGas;
                console.log('usedGasLimit');
                console.log(usedGasLimit);
                gasFees = (usedGasLimit*gasPrice);
            }
            console.log('gasFees');
            console.log(gasFees);
            finalGasFees = Web3.utils.fromWei(gasFees.toString(), 'gwei');
            console.log(finalGasFees);

            data = {
                status: true,
                message: 'Calculate gas fees successfully!',
                    amount : amount,
                    tx: 'ok',
                    gasLimit: usedGasLimit,
                    gasPrice: gasPrice,
                    estimateGasFees: finalGasFees
                }

        }
    } catch(e) {
        console.log('error');
        console.log(e);
        data = {
            status: false,
            message: e.message
        }
    }
    
    return data;
}
async function checkEstimateGasFees(req, res)
{
    try {
        console.log('checkEstimateGasFees called')
        const network = req.headers.chainlinks;
        let contractJsons = contractJson();
        if (network) {
            const usedGasLimit = req.body.gas_limit;
            const fromAddress = req.body.from_address;
            const contractAddress = req.body.contract_address;
            const receiverAddress = req.body.to_address;
            
            const data = await calculateEstimateGasFees(req, 1);
            console.log('data',data);
            if (data.status) {
                console.log("data found", data);
                res.json({
                    status: true,
                    message: "Get Estimate gas successfully",
                    data: data
                });
            } else {
                res.json({
                    status: false,
                    message: "Get Estimate gas failed",
                    data: {}
                });
            }
        } else {
            res.json({
                status: false,
                message: "No chain provided",
                data: {}
            });
        }
    } catch(e) {
        console.log('exception')
        console.log(e)
        res.json({
            status: false,
            message: e.message,
            data: {}
        });
    }
}

 async function sendToken(req, res)
 {
    console.log("send token process started");
    try {
        
        const network = req.headers.chainlinks;
        let contractJsons = contractJson();
        const networkType = req.headers.networktype;
        let decimalValue = 18;
        if (network) {
            
            if (parseInt(networkType) == 6) {
                trc20Token.sendTrc20Token(req, res);
            } else {
                const fromAddress = req.body.from_address;
                const contractAddress = req.body.contract_address;
                const receiverAddress = req.body.to_address;
                
                const privateKey = req.body.contracts;
                let amount = req.body.amount_value;
                console.log('requested amount =', amount);
                let checkValidAddress = new Web3().utils.isAddress(receiverAddress);
                
                if (checkValidAddress){
                    
                    const web3 = new Web3(network);
                    let gasPrice =  await web3.eth.getGasPrice();
                    gasPrice = Web3.utils.fromWei(gasPrice.toString(), 'ether');

                    const contract = new web3.eth.Contract(contractJsons, contractAddress);
                    decimalValue = await getContractDecimal(contract);
                    
                    amount = customToWei(amount, decimalValue);
                    console.log("sendable amount =", amount);
                    const dataGas = await calculateEstimateGasFees(req,1);
                    if(dataGas.status)
                    {
                        console.log('dataGas',dataGas);
                        let usedGasLimit = dataGas.gasLimit;
                        console.log("used gaslimit", usedGasLimit);
                    
                        try {
                            const tx = {
                            from: fromAddress,
                            to: contractAddress,
                            // gas: Web3.utils.toHex(usedGasLimit),
                            gas: usedGasLimit,
                            data: contract.methods
                                .transfer(receiverAddress, amount)
                                .encodeABI(),
                            };
                            const signedTx =
                            await web3.eth.accounts.signTransaction(
                                tx,
                                privateKey
                                );
                            const receipt = await web3.eth.sendSignedTransaction(
                            signedTx.rawTransaction
                            );
                            console.log(receipt);
                            res.json({
                            status: true,
                            message: "Token sent successfully",
                            data: {
                                hash: receipt.transactionHash,
                                used_gas: receipt.gasUsed * gasPrice,
                                tx: receipt,
                                used_gas_fees:dataGas.estimateGasFees,
                                used_gas_limit:dataGas.gasLimit,
                            },
                            });
                        } catch (err) {
                            console.log(err);
                            console.log(err.message);
                            res.json({
                            status: false,
                            message: err.message,
                            data: {
                                used_gas_fees:dataGas.estimateGasFees,
                                used_gas_limit:dataGas.gasLimit,
                            },
                            });
                        }
                    }else{
                        res.json(dataGas);
                    }
                    
                } else {
                    res.json({
                        status: false,
                        message: "Invalid address",
                        data: {}
                    });
                }
            } 
        } else {
            res.json({
                status: false,
                message: "No chain provided",
                data: {}
            });
        }
    } catch(e) {
        console.log(e)
        res.json({
            status: false,
            message: e.message,
            data: {}
        });
    }
 }

async function getDataByTransactionHash(req, res)
{
    try {
        const network = req.headers.chainlinks;
        const hash = req.body.transaction_hash;
        const networkType = req.headers.networktype;
        if (parseInt(networkType) == 6) {
            await trxToken.getTrxConfirmedTransaction(req, res);
        } else {
            const response = await getERC20tokenTransactionDetails(req);
            res.send({
                status: response.status,
                message: response.message,
                data: response.data
            })
        }
    } catch (e) {
        res.send({
            status: false,
            message: e.message,
            data: {}
        })
    }

}

// get erc20 token transaction data
async function getERC20tokenTransactionDetails(req)
{ 
    try {
        const network = req.headers.chainlinks;
        const hash = req.body.transaction_hash;
        const web3 = new Web3(network);
        console.log('hash ', hash);
        const response = await web3.eth.getTransaction(hash);
       
        console.log(response);
        if (response) {
          let contractJsons = contractJson();
          let tokenAddress = req.body.contract_address;
          // Decode the input data using the ERC20 token ABI
            const contract = new web3.eth.Contract(contractJsons, tokenAddress);
          const types = ["address", "uint256"];

          // Decode the input data using the types of the function arguments
          const input = web3.eth.abi.decodeParameters(
            types,
            response.input.substring(10)
          );
            console.log(input);
          // The amount of tokens transferred is the second parameter
            let amount = input[1];
            let toAddress = input[0];
            const tokenDecimal = await getContractDecimal(contract);

            amount = customFromWei(amount, tokenDecimal);
          return {
            status: true,
            message: "Get transaction success",
            data: {
              hash: response,
              gas_used: response.gas / response.gasPrice,
              txID: response.hash,
              amount: amount,
              toAddress: toAddress,
              fromAddress: response.from,
            },
          };
        } else {
            return {
                status: false,
                message: "Get transaction failed",
                data: {},
            };
        }
    } catch (err) {
        console.log(err);
        return {
            status: false,
            message: String(err),
            data: {},
        };
    }
}

async function getHashTransaction(network,hash)
{
    try {       
        const transactionHash = hash
        if (network) {
            const web3 = new Web3(network);
            let gasPrice =  await web3.eth.getGasPrice();
            gasPrice = Web3.utils.fromWei(gasPrice.toString(), 'ether')
            const hash = await web3.eth.getTransactionReceipt(transactionHash)
            if (hash) {
                return {
                    status: true,
                    message: "get hash",
                    data: {
                        hash: hash,
                        gas_used: hash.gasUsed * gasPrice,
                        txID: hash.transactionHash
                    }
                };
            } else {
                return {
                    status: false,
                    message: "not found",
                    data: {} 
                };
            }
            
        } else {
            return{
                status: false,
                message: "No chain provided",
                data: {}
            };
        }
    } catch(e) {
        return{
            status: false,
            message: e.message,
            data: {}
        };
    }
}

async function sendEth(req, res)
{
    console.log('send native coin process started');
    try {
        const network = req.headers.chainlinks;
        const networkType = req.headers.networktype;

        if (network) {
            let usedGasLimit = req.body.gas_limit;
            const fromAddress = req.body.from_address;
            const receiverAddress = req.body.to_address;
            const privateKey = req.body.contracts;
            const chainId = req.body.chain_id;
            let amount = req.body.amount_value;
            console.log('requested amount', amount);
            if (parseInt(networkType) == 6) {
                await trxToken.sendTrxProcess(req,res);
            } else {
                const web3 = new Web3(network);
                let checkValidAddress = new Web3().utils.isAddress(receiverAddress);
                
                if (checkValidAddress){
                    amount = Web3.utils.toWei(amount.toString(), 'ether');
                    console.log("sendable amount", amount);
                    let gasPrice =  await web3.eth.getGasPrice();
                    let nonce = await web3.eth.getTransactionCount(fromAddress,'latest');
                    usedGasLimit = usedGasLimit > 0 ? usedGasLimit : 63000;
                    const checkNativeBalance = await checkNativeCoinBalance(req, res);
                    console.log("checkNativeBalance =", checkNativeBalance);
                    let transaction = {
                        from: fromAddress,
                        nonce: web3.utils.toHex(nonce),
                        gas: usedGasLimit,
                        to: receiverAddress,
                        value: amount,
                        chainId: chainId // 
                    };

                    const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);

                    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
                        if (!error) {
                            res.json({
                                status: true,
                                message: "Coin sent successfully",
                                data: {
                                    hash : hash,
                                }
                            });

                        } else {
                            console.log('eth send error');
                            console.log(error);
                        res.json({
                                status: false,
                                message: error.message,
                                data: {
                                    error
                                }
                            });
                        }
                    });
                } else {
                    res.json({
                        status: false,
                        message: "Invalid address",
                        data: {}
                    });
                }
            }
            
        } else {
            res.json({
                status: false,
                message: "No network provided",
                data: {}
            });
        }
    } catch (e) {
        console.log('send  eth ex');
        console.log(e);
        res.json({
            status: false,
            message: e.message
        });
    }
}

// checking native coin balance
async function checkNativeCoinBalance(req, res)
{
    try {
        const network = req.headers.chainlinks;
        const networkType = req.headers.networktype;
        const address = req.body.from_address;
        const web3 = new Web3(network);
        netBalance = await web3.eth.getBalance(address);
        netBalance = Web3.utils.fromWei(netBalance.toString(), 'ether');
        return netBalance;
    } catch (err) {
        console.log("checkNativeCoinBalance", err);
        return 0;
    }
}

async function getTransactionByContractAddress(req, res) 
{
    try {
        const network = req.headers.chainlinks;
        let contractJsons = contractJson();
       
        if (network) {
            const contractAddress = req.body.contract_address;

            const web3 = new Web3(network);
            // const contract = new web3.eth.Contract(contractJsons, contractAddress);
            // console.log(contract)
            const getBlockNumber = await web3.eth.getBlockNumber();
            // console.log(getBlock)
            const block = await getBlockData(web3,getBlockNumber);
            // const tx = await getTransactionsByAccount(web3,contractAddress,getBlock, null);
            // console.log(tx);
            res.json({
                status: true,
                message: "get block",
                data: {
                    blockNumber: getBlockNumber,
                    block: block,
                    
                }
            });
            
        } else {
            res.json({
                status: false,
                message: "No chain provided",
                data: {}
            });
        }
    } catch(e) {
        res.json({
            status: false,
            message: e.message
        });
    }
}

async function getBlockData(web3,blockNumber)
{
    try {
        const block = await web3.eth.getBlock(blockNumber)
        if (block) {
            return {
                status: true,
                message: 'success',
                data: block
            };
        } else {
            return {
                status: false,
                message: 'failed',
                data: {}
            };
        }

    } catch (e) {
        console.log(e);
    }
}

async function getTransactionsByAccount(web3,myaccount, endBlockNumber,startBlockNumber) 
{
    
    try {
        console.log("Using endBlockNumber: " + endBlockNumber);

        if (startBlockNumber == null) {
          startBlockNumber = endBlockNumber - 5;
        //   console.log("Using startBlockNumber: " + startBlockNumber);
        }
        // console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);
      
        let tx = [];
        for (let i = startBlockNumber; i <= endBlockNumber; i++) {
            // console.log(startBlockNumber +' '+ endBlockNumber)
          if (i % 1000 == 0) {
            console.log("Searching block " + i.toString());
          }
       
          let block = await web3.eth.getBlock(i);
        //   console.log(block);
          if (block != null && block.transactions != null) {
            block.transactions.forEach(async function(e) {
               let trx = await web3.eth.getTransactionReceipt(e)
               console.log(trx)
            //   if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
            //       tx.push(e);
            //     console.log("  tx hash          : " + e.hash + "\n"
            //       + "   nonce           : " + e.nonce + "\n"
            //       + "   blockHash       : " + e.blockHash + "\n"
            //       + "   blockNumber     : " + e.blockNumber + "\n"
            //       + "   transactionIndex: " + e.transactionIndex + "\n"
            //       + "   from            : " + e.from + "\n" 
            //       + "   to              : " + e.to + "\n"
            //       + "   value           : " + e.value + "\n"
            //       + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
            //       + "   gasPrice        : " + e.gasPrice + "\n"
            //       + "   gas             : " + e.gas + "\n"
            //       + "   input           : " + e.input);
            //   }
            })
          }
        }
    } catch(err) {
        console.log('exception' +err.message);
    }
    
  }

async function getLatestEvents(req, res)
{
  try {
      const network = req.headers.chainlinks;
      const networkType = req.headers.networktype;
      let decimalValue = 18;
      if (network) {
        if (parseInt(networkType) == 6) {
            await trc20Token.getTrc20LatestEvent(req,res);
        } else {
            
            let contractJsons = contractJson();
            let prevBlock = 1000;
            const contractAddress = req.body.contract_address;
            const numberOfBlock = req.body.number_of_previous_block;
            const lastBlockNumber = req.body.last_block_number;

            const web3 = new Web3(new Web3.providers.HttpProvider(network));
            const contract = new web3.eth.Contract(contractJsons, contractAddress);
            decimalValue = await getContractDecimal(contract);
            
            const latestBlockNumber = await web3.eth.getBlockNumber();
            if (numberOfBlock) {
                prevBlock = numberOfBlock;
            }
            let fromBlockNumber = latestBlockNumber - prevBlock;

            if (lastBlockNumber > 0) {
                if ((latestBlockNumber - lastBlockNumber) > 5000) {
                    fromBlockNumber = latestBlockNumber - prevBlock;
                } else {
                    fromBlockNumber = lastBlockNumber;
                }
            } 
            const result = await getBlockDetails(contract,fromBlockNumber,latestBlockNumber);
            
          if (result.status === true) {
              let resultData = [];
              result.data.forEach(function (res) {
                  let innerData = {
                      event: res.event,
                      signature: res.signature,
                      contract_address: res.address,
                      tx_hash: res.transactionHash,
                      block_hash: res.blockHash,
                      from_address: res.returnValues.from,
                      to_address: res.returnValues.to,
                      amount: customFromWei(res.returnValues.value,decimalValue),
                      block_number: res.blockNumber,
                      block_timestamp: 0
                  };
                  resultData.push(innerData)
              });
              res.json({
                  status: true,
                  message: result.message,
                  data: {
                      result: resultData,
                  }
              });
          } else {
              res.json({
                  status: false,
                  message: result.message,
                  data: {}
              });
          }
        }
      } else {
          res.json({
              status: false,
              message: "No chain provided",
              data: {}
          });
      }
  } catch (e) {
      console.log("getLatestEvents ex");
      console.log(e);
      res.json({
          status: false,
          message: e.message
      });
  }
}
async function getBlockDetails(contract,fromBlockNumber,toBlockNumber)
{
  try {
      const response = await contract.getPastEvents("Transfer",
          {
              fromBlock: fromBlockNumber,
              toBlock: toBlockNumber // You can also specify 'latest'
          });
          // .then(events => {
          //     console.log(events)
          //         return {
          //             status: true,
          //             message: " block details",
          //             data: {event: events}
          //         };
          //     }
          // )
          // .catch((err) => {
          //     return {
          //         status: false,
          //         message: err.message,
          //         data: {}
          //     }
          // });

      if (response && response.length > 0) {
          return {
              status: true,
              message: "found block details",
              data: response
          };
      } else {
          return {
              status: false,
              message: "nodatafound",
              data: []
          };
      }
  } catch (e) {
      return {
          status: false,
          message: e.message,
          data:[]
      }
  }
}

async function checkEstimateGas()
{
    
}
async function getContractDetails(req, res)
{
    try {
        const network = req.headers.chainlinks;
        let contractJsons = contractJson();

        if (network) {
            const contractAddress = req.body.contract_address;
            const address = req.body.address;

            let symbol = '';
            let name = '';
            let tokenBalance = 0;
            let tokenDecimal = 18;
            const web3 = new Web3(network);
            const netID = await web3.eth.net.getId();
            if (contractAddress) {
                const contractInstance = new web3.eth.Contract(contractJsons, contractAddress);
                 symbol = await contractInstance.methods.symbol().call();
                 name = await contractInstance.methods.name().call();
                 tokenDecimal = await contractInstance.methods.decimals().call();

                if (address) {
                     tokenBalance = await contractInstance.methods.balanceOf(address).call();
                     tokenBalance = customFromWei(tokenBalance, tokenDecimal);
                 }

            } else {
                res.json({
                    status: false,
                    message: "Contract address required",
                    data: {}
                });
            }

            const data = {
                chain_id : netID,
                symbol : symbol,
                name : name,
                token_balance : tokenBalance,
                token_decimal : tokenDecimal
            }

            res.send({
                status: true,
                message: "process successfully",
                data: data
            });

        } else {
            res.json({
                status: false,
                message: "No chain provided",
                data: {}
            });
        }
    } catch(e){
        res.json({
            status: false,
            message: e.message,
            data: {}
        });
    }
}

async function getAddressFromPK(req, res) {
  try {
    const networkType = req.headers.networktype;
    
    if (parseInt(networkType) == 6) {
      await trxToken.getTrxAddressByPk(req, res);
    } else {
      const response = await getETHAddressFromPk(req);
      res.send({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    }
  } catch (e) {
    res.send({
      status: false,
      message: e.message,
      data: {},
    });
  }
}

// get erc20 address data
async function getETHAddressFromPk(req) {
  try {
    const network = req.headers.chainlinks;
    const pk = req.body.contracts;
    const web3 = new Web3(network);
    
    const response = await web3.eth.accounts.privateKeyToAccount(pk);
    if (response) {
      return {
        status: true,
        message: "Get address success",
        data: {
          address: response.address,
        },
      };
    } else {
      return {
        status: false,
        message: "Get address failed",
        data: {},
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: false,
      message: String(err),
      data: {},
    };
  }
}

async function testBitgo(req, res){

    try{
        res.send('s');

    }catch (err) {
        console.log(err);
        return {
          status: false,
          message: String(err),
          data: {},
        };
    }
}

module.exports = {
  getData,
  generateAddress,
  getWalletBalance,
  sendEth,
  sendToken,
  checkEstimateGasFees,
  getTransactionByContractAddress,
  getDataByTransactionHash,
  getLatestEvents,
  getContractDetails,
  getAddressFromPK,
  testBitgo
};