const app = require("express")();
const fetch = require("node-fetch");
const request = require("request");
const rateLimit = require("express-rate-limit");
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

app.get("/report/:id", async (req, res, next) => {
  const repId = req.params.id;
  const pdfuri = `https://www.ams.usda.gov/mnreports/${repId}`;
  const resp = await fetch(pdfuri);
  if (resp.status === 200) {
    request(pdfuri, {
      rejectUnauthorized: false,
    }).pipe(res);
  } else {
    return next(resp.status);
  }
});

app.get("/commodities", async (req, res, next) => {
  try {
    const url =
      "https://mymarketnews.ams.usda.gov/public_data/ajax-get-commodities/";
    const resp = await fetch(url);
    const json = await resp.json();
    res.json(json);
  } catch (e) {
    return next(e);
  }
});

app.get("/commodities/:id", async (req, res, next) => {
  try {
    const comId = req.params.id;
    const url = `https://mymarketnews.ams.usda.gov/public_data/ajax-get-commodities/${comId}`;
    const resp = await fetch(url);
    const json = await resp.json();
    res.json(json);
  } catch (e) {
    return next(e);
  }
});

app.get("/offices", async (req, res, next) => {
  try {
    const url =
      "https://mymarketnews.ams.usda.gov/public_data/ajax-get-offices/";
    const resp = await fetch(url);
    const json = await resp.json();
    res.json(json);
  } catch (e) {
    next(e);
  }
});

app.get("/offices/:id", async (req, res, next) => {
  try {
    const comId = req.params.id;
    const url = `https://mymarketnews.ams.usda.gov/public_data/ajax-get-offices/${comId}`;
    const resp = await fetch(url);
    const json = await resp.json();
    res.json(json);
  } catch (e) {
    next(e);
  }
});

app.get("/market-types", async (req, res, next) => {
  try {
    const url =
      "https://mymarketnews.ams.usda.gov/public_data/ajax-get-market-types/";
    const resp = await fetch(url);
    const json = await resp.json();
    res.json(json);
  } catch (e) {
    return next(e);
  }
});

app.get("/market-types/:id", async (req, res, next) => {
  try {
    const comId = req.params.id;
    const url = `https://mymarketnews.ams.usda.gov/public_data/ajax-get-market-types/${comId}`;
    const resp = await fetch(url);
    const json = await resp.json();
    res.json(json);
  } catch (e) {
    return next(e);
  }
});

app.get("/reports", async (req, res) => {
  try {
    const resp = await fetch(
      "https://marsapi.ams.usda.gov/services/v1.1/reports",
      {
        headers: {
          Authorization: `Basic ${process.env.API_KEY}`,
        },
      }
    );
    const json = await resp.json();
    const reduced = json.map((x) => ({
      slug_name: x.slug_name,
      report_title: x.report_title,
    }));
    res.json(reduced);
  } catch (e) {
    res.send(e.message);
  }
});

app.get("*", (req, res, next) => {
  res.status(404).json({
    message: "Not Found",
  });
});

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err.message });
}

module.exports = app;
