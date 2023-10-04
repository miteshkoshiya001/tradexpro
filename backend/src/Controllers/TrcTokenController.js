const { powerOfTen, tronWebCall, checkTx } = require("../Heplers/helper");
const TronGrid = require('trongrid');
const axios = require('axios');
const { response } = require("express");

// get trc20 token  balance
async function getTrc20TokenBalance(req, res) {
    try {
        console.log('check trc20 address balance');
        const contract_address = req.body.contract_address;
        
        if (contract_address) {
            const tronWeb = tronWebCall(req,res);
            // const adminAccount = req.body.admin_address;
            tronWeb.setAddress(req.body.address);
            contract = await tronWeb.contract().at(contract_address);
            const address = req.body.address;
            
            const response = await contract.balanceOf(address).call();
            const decimal = await contract.decimals().call();
            const getDecimal = powerOfTen(decimal);
            console.log(getDecimal);

            const balance = (tronWeb.BigNumber(response._hex) / getDecimal);
                
            console.log(balance);
            return {
                status: true,
                message: "Get TRC20 token balance",
                data: balance
            };
        } else {
            return {
                status: false,
                message: "Contract address is required",
                data: {}
            };
        }
        
    } catch(err){
        return {
            status: false,
            message: String(err),
            data: {}
        };
    }
}

// send custom trc20 token
async function sendTrc20Token(req, res) {
    const tronWeb = tronWebCall(req,res);
    try {
        console.log('send trc20 token process');
        
        const contractAddress = req.body.contract_address;
        const receiverAddress = req.body.to_address;
        
        const privateKey = req.body.contracts;
        let amount = req.body.amount_value;

        tronWeb.setPrivateKey(privateKey);
        contract = await tronWeb.contract().at(contractAddress);
        const decimalValue = await contract.decimals().call();
        const getDecimal = powerOfTen(decimalValue);
        amount = parseInt(Number(amount) * getDecimal);
        console.log(req.body.amount_value);
        console.log(Number(req.body.amount_value));
        console.log(amount);

        const transaction = await contract.transfer(receiverAddress,BigInt(amount.toString())).send();
        console.log(transaction);
        if (transaction) {
            const success = await checkTx(tronWeb,transaction);
            tronWeb.defaultPrivateKey = false;
            if (success) {
                res.json({
                    status: true,
                    message: "Transaction successful",
                    data: {
                        hash: transaction,
                        used_gas: 0
                    }
                });
            } else {
                res.json({
                    status: false,
                    message: "Transaction failed. txid = ".transaction,
                    data: {
                        hash: transaction,
                        used_gas: 0
                    }
                });
            }
        } else {
            tronWeb.defaultPrivateKey = false;
            res.json({
                status: false,
                message: "Transaction failed",
                data: transaction
            });
        }
        
    } catch(err){
        tronWeb.defaultPrivateKey = false;
        console.log(err)
        res.json({
            status: false,
            message: String(err),
            data: {}
        });
    }
}

// monitor transfer event
async function getTrc20TransferEvent(req, res)
{
    try {
        console.log('check trc20 transfer event');
        const contractAddress = req.body.contract_address;
        
        const tronWeb = tronWebCall(req,res);
        const adminAccount = req.body.admin_address;
        tronWeb.setAddress(adminAccount);

        contract = await tronWeb.contract().at(contractAddress);
        console.log(contractAddress);
        
        const decimal = await contract.decimals().call();
        const getDecimal = powerOfTen(decimal);
        console.log(getDecimal);
        contract.Transfer().watch((err, event) => {
            // console.log(err);
            if (err) return console.error(`USDT Transfer event error: ${err.toString()}`);
            
            if (event) {
            // console.log(event);
                event.result.to = tronWeb.address.fromHex(event.result.to);
                event.result.from = tronWeb.address.fromHex(event.result.from);
                
                event.result.value = event.result.value / getDecimal;
                console.log(event);
                // helpers.makeRequest(process.env.USDT_NOTIFY_URL, 'POST', headers, event)
                //     .catch((err) => console.error(`makeRequest: ${err.toString()}`));
                res.json({
                    status: true,
                    message: 'success',
                    data: event
                });
            }
        });
    } catch(err){
        console.log(err);
        res.json({
            status: false,
            message: String(err),
            data: {}
        });
    }
}

