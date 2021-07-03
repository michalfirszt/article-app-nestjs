import { IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  latitude: number;
  longitude: number;

  @IsString()
  description: string;
}
