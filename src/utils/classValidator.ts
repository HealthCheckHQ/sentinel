import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';

/**
 * @name ValidationMiddleware
 * @description Allows use of decorator and non-decorator based validation
 * @param type dto
 * @param skipMissingProperties When skipping missing properties
 * @param whitelist Even if your object is an instance of a validation class it can contain additional properties that are not defined
 * @param forbidNonWhitelisted If you would rather to have an error thrown when any non-whitelisted properties are present
 */
export const validateObject = async (type: any, obj: any, skipMissingProperties = false, whitelist = true, forbidNonWhitelisted = true) => {
  const dto = plainToInstance(type, obj);
  try {
    await validateOrReject(dto, { skipMissingProperties, whitelist, forbidNonWhitelisted });
    return dto;
  } catch (errors) {
    let message = '';
    try {
      message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
    } catch (error) {
      message = errors.map((error: ValidationError) => error.toString()).join(',');
    }

    throw Error(message);
  }
};
