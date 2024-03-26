import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { Request } from 'express'; 

export default async <ClassT>(cls:ClassConstructor<ClassT>,req:Request):Promise<ClassT>=>{
   const instanc: ClassT = plainToInstance( cls, req.body);
   const inputError: ValidationError[] = await validate(instanc as object, { validationError: { target: true } });
   if (inputError.length > 0) {
      throw inputError
   }
   return instanc
}
