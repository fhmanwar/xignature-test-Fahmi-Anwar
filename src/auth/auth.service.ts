import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.getByUsername(username);
        if (!user) return null;
        const passwordValid = await bcrypt.compare(pass, user.password)
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && passwordValid) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        // console.log(user);
        const payload = { username: user.username, sub: user.id };
        // console.log(payload);
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
