import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Ana Souza' })
  @IsString()
  @Length(2, 80)
  name: string;

  @ApiProperty({ example: 'ana.souza@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+55 11 99999-9999' })
  @IsString()
  @Length(8, 30)
  phone: string;

  @ApiProperty({ example: 'Sem cebola', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
