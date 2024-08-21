import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService:AuthService
    ) {}

    /* This code snippet is defining a POST endpoint for the '/auth/login' route in a NestJS
    controller. The `@Post('login')` decorator specifies that this method should be called when a
    POST request is made to the '/auth/login' route. */
    @Post('login')
    loginUser(@Body() body:LoginDTO) {

        return this.authService.loginUserService(body);
        
    }

}
