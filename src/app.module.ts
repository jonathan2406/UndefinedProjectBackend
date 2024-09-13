import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CompanyModule } from './company/company.module';
import { ConfigModule } from '@nestjs/config'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AdminModule,
    UserModule,
    PostModule,
    CompanyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
