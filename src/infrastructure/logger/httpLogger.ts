import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {

  const start = Date.now();

  // Capture response body
  const originalJson = res.json;

  let responseBody: unknown;

  res.json = function (body: unknown) {
    responseBody = body;
    return originalJson.call(this, body);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info("HTTP Transaction", {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      request: {
        params: req.params,
        query: req.query,
        body: req.body,
      },
      response: responseBody
    });
  });

  next();
};
