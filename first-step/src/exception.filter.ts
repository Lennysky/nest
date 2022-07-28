import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from "@nestjs/common";
import {Request, Response} from 'express';

// Тут ошибки, которые просто так прилетают, не хттп
@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        if (process.env.environment !== 'production') {
            response
                .status(500)
                .send({error: exception.toString(), stack: exception.stack});
        } else {
            response.status(500).send('some error occured');
        }
    }
}

// Тут http-exceptions
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        if (status === 500 && process.env.environment !== 'production') {
            response.status(status).json(exception);
        }

        if (status === 400) {
            const errorResponse = {
                errors: []
            };
            const responseBody: any = exception.getResponse();

            responseBody.message.forEach(m => errorResponse.errors.push(m));

            response.status(status).json(errorResponse);
        } else {
            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }
    }
}