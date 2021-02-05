import { Schema, Document } from "mongoose";

export interface IRequests extends Document {
  date: string;
  numberOfRequests: number;
}

const RequestSchema = new Schema({
  date: { unique: true, type: String },
  numberOfRequests: { type: Number },
});

export default RequestSchema;
