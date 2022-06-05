function errorHandler(res, statusCode, msgCode) {
  const errorsMsg = {
    400: {
      4001: 'Bad Request Error - format error',
      4002: 'Bad Request Error - syntax error',
      4003: 'Bad Request Error - ID not found',
    },
    404: 'Not Found',
    405: 'Method Not Allowed',
  };
  let message = '';
  if(msgCode) {
    message = errorsMsg[statusCode][msgCode];
  } else {
    message = errorsMsg[statusCode];
  }
  res
    .status(statusCode)
    .send({
      status: false,
      message
    })
    .end();
}

module.exports = errorHandler;
