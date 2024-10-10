import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
    available_lios?: number;
    bio?: string;
    company?: string;
    email?: string;
    name?: string;
    password?: string;
    profile_picture_url?: string;
    role?: string;
    username?: string;
    followers?: string[];
    following?: string[];
    groups?: string[];
    lios_received?: { [userid: string]: number };
    lios_sent?: { [userid: string]: number };
  }