import mongoose, { Schema, Document } from "mongoose";

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.v4pu5.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`,
  { useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true }
);

export interface IReport extends Document {
  slug_id: string;
  slug_name: string;
  report_title: string;
  published_date: string;
  markets: string[];
  market_types: string[];
  offices: string[];
  sectionNames: string[];
}

const ReportSchema = new Schema({
  slug_id: { type: String, required: true },
  slug_name: { type: String, required: true, unique: true },
  report_title: { type: String, required: true },
  published_date: { type: String, required: true },
  markets: { type: [String], required: true },
  market_types: { type: [String], required: true },
  offices: { type: [String], required: true },
  sectionNames: { type: [String], required: true },
});

export default mongoose.model<IReport>("Report", ReportSchema);