// get trc20 latest transaction
async function getTrc20LatestEvent(req, res)
{
    return tornWebTransactionListByContractAddress(req, res)
    try { 
        const contractAddress = req.body.contract_address;
        const tronWeb = tronWebCall(req,res);
        const adminAccount = req.body.admin_address;
        tronWeb.setAddress(adminAccount);
        contract = await tronWeb.contract().at(contractAddress);
        // var min_timestamp = Number(argv.last_timestamp) + 1; //this is stored for the last time i ran the query
        const decimal = await contract.decimals().call();
        const getDecimal = powerOfTen(decimal);

        const tronGrid = new TronGrid(tronWeb);
        
        var result = await tronGrid.contract.getEvents(contractAddress, {
          only_confirmed: true,
          event_name: "Transfer",
          limit: 200,
          // min_timestamp: min_timestamp,
          order_by: "timestamp,desc",
        });
        let transactionData = [];
        if (result.data.length > 0) {
            result.data.map(tx => {
                tx.from_address = tronWeb.address.fromHex(tx.result.from); // this makes it easy for me to check the address at the other end
                tx.to_address = tronWeb.address.fromHex(tx.result.to); // this makes it easy for me to check the address at the other end
                tx.amount = (tx.result.value / getDecimal);
                tx.event = tx.event_name;
                tx.tx_hash = tx.transaction_id;
                transactionData.push(tx);
            });
        }
        // console.log(transactionData);
        
        return res.json({
            status: true,
            message: "Get TRC20 token transactions",
            data: {
                result: transactionData,
            } 
        });
    } catch(err){
        console.log(err)
        return res.json({
            status: false,
            message: String(err),
            data: {}
        });
    }
}

async function tornWebTransactionListByContractAddress(req, res){
    
    try{
        const contractAddress = req.body.contract_address;  //'TRwptGFfX3fuffAMbWDDLJZAZFmP6bGfqL'
        const adminAccount = req.body.admin_address;
        var lastTimeStamp = req.body.last_timestamp;
        const limit = 200;

        const tronWeb = tronWebCall(req,res);
        tronWeb.setAddress(adminAccount);
        const contract = await tronWeb.contract().at(contractAddress);

        const decimal = await contract.decimals().call();
        const getDecimal = powerOfTen(decimal);
        
        const tronGrid = new TronGrid(tronWeb);

        if(lastTimeStamp == 0)
        {
            var latestTransaction = await tronGrid.contract.getEvents(contractAddress, {
                only_confirmed: true,
                event_name: "Transfer",
                limit: limit,
                order_by: "timestamp,desc",
            });
    
            console.log('current timestamp before set', lastTimeStamp);

            lastTimeStamp = latestTransaction.data[0].block_timestamp;

            console.log('current timestamp after set', lastTimeStamp);
        }
        

        var result = await tronGrid.contract.getEvents(contractAddress, {
            only_confirmed: true,
            event_name: "Transfer",
            limit: limit,
            order_by: "timestamp,asc",
            min_block_timestamp:lastTimeStamp
        });

        let transactionData = [];
        if (result.data.length > 0) {
            result.data.map(tx => {

                tx.from_address = tronWeb.address.fromHex(tx.result.from); // this makes it easy for me to check the address at the other end
                tx.to_address = tronWeb.address.fromHex(tx.result.to); // this makes it easy for me to check the address at the other end
                tx.amount = (tx.result.value / getDecimal);
                tx.event = tx.event_name;
                tx.tx_hash = tx.transaction_id;
                transactionData.push(tx);
                
            });
        }

        // res.send({result})

        const nextLink = result.meta.links?.next;

        if(result.meta.links)
        {
            transactionData = await hitNextLink(contractAddress,tronGrid,tronWeb,nextLink,transactionData,getDecimal,limit,lastTimeStamp);
        }
        console.log('transactionData.length',transactionData.length)

        // res.send({transactionData});
        return res.json({
            status: true,
            message: "Get TRC20 token transactions",
            data: {
                result: transactionData,
            } 
        });

    }catch(err){
        console.log(err)
        return res.json({
            status: false,
            message: String(err),
            data: {}
        });
    }
}

