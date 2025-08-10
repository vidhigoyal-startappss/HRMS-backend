import { Injectable, NestMiddleware } from "@nestjs/common";
import { PrometheusService } from "./prometheus.service";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class PrometheusMiddleware implements NestMiddleware {
  constructor(private readonly prometheusService: PrometheusService) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on("finish", () => {
      this.prometheusService.countRequest(
        req.method,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
        req.route?.path || req.path,
        res.statusCode,
      );
    });
    next();
  }
}
