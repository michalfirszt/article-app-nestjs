import { Injectable } from '@nestjs/common';
import { Event } from '../../entities';
import { getRepository } from 'typeorm';

@Injectable()
export class EventService {
  async getEvents(): Promise<{ [key: string]: Event }> {
    const events = await getRepository(Event)
      .createQueryBuilder('event')
      .getMany();

    return events.reduce(
      (list: { [key: string]: Event }, event: Event) => (
        (list[event.id] = event), list
      ),
      {},
    );
  }

  async findOne(id: number): Promise<Event> {
    const event = await getRepository(Event)
      .createQueryBuilder('event')
      .where('event.id = :id', { id })
      .getOne();

    return event;
  }
}
