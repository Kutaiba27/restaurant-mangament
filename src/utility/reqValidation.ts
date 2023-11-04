import Joi, { ValidationErrorItem, ValidationResult, ObjectSchema  } from "joi";

export class ValidationException extends Error {
   public details: ValidationErrorItem[]
   constructor(details: ValidationErrorItem[]){
      super("there are an error with details");
      this.details = details;
   }
}

export const userSchema = Joi.object({
   name: Joi.string().required(),
   email: Joi.string().email().required(),
   password: Joi.string().required(),
})

export const hotalSchema = Joi.object({
   name: Joi.string().required(),
   country: Joi.string().required(),
   city: Joi.string().required(),
   type: Joi.string().required(),
   address: Joi.string().required(),
   image: Joi.array().items(Joi.string()).required(),
   desciption: Joi.string().required(),
})

export const roomSchema = Joi.object({
   price: Joi.number().required(),
   numberOfPeople: Joi.number().required(),
   roomNumber: Joi.number().required(),
   avilblity: Joi.boolean().required(),
   image:Joi.array().items(Joi.string()).required(),
   hotal: Joi.number().required(),
})

export function validation (JoiSchema:ObjectSchema, object:object ){
   const result: ValidationResult<unknown> = JoiSchema.validate(object)
   if(result.error){
      throw new ValidationException(result.error.details)
   }
}