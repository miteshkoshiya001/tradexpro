const { check, validationResult } = require("express-validator");

const CheckBalanceValidators = [
    check("type")
        .isLength({ min: 1})
        .withMessage("Type is required")
        .trim(),
    check("address")
        .isLength({ min: 1})
        .isString()
        .withMessage("Address is required")
        .trim(),
    
    check("contract_address")
        .isString()
        .withMessage("Address is required")
        .trim(),
];

const CheckBalanceValidatorHandler = function (req, res, next) 
{
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.json({
            error : mappedErrors
        })
    }
}

module.exports = {
    CheckBalanceValidators,
    CheckBalanceValidatorHandler
}