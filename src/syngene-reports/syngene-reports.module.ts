import { Module } from '@nestjs/common';
import { SyngeneReportsController } from './syngene-reports.controller';
import { SyngeneReportsService } from './syngene-reports.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserReportEntryExitProviders } from './providers/syngene-user-report';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    AuthModule,
    DatabaseModule,
  ],
  controllers: [
    SyngeneReportsController
  ],
  providers: [
    SyngeneReportsService,
    ...UserReportEntryExitProviders
  ],
})
export class SyngeneReportsModule {}
