import mongoose from "mongoose";
import ReportSchema, { IReport } from "./models/Report";
// import NotificationSchema, { INotification } from "./models/Notification";

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${
    process.env.MONGODB_PASSWORD
  }@cluster0.v4pu5.mongodb.net/${
    process.env.NODE_ENV === "DEV" ? "test" : process.env.MONGODB_DATABASE
  }?retryWrites=true&w=majority`,
  { useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true }
);

export const Report = mongoose.model<IReport>("Report", ReportSchema);
// export const Notification = mongoose.model<INotification>(
//   "Notification",
//   NotificationSchema
// );

export default mongoose;
