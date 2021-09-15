import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { EventService } from '../../services';
import { Event } from '../../entities';
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
    @Body() { name, latitude, longitude, description },
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

  @Put(':id/update')
  async update(
    @Param() { id },
    @Body() { name, latitude, longitude, description },
  ): Promise<Event> {
    await this.eventService.update(id, {
      name,
      slug: createSlug(name),
      latitude,
      longitude,
      description,
    });

    const event = await this.eventService.findOne(id);

    return event;
  }

  @Delete(':id/delete')
  async delete(@Param() { id }): Promise<{ eventId: number; message: string }> {
    await this.eventService.delete(id);

    return { eventId: id, message: 'Event deleted successfully' };
  }
}
