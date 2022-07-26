import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {BadRequestException, ValidationPipe} from "@nestjs/common";
import {ErrorExceptionFilter, HttpExceptionFilter} from "./exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({
            stopAtFirstError: false,
            exceptionFactory: (errors) => {
                console.log(errors);
                const errorsForResponse = [];

                errors.forEach((e) => {
                    //errorsForResponse.push({field: e.property});
                    const constraintsKeys = Object.keys(e.constraints);
                    constraintsKeys.forEach((ckey) => {
                        errorsForResponse.push({
                            message: e.constraints[ckey],
                            field: e.property
                        });
                    });
                });

                //throw new Error - причем ош. не обычную, а специальную, которую нам предоставляет нест.
                throw new BadRequestException(errorsForResponse);
            },
        })
    );
    app.useGlobalFilters( new ErrorExceptionFilter(), new HttpExceptionFilter());
    await app.listen(3000);
}

bootstrap();
