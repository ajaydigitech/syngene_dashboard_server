import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { AdminUsers, admin } from './Admin/admin.user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService
    ) { }

    /**
     * The function `loginUserService` in TypeScript is an asynchronous function that validates login
     * credentials and returns an access token if successful.
     * @param {LoginDTO} loginData - The `loginData` parameter is an object of type `LoginDTO` which
     * typically contains the user's login information such as `userName` and `password`.
     * @returns The `loginUserService` function returns a Promise that resolves to an object with the
     * following properties:
     * - `access_token`: a string containing the access token generated after successful login.
     * - `success`: a boolean value indicating whether the login was successful or not.
     * - `message`: a string message providing information about the login status, either "Successfully
     * login" for successful login or "Invalid username or password"
     */
    async loginUserService(loginData: LoginDTO): Promise<{ access_token: string, success: boolean, message: string }> {

        const { userName, password } = loginData;

        const isExistUser = AdminUsers.find(item => item.userName.toLowerCase() == userName.toLowerCase());

        // console.log("---- 2 ----",userName.toLowerCase(),userName)

        if (isExistUser) {

            if (isExistUser.password === password) {

                const payload = { userName: isExistUser.userName, role: isExistUser.role };

                const token = await this.jwtService.signAsync(payload);

                return {
                    success: true,
                    message: "Successfully login",
                    access_token: token
                }

            } else {
                throw new UnauthorizedException({ statusCode: 406, success: false, message: "Invalid username or password" });
            }
        } else {
            throw new UnauthorizedException({ statusCode: 406, success: false, message: "Invalid username or password" });
        }

    }

}
