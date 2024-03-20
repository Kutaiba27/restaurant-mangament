
export class ApiError extends Error {
   public status: string;
   constructor(
      public message: string,
      public statusCode: number
   ) {
      super(message);
      this.status = `${this.statusCode}`.startsWith('4')?"fail" : "error"
   }
}