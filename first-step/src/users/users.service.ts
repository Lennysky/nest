import {Injectable} from "@nestjs/common";
import { IsEmail, IsInt, Length, Min, validateOrReject } from "class-validator";
import {UsersRepository} from "./users.repository";
import validate = WebAssembly.validate;


export class CreateUserInputModelType {
    @IsEmail()
    email: string;
    @Length(5, 10)
    name: string;
    @IsInt()
    @Min(0)
    childrenCount: number;
}

@Injectable()
export class UsersService {
    constructor(protected usersRepository: UsersRepository ) {}

    findUsers(term: string) {
        return this.usersRepository.findUsers(term);
    }

    async createUser(inputModel: CreateUserInputModelType) {
        if(inputModel instanceof CreateUserInputModelType === false) {
            throw new Error ('Incorrect input data');
        }
        await validateOrReject(inputModel);
        //do business logic
    }

}