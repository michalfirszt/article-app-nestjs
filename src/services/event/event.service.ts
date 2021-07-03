import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Event } from '../../entities';
import { getRepository } from 'typeorm';

export type CreateEventData = {
  name: string;
  slug: string;
  latitude: number;
  longitude: number;
  description: string;
};

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

  async create({
    name,
    slug,
    latitude,
    longitude,
    description,
  }: CreateEventData): Promise<number> {
    try {
      const insert = await getRepository(Event)
        .createQueryBuilder('event')
        .insert()
        .into(Event)
        .values({ name, slug, latitude, longitude, description })
        .execute();

      return insert.raw.insertId;
    } catch (error) {
      throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
    }
  }
}
