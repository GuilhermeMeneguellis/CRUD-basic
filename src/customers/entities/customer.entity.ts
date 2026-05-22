import { ApiProperty } from '@nestjs/swagger';

export class Customer {
  @ApiProperty({ example: 'cus_0001' })
  id: string;

  @ApiProperty({ example: 'Ana Souza' })
  name: string;

  @ApiProperty({ example: 'ana.souza@email.com' })
  email: string;

  @ApiProperty({ example: '+55 11 99999-9999' })
  phone: string;

  @ApiProperty({ example: 'Sem cebola', required: false })
  notes?: string;

  @ApiProperty({ example: '2026-05-22T12:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2026-05-22T12:00:00.000Z' })
  updatedAt: string;
}
