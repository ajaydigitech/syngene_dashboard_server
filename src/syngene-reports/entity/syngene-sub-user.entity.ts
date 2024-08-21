


import { Column, Model, Table } from "sequelize-typescript";

@Table({
    freezeTableName: true,
    timestamps: false
})
export class userDataSub extends Model {

    @Column
    UserName: string;

    @Column
    Password: string;

    @Column
    Firstname: string;

    @Column
    Lastname: string;

    @Column
    Status:string;

}