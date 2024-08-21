import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { userReportEntryExit } from './entity/syngene-entery-exist-user-report.entity';
import { EntryExitDTO } from './dtos/find-table';
import { userReportPrimaryModule } from './entity/syngene-gowning.entity';
import { userReportSub } from './entity/syngene-sub.entity';
import { Op } from 'sequelize';
import { userDataSub } from './entity/syngene-sub-user.entity';

@Injectable()
export class SyngeneReportsService {

    constructor(
        @Inject('userReportEntryExit') private userEntryExitRepository: typeof userReportEntryExit,
        @Inject('userReportPrimaryModule') private userReportPrimaryModuleRepository: typeof userReportPrimaryModule,
        @Inject('userReportSub') private userDataSubRepository: typeof userReportSub,
        @Inject('userDataSub') private userDataSubUsersRepo: typeof userDataSub,

    ) { }


    /**
     * The function `findEntryExitDataService` in TypeScript is used to query entry and exit data based
     * on specified criteria and return the results.
     * @param {EntryExitDTO} query - The `findEntryExitDataService` function takes a query parameter of
     * type `EntryExitDTO`. This query parameter can contain the following properties:
     * @returns The `findEntryExitDataService` function returns an object with properties `success` and
     * `data`. The `success` property is set to `true`, and the `data` property contains the result of
     * the query executed using the `userEntryExitRepository.findAll` method. If no data is found, a
     * `NotFoundException` is thrown with a specific message.
     */
    async findEntryExitDataService(query: EntryExitDTO) {



        let findQuery = {};

        delete query.skip;
        delete query.limit;

        if (query.startDate && query.endDate) {

            if (query.startDate === query.endDate) {
                let currentDate = new Date(query.endDate);
                let nextDate = new Date(currentDate);
                nextDate.setDate(currentDate.getDate() + 1);
                query.endDate = `${nextDate.getFullYear()}-${nextDate.getMonth()+1}-${nextDate.getDate()}`;
            }

            findQuery['where'] = {
                date_time: {
                    [Op.between]: [query.startDate, query.endDate],
                }
            }
        }

        if (query.userName) {
            findQuery['where'] = { Username: query.userName };
        }

        // findQuery['order'] = 'DESC'

        let data = await this.userEntryExitRepository.findAll(findQuery);

        if (!data.length) {
            throw new NotFoundException({ statusCode: 404, success: false, message: "Data not found...!" });
        }

        // data.forEach(item => { 
        //     // Parse the Summary JSON string into an object 
        //     const summary = JSON.parse(item.Summary); 
        //     // Calculate the total points 
        //     //const totalPoints = summary.data.reduce((total, entry) => total + entry.Point, 0); 
        //     // Calculate the overall score as a percentage 
        //     //const overallScore = (totalPoints / summary.data.length) * 100; item.Overall_Score = `${overallScore.toFixed(2)} %`; 
            
        //     const overallScore = "50%";

        //     // Combine steps with the same Step value 
        //     const combinedSteps = Object.values(summary.data.reduce((acc, entry) => { if (!acc[entry.Step]) { acc[entry.Step] = { ...entry }; } else { acc[entry.Step].Point += entry.Point; } return acc; }, {})); 
        //     // Update the Summary data with combined steps 
        //     summary.data = combinedSteps; item.Summary = JSON.stringify(summary); });

        return {
            sucess: true,
            data: data
        }
    }

    /**
     * This TypeScript function finds gowning reports based on specified query parameters and returns the
     * data.
     * @param {EntryExitDTO} query - The `findGowningReportService` function takes a parameter `query` of
     * type `EntryExitDTO`. This parameter is used to filter the gowning report data based on certain
     * criteria. The function checks for the following properties in the `query` object:
     * @returns The function `findGowningReportService` returns an object with two properties: `success`
     * and `data`. The `success` property is set to `true`, and the `data` property contains the result of
     * the query executed using the `userReportPrimaryModuleRepository.findAll` method. If no data is
     * found, a `NotFoundException` is thrown with a specific message.
     */
    async findGowningReportService(query: EntryExitDTO) {
        let findQuery = {};

        delete query.skip;
        delete query.limit;

        if (query.startDate && query.endDate) {

            if (query.startDate === query.endDate) {
                let currentDate = new Date(query.endDate);
                let nextDate = new Date(currentDate);
                nextDate.setDate(currentDate.getDate() + 1);
                query.endDate = `${nextDate.getFullYear()}-${nextDate.getMonth()+1}-${nextDate.getDate()}`;
            }

            findQuery['where'] = {
                date_time: {
                    [Op.between]: [query.startDate, query.endDate],
                }
            }
        }

        if (query.userName) {
            findQuery['where'] = { Username: query.userName };
        }

        let data = await this.userReportPrimaryModuleRepository.findAll(findQuery);

        if (!data.length) {
            throw new NotFoundException({ statusCode: 404, success: false, message: "Data not found...!" });
        }

        return {
            sucess: true,
            data: data
        }
    }

