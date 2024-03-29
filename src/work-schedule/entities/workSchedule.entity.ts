import { IWorkSchedule } from '../../interface/workSchedule.interface';
import { BaseEntity } from '../../config/base.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/users.entity';
import { WorkPlacesEntity } from '../../workplaces/entities/workPlaces.entity';
import { Month } from '../../constants/schedule.enum';

@Entity({ name: 'workSchedule' })
export class WorkScheduleEntity extends BaseEntity implements IWorkSchedule {
  @Column({ type: 'enum', enum: Month })
  month: Month;
  @Column()
  year: number;
  @Column()
  dayOfWeek: number;
  @Column()
  startTime: string;
  @Column()
  endTime: string;
  @Column({ nullable: true })
  startWorking: string;
  @Column({ nullable: true })
  endWorking: string;
  @ManyToOne(() => UserEntity, (user) => user.workSchedules)
  user: UserEntity;

  @ManyToOne(() => WorkPlacesEntity, (workPlaces) => workPlaces.workSchedules)
  workPlace: WorkPlacesEntity;

  @BeforeInsert()
  @BeforeUpdate()
  validateDayOfMonth() {
    if (this.dayOfWeek < 1 || this.dayOfWeek > 31) {
      throw new Error('dayOfWeek must be between 1 and 31');
    }
  }
}
