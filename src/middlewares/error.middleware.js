class ErrorHandler {
  async handle(err, req, res, next) {
    // Set default error message and status code if not provided
    err.message = err.message || 'Internal Server Error';
    err.statusCode = err.statusCode || 500;

    // Send error response with status code and error message
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }
}

export default new ErrorHandler();
