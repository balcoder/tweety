// if we don't make it to the 404 on index.js we found a route but something
// went wrong on the server so we generate a 500 (internal sever error)
function errorHandler(error, request, response, next) {
  return response.status(error.status || 500).json({    
    error: {
      message: error.message   || "We have a Server error."
    }
  })
}

module.exports = errorHandler;


