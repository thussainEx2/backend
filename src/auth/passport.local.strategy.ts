import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
//import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PassportLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }
  validate(): any {
    // const user: User = this.userService.getUserByName(username);
    // if (user == undefined) throw new UnauthorizedException();
    // return user;
    // // if (user.password == password) {
    // //   return user;
    // // } else {
    // //   throw new UnauthorizedException();
    // // }
    return true;
  }
}
