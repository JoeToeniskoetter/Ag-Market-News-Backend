import { Schema, Document } from "mongoose";

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

export default ReportSchema;