    /**
     * This TypeScript function finds Syngene sub data based on specified query parameters.
     * @param {EntryExitDTO} query - The `query` parameter in the `findSyngeneSubData` function is an
     * object of type `EntryExitDTO` which contains the following properties:
     * @returns The function `findSyngeneSubData` returns an object with properties `success` and `data`.
     * The `success` property is set to `true`, and the `data` property contains the data fetched from the
     * `userDataSubRepository`. If no data is found, it throws a `NotFoundException` with a specific
     * message.
     */
    async findSyngeneSubData(query: EntryExitDTO) {

        let findQuery = {};

        delete query.skip;
        delete query.limit;

        if (query.startDate && query.endDate) {

            if (query.startDate === query.endDate) {
                let currentDate = new Date(query.endDate);
                let nextDate = new Date(currentDate);
                nextDate.setDate(currentDate.getDate() + 1);
                query.endDate = `${nextDate.getFullYear()}-${nextDate.getMonth()+1}-${nextDate.getDate()}`;
            }

            findQuery['where'] = {
                date_time: {
                    [Op.between]: [query.startDate, query.endDate],
                }
            }
        }

        if (query.userName) {
            findQuery['where'] = { Username: query.userName };
        }

        let data = await this.userDataSubRepository.findAll(findQuery);


        if (!data.length) {
            throw new NotFoundException({ statusCode: 404, success: false, message: "Data not found...!" });
        }

        data.forEach(item => {

            item.dataValues.Overall_Score = item.dataValues.Overallscore;
            delete item.dataValues.Overallscore;
        })

        return {
            sucess: true,
            data: data
        }
    }

    /**
     * The function `findSyngeneSubUser` in TypeScript searches for sub-users based on specified
     * criteria and returns the results.
     * @param {EntryExitDTO} query - The `findSyngeneSubUser` function is designed to search for
     * sub-users based on the provided query parameters. Here is a breakdown of the parameters:
     * @returns The function `findSyngeneSubUser` is returning an object with two properties: `success`
     * and `data`. The `success` property is set to `true`, and the `data` property contains the result
     * of the query executed using the `userDataSubUsersRepo.findAll` method. If the query does not
     * return any data (`data.length` is falsy), a `NotFoundException`
     */
    async findSyngeneSubUser(query: EntryExitDTO) {

        let findQuery = {};

        if (query.skip && query.limit) {
            findQuery['offset'] = Number(query.skip),
                findQuery['limit'] = Number(query.limit)
        }

        if (query.startDate && query.endDate) {
            findQuery['where'] = {
                date_time: {
                    [Op.between]: [query.startDate, query.endDate],
                }
            }
        }

        if (query.userName) {
            findQuery['where'] = { Username: query.userName };
        }

        let data = await this.userDataSubUsersRepo.findAll(findQuery);


        if (!data.length) {
            throw new NotFoundException({ statusCode: 404, success: false, message: "Data not found...!" });
        }

        return {
            sucess: true,
            data: data
        }
    }

    /**
     * This TypeScript function calculates the count of active users from different tables and returns
     * the results in an object.
     * @returns The `calculateActiveUsersService` function is returning an object with a `success` key
     * set to `true` and a `data` key containing three properties:
     */
    async calculateActiveUsersService() {

        let gowingUser = await this.userReportPrimaryModuleRepository.sequelize.query(`SELECT COUNT(Status) AS StatusCount FROM userDataPrimaryModule WHERE Status = 'Completed'`);

        let subUser = await this.userDataSubRepository.sequelize.query(`SELECT COUNT(Status) AS StatusCount FROM userDataSub WHERE Status = 'Completed'`);
        
        let entryExitUser = await this.userEntryExitRepository.sequelize.query(`SELECT COUNT(Status) AS StatusCount FROM userDataEntryExit WHERE Status = 'Completed'`);
        
        return {
            sucess: true,
            data: {
                 entryExitActiveUsers: entryExitUser[0][0]['StatusCount'] || 0,
                gowingActiveUsers: gowingUser[0][0]['StatusCount'] || 0,
                subActiveUsers: subUser[0][0]['StatusCount'] || 0
            }
        };

    }

}
