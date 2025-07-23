import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
async create(@Body() createEventDto: CreateEventDto) {
  return this.eventsService.createEvent(createEventDto);
}

  @Get()
  findAll(@Query('type') type?: string) {
    return this.eventsService.findAll(type);
  }

  @Get('today')
  findTodayEvents() {
    return this.eventsService.findTodayEvents();
  }
  @Post('type')
  async getEventsByType(@Body() body: { type: string }) {
    return this.eventsService.findByType(body.type);
  }
}
