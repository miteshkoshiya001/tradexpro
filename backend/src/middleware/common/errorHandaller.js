const createError = require('http-errors');

function notFoundHandler(req, res, next) {
    res.status(404).send({
      status: false,
      message: "Your requested content was not found",
      data: {}
  });
}

// function errorHandler(err, req, res, next) {
//     res.locals.error = 
//     process.env.NODE_ENV === "development" ? err : { message : err.message};

//     res.status(err.status || 500);

//     if(res.locals.html) {
//         res.render('error', {
//             title: 'Error Page'
//         });
//     } else {
//         res.json(res.locals.error);
//     }
    
// }

function errorHandler (err, req, res, next) {
    console.log('1')
    if (res.headersSent) {
      return next(err)
    }
    
    res.status(500).send({
      status: false,
      message: res.message,
      data: {}
  });
  }
  
  
  function clientErrorHandler (err, req, res, next) {
      
    if (req.xhr) {
      res.status(500).send({
        status: false,
        message: res.message,
        data: {}
    })
    } else {
      next(err)
    }
  }
  
  function logErrors (err, req, res, next) {
      console.log(3)
    console.error(err.stack)
    next(err)
  }

module.exports = {
    notFoundHandler,
    errorHandler,
    clientErrorHandler,
    logErrors
}