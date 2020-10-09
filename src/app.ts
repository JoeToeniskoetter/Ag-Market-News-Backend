import express, { NextFunction, Request, Response, Router } from "express";
const app = express();
const router = Router();
const rateLimit = require("express-rate-limit");
const agMarketNewRoutes = require("./routes/ag-market-news");
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

app.use("/api/ag-market-news", agMarketNewRoutes);

app.get("*", (req: Request, res: Response) => {
  res.status(404).json({
    message: "Not Found",
  });
});

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
  res.render("error", { error: err.message });
}

export default app;
