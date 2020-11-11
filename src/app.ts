import express, { NextFunction, Request, Response, Router } from "express";
import path from "path";
const app = express();
const router = Router();
const rateLimit = require("express-rate-limit");
const agMarketNewRoutes = require("./routes/ag-market-news");
import { PRIVACY } from "./static/privacy";
require("dotenv").config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 100, // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);
app.use(errorHandler);
app.use(router);
//main routes

app.use("/api/ag-market-news", agMarketNewRoutes);

app.get("/ag-market-news/privacy", function (req, res) {
  res.send(PRIVACY);
});

app.get("/ag-market-news/support", function (req, res) {
  res.send(`<h1>Support</h1><br/>
  <p>Please email me with any feedback or questions:</p>
  <a href="mailto:josephtoeniskoetter@gmail.com?subject=Ag Market News Feedback">Send me an Email!</a>`);
});

//404 handler
app.get("*", (req: Request, res: Response) => {
  res.status(404).json({
    message: "Not Found",
  });
});

//default error handler
function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.json({ error: err.message });
}

export default app;
