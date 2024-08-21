import { IsNotEmpty, IsOptional } from "class-validator";


export class EntryExitDTO {

    @IsNotEmpty()
    skip: number;

    @IsNotEmpty()
    limit: number;

    @IsOptional()
    startDate:string;

    @IsOptional()
    endDate:string;

    @IsOptional()
    userName:string;

}