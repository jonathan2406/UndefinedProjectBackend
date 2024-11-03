import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
    available_rockets?: number;
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
    rockets_received?: { [userid: string]: number };
    rockets_sent?: { [userid: string]: number };
  }