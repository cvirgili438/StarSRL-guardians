import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { StatesARG } from 'src/constants/states';
import { StatesEntity } from 'src/states/entities/states.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class workPlacesDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  state: StatesEntity;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;
}

export class updateWorkPlacesDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  state: StatesEntity;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address: string;
}
export class ByNameDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
