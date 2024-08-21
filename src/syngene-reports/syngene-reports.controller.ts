import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SyngeneReportsService } from './syngene-reports.service';
import { EntryExitDTO } from './dtos/find-table';
import { AuthGuard } from '@nestjs/passport';

@Controller('syngene-reports')
@UseGuards(AuthGuard())
export class SyngeneReportsController {

    constructor(
        private readonly syngeneReportsService:SyngeneReportsService
    ) {}

    /* This code snippet is defining a GET endpoint in a NestJS controller. The endpoint is
    '/syngene-reports/getEntryExitData' and it is mapped to the `findAllData` method. This method
    takes a query parameter of type `EntryExitDTO` using the `@Query()` decorator. Inside the
    method, it calls the `findEntryExitDataService` method from the `SyngeneReportsService` class
    passing the query parameter. Finally, the result of this service method is returned as the
    response for this endpoint. */
    @Get('getEntryExitData')
    findAllData(@Query() query:EntryExitDTO) {

        return this.syngeneReportsService.findEntryExitDataService(query);

    }

    /* This code snippet defines a GET endpoint in a NestJS controller. The endpoint is
    '/syngene-reports/getGowningData' and it is mapped to the `getGowningAllData` method. This
    method takes a query parameter of type `EntryExitDTO` using the `@Query()` decorator. Inside the
    method, it calls the `findGowningReportService` method from the `SyngeneReportsService` class
    passing the query parameter. Finally, the result of this service method is returned as the
    response for this endpoint. */
    @Get('getGowningData')
    getGowningAllData(@Query() query:EntryExitDTO) {

        return this.syngeneReportsService.findGowningReportService(query);

    }

    /* This code snippet defines a GET endpoint in a NestJS controller. The endpoint is
    '/syngene-reports/getSubData' and it is mapped to the `getSyngeneSubAllData` method. This method
    takes a query parameter of type `EntryExitDTO` using the `@Query()` decorator. Inside the
    method, it calls the `findSyngeneSubData` method from the `SyngeneReportsService` class passing
    the query parameter. Finally, the result of this service method is returned as the response for
    this endpoint. */
    @Get('getSubData')
    getSyngeneSubAllData(@Query() query:EntryExitDTO) {

        return this.syngeneReportsService.findSyngeneSubData(query);

    }

    @Get('getAllSubUserData')
    getUserData(@Query() query:EntryExitDTO) {

        return this.syngeneReportsService.findSyngeneSubUser(query);

    }

    /* This code snippet defines a GET endpoint in a NestJS controller. The endpoint is
    '/syngene-reports/countActiveUsers' and it is mapped to the `getActiveUsers` method. */
    @Get('countActiveUsers')
    getActiveUsers() {

        return this.syngeneReportsService.calculateActiveUsersService();

    }

}
