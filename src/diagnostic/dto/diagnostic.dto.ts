import { isDate, IsNotEmpty, IsString, useContainer } from "class-validator";

export class DiagnosticDto {   

    @IsNotEmpty()
    case_id: string

    @IsNotEmpty()
    @IsString()
    user_name: string

    @IsNotEmpty()
    @IsString()
    case_info: string

    @IsNotEmpty()
    date: Date

}