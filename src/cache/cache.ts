import { Request, Response, NextFunction } from "express";
import { Requests } from "../db/db";

type cacheType = {
  initDate: number;
  [key: string]: string | number;
};

export const cache: cacheType = {
  initDate: Date.now(),
};

export function cacheResult(path: string, data: Object) {
  cache[path] = JSON.stringify(data);
}

export async function incrementRequest() {
  const now = new Date().toDateString();
  const foundRequestDate = await Requests.findOne({ date: now });

  if (!foundRequestDate) {
    console.log("didnt find req");
    const newR = new Requests();
    newR.date = now;
    newR.numberOfRequests = 1;
    return await newR.save();
  } else {
    console.log("found req");
    foundRequestDate.numberOfRequests++;
    await foundRequestDate.save();
  }
}

export function Cache(req: Request, res: Response, next: NextFunction) {
  incrementRequest();
  const ONE_HOUR = 60 * 60 * 1000;
  const now = Date.now();
  const expired = now - cache.initDate > ONE_HOUR;
  if (cache[req.originalUrl] && !expired) {
    return res.json(JSON.parse(cache[req.path] as string));
  } else {
    cache.initDate = Date.now();
  }
  next();
}
