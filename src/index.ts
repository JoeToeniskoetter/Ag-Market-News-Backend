import app from "./app";
import cron from "node-cron";
import fetch from "node-fetch";
import Report from "./db/models/Report";
import { Report as ReportType } from "./routes/ag-market-news";
import { notifySubscribers } from "./firebase/admin";

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
    let foundReport = await Report.findOne({ slug_name: report.slug_name });

    if (!foundReport) {
      let newReport = new Report(report);
      await newReport.save();
      return;
    }

    if (
      Date.parse(report.published_date) > Date.parse(foundReport.published_date)
    ) {
      let updatedReport = await Report.findOneAndUpdate(
        { slug_name: report.slug_name },
        { published_date: report.published_date },
        { new: true }
      );
      notifySubscribers(report.report_title, report.slug_name);
      // await notifySubscribers(report.report_title, report.slug_name);
      console.log("UPDATED REPORT: ", updatedReport);
    }
  });
};

app.listen(process.env.PORT || "5000", () => {
  console.log("running!");
  cron.schedule("*/30 * * * *", () => {
    updateReportsAndNotifySubscribers();
  });
});
