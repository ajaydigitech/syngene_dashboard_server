import { Sequelize } from 'sequelize-typescript';
import { userReportEntryExit } from 'src/syngene-reports/entity/syngene-entery-exist-user-report.entity';
import { userReportPrimaryModule } from 'src/syngene-reports/entity/syngene-gowning.entity';
import { userDataSub } from 'src/syngene-reports/entity/syngene-sub-user.entity';
import { userReportSub } from 'src/syngene-reports/entity/syngene-sub.entity';

/**
 * SEQUELIZE variable is stored in a file named
 * 'constants' so it can be easily reused anywhere
 * without being subject to human error.
 */

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            /* This code snippet is creating a new Sequelize instance, which is an ORM
            (Object-Relational Mapping) for Node.js. Here's what each property in the configuration
            object represents: */
            const sequelize = new Sequelize({
                dialect: 'mssql',
                host:process.env.DB_HOST_URI,
                port: +process.env.DB_PORT,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            })

            /**
             * Add Models Here
             * ===============
             * You can add the models to
             * Sequelize later on.
             */
            sequelize.addModels([
                userReportEntryExit,
                userReportPrimaryModule,
                userReportSub,
                userDataSub
            ]);
            await sequelize.sync();
            return sequelize;
        },
    },
];