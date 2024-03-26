import twilio from 'twilio'

export const GenerateOtp = ()=>{
   const otp = Math.floor(100000+Math.random()*900000)
   const expire = new Date()
   expire.setTime(new Date().getTime() + 30*60*1000)
   return {expire,otp}
}

export const onRequestOtp = async (otp:number, toPhoneNumber:string)=>{
   const accountId = process.env.TWILIO_SID
   const token= process.env.TWILIO_AUTH_TOKEN
   const client = twilio(accountId,token) 
   console.log(toPhoneNumber)
   const respons = await client.messages.create({
      body: `your otp is ${otp}`,
      from: "+17868297796",
      to: toPhoneNumber
   })
   return respons
}