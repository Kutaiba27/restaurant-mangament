import { genSalt, hash, compareSync } from "bcryptjs"

export const GenerateSult = async () => {
   return await genSalt()
}

export const GeneratePassword = async (password:string, sult:string) => {
   return await hash(password,sult)
}

export const VirfyPassword = (enteredPassword: string, savedPassword: string): boolean => {
   return compareSync(enteredPassword, savedPassword)
}