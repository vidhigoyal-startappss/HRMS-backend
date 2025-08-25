import { Injectable } from "@nestjs/common";
import { number } from "joi";
import { set } from "mongoose";
import * as client from "prom-client";
import { updateResponse } from "src/leave/dto/apply-leave.dto";

@Injectable()
export class PrometheusService {
  private readonly register: client.Registry;
  private readonly httpRequestCounter: client.Counter;
  private readonly cpuUsageGauge: client.Gauge;
  private readonly memoryUsageGauge: client.Gauge;
  private readonly networkUsageCounter: client.Counter;

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



   this.cpuUsageGauge = new client.Gauge({
     name: "app_cpu_usage_percentage",
     help: "Current CPU usage percentage",
 });
   
    this.register.registerMetric(this.cpuUsageGauge);


 this.memoryUsageGauge = new client.Gauge({
  name: "app_memory_using_megabytes",
  help: "Amount of memory used by the app in MB",
 });

  this.register.registerMetric(this.memoryUsageGauge);


  this.networkUsageCounter = new client.Counter({
    name: "app_network_traffic_using",
    help: "Amount of resources used by the app",
    labelNames: ["method" , "route", "status_code"],
  });

  this.register.registerMetric(this.networkUsageCounter);

  }

  countRequest(method: string, route: string, statusCode: number) {
    this.httpRequestCounter.labels(method, route, statusCode.toString()).inc();
  }

  updateGauge(percentage: number) {
    this.cpuUsageGauge.set(percentage);
  }

   updateMemoryGauge(bytes: number) {
    const megabytes = bytes / (1024 * 1024); 
    this.memoryUsageGauge.set(megabytes);
  }

  updatenetworkGauge(method: string, route: string, statusCode: number) {
    this.networkUsageCounter.labels(method, route, statusCode.toString()).inc();
  }


  getMetrics(): string {
    return this.register.metrics();
  }

  getContentType(): string {
    return this.register.contentType;
  }
}
