import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {

  /**
   * Add the properties to be updated here.
   * 
   * Remember that we're using no sql database, so be careful
   * with the properties you're updating.
   */
  
}
