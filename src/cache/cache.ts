import { Request, Response, NextFunction } from "express";

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

export function Cache(req: Request, res: Response, next: NextFunction) {
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
