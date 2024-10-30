import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './role.guard';
import { CONSTANTS } from './constants';

@Controller('/app')
export class AppController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AppController.name);
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req): string {
    return this.authService.generateToken(req.user);
  }

  @Get('/android')
  @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLES.ANDROID_DEVELOPER))
  androidDeveloperData(): string {
    return 'This is Android Developer Dashboard Area';
  }

  @Get('/web')
  @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLES.WEB_DEVELOPER))
  webDeveloperData(): string {
    return 'This is Web Developer Dashboard Area';
  }
}
