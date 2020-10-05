const express = require("express");
const router = require("express").Router();
const fetch = require("node-fetch");
const request = require("request");
require("dotenv").config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

router.get("/report/:id", async (req, res, next) => {
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

router.get("/commodities", async (req, res, next) => {
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

router.get("/commodities/:id", async (req, res, next) => {
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

router.get("/offices", async (req, res, next) => {
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

router.get("/offices/:id", async (req, res, next) => {
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

router.get("/market-types", async (req, res, next) => {
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

router.get("/market-types/:id", async (req, res, next) => {
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

router.get("/reports", async (req, res) => {
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

module.exports = router;
