import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
  Min,
  Max,
} from 'class-validator';
import { Month } from 'src/constants/schedule.enum';
import { UserEntity } from 'src/users/entities/users.entity';
import { WorkPlacesEntity } from 'src/workplaces/entities/workPlaces.entity';
import { BeforeInsert, BeforeUpdate } from 'typeorm';
import { WorkScheduleEntity } from '../entities/workSchedule.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WorkScheduleDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Month)
  month: Month;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(31)
  dayOfWeek: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  startTime: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  endTime: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  startWorking: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  endWorking: string;
}

export class UpdateWorkScheduleDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  dayOfWeek: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  startTime: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  endTime: string;
}

export class UserSchedulePlaceDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Month)
  month: Month;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  workPlace: WorkPlacesEntity;
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  user: UserEntity;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(31)
  dayOfWeek: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  startTime: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  endTime: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  startWorking: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  endWorking: string;
}
export class SchedulePutDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  ScheduleID: WorkScheduleEntity;
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(Month)
  month: Month;
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  workPlace: WorkPlacesEntity;
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  user: UserEntity;
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(31)
  dayOfWeek: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  startTime: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  endTime: string;
  @BeforeInsert()
  @BeforeUpdate()
  validateDayOfMonth: () => void;
}
export class StartOrEndingWorkDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  startWorking: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  endWorking: string;
  @BeforeInsert()
  @BeforeUpdate()
  validateDayOfMonth: () => void;
}
export class GetFilterScheduleDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Month)
  month: Month;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  year: number;
}
