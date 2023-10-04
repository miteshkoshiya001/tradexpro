
const checkSecurity = (req, res, next) => {
    try {
        let headerKey = req.headers.headerkeys;
        let chainLink = req.headers.chainlinks

        if(headerKey && chainLink) {
            if (headerKey === process.env.APP_KEY) {
                next();
            } else {
                res.json({
                    status: false,
                    message: "Wrong key provided",
                    data: {}
                });
            }
           
        } else {
            console.log('Key not provided')
            res.status(201).send({
                status: false,
                message: "Key not provided",
                data: {}
            });
        } 

    } catch(e) {
        res.json({
            status: false,
            message: "Something went wrong",
            data: {}
        });
    }
}

module.exports = {
    checkSecurity,
}