import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CompanyModule } from './company/company.module';
import { ConfigModule } from '@nestjs/config'; 
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AdminModule,
    UserModule,
    PostModule,
    CompanyModule,
    EmailModule,
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AppModule {}
