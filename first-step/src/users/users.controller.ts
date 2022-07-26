import {BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import {IsEmail, IsInt, Length, Min } from "class-validator";
import {UsersService} from "./users.service";

class CreateUserInputModelType {
    @IsEmail()
    email: string;
    @Length(5, 10)
    name: string;
    @IsInt()
    @Min(0)
    childrenCount: number;
}

/*Это как роут, который мы настраивали для группировки элементов*/
@Controller('users')
export class UsersController {
    constructor(protected usersService: UsersService) {
    }
    /*Когда пишу декоратор гет, я говорю, что getUsers должен реагировать на эндпойнт 'users', к-рый выше*/
    @Get()
    getUsers(@Query('term') term: string) {
        return this.usersService.findUsers(term)
    }
    @Get(':id')
    getUser(@Param('id') userId: string) {
        return [{id: 1}, {id: 2}].find(u => u.id === +userId);
    }

    @Delete(':id')
    deleteUser(@Param('id') userId: string) {
        return;
    }
    @Put(':id')
    updateUser(@Param('id') userId: string,
               @Body() model: CreateUserInputModelType
    ) {
        return {
            id: userId,
            model: model,
        };
    }
    @Post()
    createUser(@Body() inputModel: CreateUserInputModelType) {
        if(11 > 10) {
            throw new BadRequestException([
                {message: 'Bad blogger id', field: 'bloggerId'},
            ]);
        }


        return inputModel;
        /*return {
            id: 12,
            name: inputModel.name,
            childrenCount: inputModel.childrenCount,
        };*/
    }

}
