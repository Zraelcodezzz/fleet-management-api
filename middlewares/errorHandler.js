
const errorHandler = (err, req, res, next) => {
    // Log the error for debugging
    console.error(err);
  
    // Determine the status code based on the error type
    let statusCode = 500; // Default to Internal Server Error
    let message = 'An unexpected error occurred';
  
    if (err.name === 'SequelizeValidationError') {
      // Handle Sequelize validation errors
      statusCode = 400; // Bad Request
      message = err.errors.map((error) => error.message).join(', ');
    } else if (err.name === 'NotFoundError') {
      // Handle not found errors (custom error type)
      statusCode = 404; // Not Found
      message = err.message || 'Resource not found';
    } else if (err.statusCode) {
      // Handle errors with predefined status code
      statusCode = err.statusCode;
      message = err.message || message;
    }
  
    // Response structure
    const errorResponse = {
      status: 'error',
      statusCode,
      message,
    };
  
    // Send the error response
    res.status(statusCode).json(errorResponse);
  };
  
  export default errorHandler;
  