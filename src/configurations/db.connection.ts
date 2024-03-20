import mongoose from "mongoose";

export const dbConnection:Promise<typeof mongoose> = mongoose.connect(process.env.MONGO_URL || "mongodb://127.0.0.1/online_foods")