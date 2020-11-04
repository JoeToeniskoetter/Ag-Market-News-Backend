import express, { Router, Request, Response, NextFunction } from "express";
import fetch from "node-fetch";
import request from "request";
import { Report } from "../common/types";
import { IReport } from "../db/models/Report";
import { notifySubscribers } from "../firebase/admin";

const router = Router();
require("dotenv").config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// router.get("/testMessage", (req, res, next) => {
//   const x: Report = {
//     slug_id: "SJ_GR110",
//     slug_name: "AMS_2960",
//     report_title: "Arkansas Daily Grain Bids",
//     published_date: Date.now().toString(),
//     markets: [],
//     market_types: [],
//     offices: [],
//     sectionNames: [],
//   };
//   notifySubscribers(x);
//   res.json({msg:'sent'})
// });

router.get(
  "/report/:id",
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

router.get(
  "/commodities",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const url =
        "https://mymarketnews.ams.usda.gov/public_data/ajax-get-commodities/";
      const resp = await fetch(url);
      const json = await resp.json();
      res.json(json);
    } catch (e) {
      return next(e);
    }
  }
);

router.get(
  "/commodities/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comId = req.params.id;
      const url = `https://mymarketnews.ams.usda.gov/public_data/ajax-get-commodities/${comId}`;
      const resp = await fetch(url);
      const json = await resp.json();
      res.json(json);
    } catch (e) {
      return next(e);
    }
  }
);

router.get(
  "/offices",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const url =
        "https://mymarketnews.ams.usda.gov/public_data/ajax-get-offices/";
      const resp = await fetch(url);
      const json = await resp.json();
      res.json(json);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/offices/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comId = req.params.id;
      const url = `https://mymarketnews.ams.usda.gov/public_data/ajax-get-offices/${comId}`;
      const resp = await fetch(url);
      const json = await resp.json();
      res.json(json);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/market-types",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const url =
        "https://mymarketnews.ams.usda.gov/public_data/ajax-get-market-types/";
      const resp = await fetch(url);
      const json = await resp.json();
      res.json(json);
    } catch (e) {
      return next(e);
    }
  }
);

router.get("/market-types/:id", async (req: Request, res: Response, next) => {
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

router.get("/reports", async (req: Request, res: Response) => {
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
    const reduced = json.map((x: Report) => ({
      slug_name: x.slug_name,
      report_title: x.report_title,
    }));
    res.json(reduced);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
