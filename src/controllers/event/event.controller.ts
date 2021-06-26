import { Controller, Get, Param } from '@nestjs/common';
import { EventService } from '../../services';
import { Event } from '../../entities';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get('list')
  async list(): Promise<Event[]> {
    const events = await this.eventService.getEvents();

    return events;
  }

  @Get(':id')
  async show(@Param() { id }): Promise<Event> {
    const event = await this.eventService.findOne(id);

    return event;
  }
}
