import { Agency } from './agency';
import { Time } from './time';
import { WeekDay } from './week-day';

export class TransportSchedule {
  id: string;
  routeName: string;
  weekDays: Array<WeekDay>;
  frequency: Time;
  agency: Agency;
  creatorId: string;
  index?: number;
}
