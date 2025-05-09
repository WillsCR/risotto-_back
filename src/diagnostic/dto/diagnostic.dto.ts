import { IsNotEmpty, IsString, useContainer } from "class-validator";



export class DiagnosticDto {   

    @IsNotEmpty()
    user_id: string

    @IsNotEmpty()
    case_id: string

    @IsNotEmpty()
    @IsString()
    diagnostic: string

    @IsNotEmpty()
    @IsString()
    case_info: string

}