







import { Column, Model, Table } from "sequelize-typescript";

@Table({
    freezeTableName: true,
    timestamps: false
})
export class userReportSub extends Model {

    @Column
    Username: string;

    @Column
    Firstname: string;

    @Column
    Lastname: string;

    @Column
    Overallscore:string;

    @Column
    Summary: string;

    @Column({
        type:'datetime'
    })
    date_time: string;

    // @Column
    // Module: string;

}