import { Controller, Get, Param, Post, Query } from '@nestjs/common';

import { EventService } from '../../services';
import { Event } from '../../entities';
import { CreateEventDto } from './event.validation';
import { createSlug } from '../../utilities';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get('list')
  async list(): Promise<{ [key: string]: Event }> {
    const events = await this.eventService.getEvents();

    return events;
  }

  @Get(':id')
  async show(@Param() { id }): Promise<Event> {
    const event = await this.eventService.findOne(id);

    return event;
  }

  @Post('create')
  async create(
    @Query() { name, latitude, longitude, description }: CreateEventDto,
  ): Promise<Event> {
    const newEventId = await this.eventService.create({
      name,
      slug: createSlug(name),
      latitude,
      longitude,
      description,
    });
    const event = await this.eventService.findOne(newEventId);

    return event;
  }
}
