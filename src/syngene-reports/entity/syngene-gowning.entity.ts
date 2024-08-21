




import { Column, Model, Table } from "sequelize-typescript";

@Table({
    freezeTableName: true,
    timestamps: false
})
export class userReportPrimaryModule extends Model {

    @Column
    Username: string;

    @Column
    Firstname: string;

    @Column
    Lastname: string;

    @Column
    Overall_Score:string;

    @Column
    Summary: string;

    @Column({
        type:'datetime'
    })
    date_time: string;

    @Column
    Module: string;

}