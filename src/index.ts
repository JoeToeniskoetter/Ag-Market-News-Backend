import app from "./app";
import cron from "node-cron";
import fetch from "node-fetch";
import Report from "./db/models/Report";
import { Report as ReportType } from "./common/types";

const updateReportsAndNotifySubscribers = async () => {
  console.log("UPDATING REPORTS");
  const resp = await fetch(
    "https://marsapi.ams.usda.gov/services/v1.1/reports",
    {
      headers: {
        Authorization: `Basic ${process.env.API_KEY}`,
      },
    }
  );
  const reports = await resp.json();
  reports.forEach(async (report: ReportType) => {
    let reportFromDatabase = await Report.findOne({
      slug_name: report.slug_name,
    });

    //if report isn't in the database, then create a new one
    if (!reportFromDatabase) {
      let newReport = new Report(report);
      await newReport.save();
      return;
    }

    //if the report from API has a more recent publish date, update that report in the database
    if (
      Date.parse(report.published_date) >
      Date.parse(reportFromDatabase.published_date)
    ) {
      let updatedReport = await Report.findOneAndUpdate(
        { slug_name: report.slug_name },
        { published_date: report.published_date },
        { new: true }
      );

      //if report not updated then return from function
      //don't want to potentially notify users multiple times due to db issues
      if (!updatedReport) {
        return;
      }

      //if update is successful, then notify subscribers
      //notifySubscribers(updatedReport);
    }
  });
};

app.listen(process.env.PORT || "5000", () => {
  console.log("running!");
  //cron.schedule("*/30 * * * *", () => {
  //updateReportsAndNotifySubscribers();
  //});
});
