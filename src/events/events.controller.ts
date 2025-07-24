import { Controller, Post, Body } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('today')
  async getTodayEventsByType(@Body('type') type: string) {
    return this.eventsService.getTodayEventsByType(type);
  }
}
