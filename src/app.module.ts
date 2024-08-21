import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SyngeneReportsModule } from './syngene-reports/syngene-reports.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    DatabaseModule,
    AuthModule,
    SyngeneReportsModule,
  ],

})
export class AppModule { }
