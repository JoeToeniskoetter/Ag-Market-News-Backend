import * as admin from "firebase-admin";

var serviceAccount = require("/Users/JoeToeniskotter/Documents/projects/USDA-BACKEND/ag-market-news-74525-firebase-adminsdk-cxg6q-ab66c0b514.json");
///Users/JoeToeniskotter/Documents/projects/USDA-BACKEND/ag-market-news-74525-firebase-adminsdk-cxg6q-ab66c0b514.json

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ag-market-news-74525.firebaseio.com",
});

export async function notifySubscribers(
  reportTitle: string,
  slug_name: string
) {
  try {
    await admin.messaging().send({
      topic: slug_name,
      notification: {
        body: reportTitle,
        title: "New Report Available",
      },
      android: { notification: { sound: "default" } },
    });
  } catch (e) {
    console.log(e);
  }
}
