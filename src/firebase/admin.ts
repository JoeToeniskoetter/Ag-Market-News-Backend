import * as admin from "firebase-admin";
import { Report } from "../common/types";
require("dotenv").config();


const creds: string = process.env.JSON_FILE || "{}";

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(creds)),
  databaseURL: "https://ag-market-news-74525.firebaseio.com",
});

export async function notifySubscribers(report: Report) {
  try {
    await admin.messaging().send({
      topic: report.slug_name,
      notification: {
        body: report.report_title,
        title: "New Report Available",
      },
      data: {
        report: JSON.stringify(report),
      },
      android: {
        notification: {
          sound: "default",
          priority: "high",
        },
        priority: "high",
      },
    });
  } catch (e) {
    console.log(e);
  }
}
