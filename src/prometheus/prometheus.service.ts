import { Injectable } from "@nestjs/common";
import * as client from "prom-client";

@Injectable()
export class PrometheusService {
  private readonly register: client.Registry;
  private readonly httpRequestCounter: client.Counter<string>;

  constructor() {
    this.register = new client.Registry();
    this.register.setDefaultLabels({ app: "nestjs-prometheus" });
    client.collectDefaultMetrics({ register: this.register });

    this.httpRequestCounter = new client.Counter({
      name: "http_requests_total",
      help: "Total number of HTTP requests",
      labelNames: ["method", "route", "status_code"],
    });

    this.register.registerMetric(this.httpRequestCounter);
  }

  countRequest(method: string, route: string, statusCode: number) {
    this.httpRequestCounter.labels(method, route, statusCode.toString()).inc();
  }

  getMetrics(): Promise<string> {
    return this.register.metrics();
  }

  getContentType(): string {
    return this.register.contentType;
  }
}
