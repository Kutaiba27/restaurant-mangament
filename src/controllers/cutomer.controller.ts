/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import Stripe from "stripe";
import { validate, ValidationError } from "class-validator";
import { CreateCustomerDto, CustomerPayload, EditCustomerDto, LoginCustomer } from "../dto/customer.dto";
import { CustomerDoc, CustomerModel } from "../model/customer.model";
import { GenerateOtp, onRequestOtp } from "../utility/notification";
import { GeneratePassword, GenerateSult, VirfyPassword } from "../utility/PasswordUtility";
import { OrderDoc, OrderModel } from "../model/order.model";
import { GeneratSignature } from "../utility/JWTUtility";
import validationDTO from "../utility/validationDto";

export const customerSingIn = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const customerInput: CreateCustomerDto = await validationDTO<CreateCustomerDto>(CreateCustomerDto,req) 
      const customerExisting: CustomerDoc | null = await CustomerModel.findOne({ email: customerInput.email })
      if (customerExisting) return res.status(400).json({ message: " the user regestier with previes email" })
      const { otp, expire } = GenerateOtp()
      customerInput.otp = otp;
      customerInput.otp_expire = expire;
      customerInput.salt = await GenerateSult();
      customerInput.password = await GeneratePassword(customerInput.password, customerInput.salt)
      const customer: CustomerDoc = await CustomerModel.create(customerInput)
      const otprespons = await onRequestOtp(customerInput.otp, customerInput.phone)
      console.log(otprespons)
      const token = GeneratSignature<CustomerPayload>({
         _id: customer._id.toString(),
         firstName: customer.firstName,
         email: customer.email,
         verified: customer.verified
      })

      res.status(201).json({ status: "success", data: customer, token })
   } catch (error) {
      next(error)
   }
}
export const customerLogIn = async (req: Request, res: Response) => {
   try {
      const customerInput:LoginCustomer = await validationDTO<LoginCustomer>(LoginCustomer,req) 
      const customer: CustomerDoc | null = await CustomerModel.findOne({ email: customerInput.email })
      if (!customer) return res.status(404).json({ message: "the customer not found" })
      const valitdatePasswrod: boolean = VirfyPassword(customerInput.password, customer.password)
      if (!valitdatePasswrod) return res.status(400).json({ message: "email or password is not currect" })
      const token = GeneratSignature<CustomerPayload>({
         email: customer.email,
         _id: customer._id,
         verified: customer.verified,
         firstName: customer.firstName
      })
      res.cookie("token", token)
      return res.status(200).json({ message: "login successfully",token })
   } catch (e) {
      if( e instanceof ValidationError) {
         return res.status(500).json({ message:e})
      }
      res.status(400).json({ message: e })
   }
}
export const customerVerify = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const profile: CustomerDoc = await CustomerModel.findById(req.user?._id) as CustomerDoc
      if (profile?.otp == parseInt(req.body.otp) && profile.otp_expire >= new Date()) {
         profile.verified = true;
         await profile.save();
         const signeture: string = GeneratSignature<CustomerPayload>({
            _id: profile._id,
            verified: true,
            firstName: profile.firstName,
            email: profile.email
         })
         res.cookie("token", signeture)
         return res.status(200).json({ message: "veryfied successfuly", data: { signeture } })
      }
      return res.status(400).json({ message: "the otp not valid or expierd" })
   } catch (error) {
      next(error)
   }
}
export const requestOpt = async (req: Request, res: Response, next: NextFunction) => {
   const customer = req.user;
   if (customer) {
      const profile = await CustomerModel.findById(customer._id);
      if (profile) {
         const { otp, expire } = GenerateOtp();
         profile.otp = otp;
         profile.otp_expire = expire;
         await profile.save();
         const sendCode = await onRequestOtp(otp, profile.phone);
         if (!sendCode) {
            return res.status(400).json({ message: 'Failed to verify your phone number' })
         }
         return res.status(200).json({ message: 'OTP sent to your registered Mobile Number!' })
      }
   }
   return res.status(400).json({ msg: 'Error with Requesting OTP' });
}
export const getCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const customerInfo: CustomerDoc | null = await CustomerModel.findOne({ _id: req.user?._id })
      if (!customerInfo) return res.status(404).json({ message: "cusomer not found" })

      return res.status(200).json({ data: customerInfo })
   } catch (e) {
      return res.status(400).json({ message: e })
   }
}
export const editCusomerProfile = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const editInfo: EditCustomerDto = plainToInstance(EditCustomerDto, req.body)
      const validattion: ValidationError[] = await validate(editInfo, { validationError: { target: true } })
      if (validattion.length >= 0) return res.status(400).json({ message: validattion.values() })
      const updateCustomer: CustomerDoc | null = await CustomerModel.findOneAndUpdate(
         { _id: req.user?._id },
         { editInfo },
         { new: true })
      return res.status(201).json({ message: "updated successfully", data: updateCustomer })
   } catch (e) {
      next(e)
   }
}

export const createPaymet = async (req: Request, res: Response, next: NextFunction) => {
   const order = await OrderModel.findById(req.params.orderId).populate('cart') as OrderDoc
   const applicationFeePercentage = 5;
   const applicationFeeAmount = Math.round(order?.totalPrice * (applicationFeePercentage / 100));
   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
   const session = await stripe.checkout.sessions.create({
      line_items: [
         {
            price_data: {
            currency: 'usd',
            product_data: {
               name: "your order ",
               description: "this is description discribed you order",
            },
            unit_amount: order?.totalPrice * 100,
            },
            quantity: 1,
         },
      ],
      payment_method_types: ['card'],
      payment_intent_data: {
         application_fee_amount: applicationFeeAmount,
         capture_method:"automatic",
         transfer_data:{
            destination:"acct_1OwMFkJUGxgf6yPZ",
            amount: order?.totalPrice - applicationFeeAmount
         }
      },
      mode: 'payment',
      customer_email:req.user?.email,
      client_reference_id:order?._id,
      success_url: `${req.protocol}://${req.get('host')}/order/orders`,
      cancel_url: `${req.protocol}://${req.get('host')}/order/order/${req.params.orderId}`,
   });

   res.status(200).json({data: session})
}

export const webHook = async (req: Request, res: Response) => {
   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
   const sig = req.headers['stripe-signature'];
   let event;
   try {
      event = stripe.webhooks.constructEvent(req.body, sig as string | string[], "webhokekey");
      console.log(event)
   } catch (err) {
      res.status(400).send(`Webhook Error: ${err}`);
      return;
   }
}

