import * as admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY,
    projectId: process.env.PROJECT_ID,
  }),
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
      data: {},
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
