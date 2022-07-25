import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/*Есть декоратор-контроллер над самим контроллером-классом, чтобы сам нест знал, что это контроллер, что с ним
нужно обращаться как с контроллером.*/
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /* Это обычный класс, у которого есть какие-то методы.
Помечен декораторами, чтобы знать как к ним обращаться через гет, пост, пут, делит.*/

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
