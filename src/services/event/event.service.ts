import { Injectable } from '@nestjs/common';
import { Event } from '../../entities';
import { getRepository } from 'typeorm';

@Injectable()
export class EventService {
  async getEvents(): Promise<Event[]> {
    const events = await getRepository(Event)
      .createQueryBuilder('event')
      .getMany();

    return events;
  }

  async findOne(id: number): Promise<Event> {
    const event = await getRepository(Event)
      .createQueryBuilder('event')
      .where('event.id = :id', { id })
      .getOne();

    return event;
  }
}
