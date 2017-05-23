import { DayName } from './day-name';
import { Time } from './time';

export class WeekDay {
  dayName: DayName;
  departureTime?: Time;
  arrivalTime?: Time;
  active: boolean;
  nameAsString?: string;
}
