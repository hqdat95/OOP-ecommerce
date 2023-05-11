import ErrorHandler from '../helper/error.helper';
import UserValidation from '../utils/validator.util';

class ValidateSchema {
  static validate(schemaFunction) {
    // Middleware function to validate the request body against the provided schema
    return (req, res, next) => {
      try {
        const { error } = schemaFunction(req.body);

        if (error) {
          // If there is an error in the validation, throw a custom error with status code 422
          throw new ErrorHandler(error, 422);
        }

        // If the validation is successful, pass control to the next middleware
        next();
      } catch (err) {
        // Pass any caught error to the error handling middleware
        next(err);
      }
    };
  }

  // Middleware function to validate registration data using the validateRegister schema
  static validateRegister = ValidateSchema.validate(UserValidation.validateRegister);

  // Middleware function to validate update data using the validateUpdate schema
  static validateUpdate = ValidateSchema.validate(UserValidation.validateUpdate);
}

export default ValidateSchema;
