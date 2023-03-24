import { Month } from 'src/constants/schedule.enum';

export interface IWorkSchedule {
  month: Month;
  year: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  startWorking: string;
  endWorking: string;
}
