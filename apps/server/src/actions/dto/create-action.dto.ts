import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

export class CreateActionDto {
  name: string;
  description?: string;

  // @ApiProperty({ required: false })
  // user?: User;
}