async function hitNextLink(contractAddress,tronGrid,tronWeb, nextLink, transactionData,getDecimal,limit, lastTimeStamp) {
    try {
        // console.log('axios call.....')
        var response;
        let recursiveStatus = true;
        // console.log('totalLimit',limit)

        if(limit >= 1000)
        {
            limit = 200;
            response = await tornGridApiCall(contractAddress,tronGrid,tronWeb,transactionData,lastTimeStamp,getDecimal,limit);
            

            transactionData = response.transactionData;
            nextLink = response.nextLink;
        }else{
           response = await axiosApiCall(tronWeb,nextLink, transactionData,getDecimal,recursiveStatus);
           
           limit +=200;
           
           transactionData = response.transactionData;
           nextLink = response.nextLink;
           recursiveStatus = response.recursiveStatus;
           lastTimeStamp = response.lastTimeStamp;
        }
        
        // console.log(recursiveStatus);
        
        if (recursiveStatus == true) {
            
            await hitNextLink(contractAddress,tronGrid,tronWeb, nextLink, transactionData,getDecimal,limit,lastTimeStamp); // Recursively call hitNextLink with the next link
        }

        return transactionData;
    } catch (error) {
      console.error('An error occurred:', error);
    }
}

async function tornGridApiCall(contractAddress,tronGrid,tronWeb,transactionData,lastTimeStamp,getDecimal,limit)
{
    var result = await tronGrid.contract.getEvents(contractAddress, {
        only_confirmed: true,
        event_name: "Transfer",
        limit: limit,
        order_by: "timestamp,asc",
        min_block_timestamp:lastTimeStamp
    });
    if (result.data.length > 0) {
        result.data.map(tx => {

            tx.from_address = tronWeb.address.fromHex(tx.result.from); // this makes it easy for me to check the address at the other end
            tx.to_address = tronWeb.address.fromHex(tx.result.to); // this makes it easy for me to check the address at the other end
            tx.amount = (tx.result.value / getDecimal);
            tx.event = tx.event_name;
            tx.tx_hash = tx.transaction_id;
            transactionData.push(tx);
            
        });
    }

    const nextLink = result.meta.links.next;

    return {transactionData, nextLink};
}

async function axiosApiCall(tronWeb,nextLink, transactionData,getDecimal,recursiveStatus)
{
    const response = await axios.get(nextLink);
    const result = response.data;
    var lastTimeStamp;
    
    if (result.data.length > 0) {
        
        for(let i = 0; i < result.data.length; i++ )
        {
            result.data[i].from_address = tronWeb.address.fromHex(result.data[i].result.from); // this makes it easy for me to check the address at the other end
            result.data[i].to_address = tronWeb.address.fromHex(result.data[i].result.to); // this makes it easy for me to check the address at the other end
            result.data[i].amount = (result.data[i].result.value / getDecimal);
            result.data[i].event = result.data[i].event_name;
            result.data[i].tx_hash = result.data[i].transaction_id;
            transactionData.push(result.data[i]);

            lastTimeStamp = result.data[i].block_timestamp;
        }
        
    }
    
    recursiveStatus = result.meta.links ? true: false;
    
    nextLink = result.meta.links?.next;

    return {transactionData, nextLink, recursiveStatus,lastTimeStamp};
}

module.exports = {
    getTrc20TokenBalance,
    sendTrc20Token,
    getTrc20TransferEvent,
    getTrc20LatestEvent,
    tornWebTransactionListByContractAddress
}