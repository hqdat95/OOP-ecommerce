import Joi from 'joi';

// Regular expression for password validation
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

class UserValidator {
  // Schema for user validation
  static userSchema = Joi.object({
    fullName: Joi.string().min(6).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required().pattern(passwordRegex),
    role: Joi.string().valid('admin', 'customer').default('customer'),
  });

  // Validate the given data against the provided schema
  static validate(schema, data) {
    const { error, value } = schema.validate(data);

    if (error) {
      throw new Error(error.details[0].message);
    }

    return value;
  }

  // Validate registration data using the userSchema
  static validateRegister(data) {
    return UserValidator.validate(UserValidator.userSchema, data);
  }

  // Validate update data with a schema containing only the fullName field
  static validateUpdate(data) {
    const updateSchema = Joi.object({
      fullName: UserValidator.userSchema.extract('fullName'),
    });
    return UserValidator.validate(updateSchema, data);
  }
}

export default UserValidator;
