const TronWeb =  require('tronweb');
const dotenv = require('dotenv');

dotenv.config();



function configTronWeb(req)
{
    const tronWeb = new TronWeb ({
        fullHost: req.host,
        headers: {
            "TRON-PRO-API-KEY": process.env.TRONGRID_API_KEY
        }
    });

    const response =  tronWeb.createAccount();
    return response;
}
module.exports = {
    configTronWeb
}