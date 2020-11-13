import * as admin from "firebase-admin";
import { Report } from "../common/types";
require("dotenv").config();

const creds: string = process.env.JSON_FILE || "{}";

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(creds)),
  databaseURL: "https://ag-market-news-74525.firebaseio.com",
});
export default admin;
export async function notifySubscribers(report: Report) {
  try {
    const res = await admin.messaging().send({
      topic: report.slug_name,
      notification: {
        body: report.report_title,
        title: "New Report Available",
      },
      data: {
        report: JSON.stringify(report),
      },
      apns: {
        payload: {
          aps: {
            sound: "default",
            contentAvailable: true,
          },
        },
      },
      android: {
        notification: {
          sound: "default",
          priority: "max",
        },
        priority: "high",
      },
    });
    // await admin.messaging().sendToTopic(report.slug_name, {
    //   data: {
    //     report: JSON.stringify(report),
    //   },
    //   notification: {
    //     sound: "default",
    //     body: report.report_title,
    //     title: "New Report Available",
    //   },
    // });
  } catch (e) {
    console.log(e);
  }
}
