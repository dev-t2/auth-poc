import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from 'src/auth/auth.service';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/auth/guards';
import { User } from 'src/auth/decorators';
import { UsersService } from './users.service';
import {
  ConfirmEmailDto,
  ConfirmNicknameDto,
  ConfirmPhoneNumberDto,
  CreateUserDto,
  FindEmailDto,
  PasswordResetDto,
  SignInDto,
  UserDto,
} from './users.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('USER')
@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: '이메일 중복 확인' })
  @Post('confirm/email')
  async confirmEmail(@Body() { email }: ConfirmEmailDto) {
    return await this.usersService.confirmEmail(email);
  }

  @ApiOperation({ summary: '닉네임 중복 확인' })
  @Post('confirm/nickname')
  async confirmNickname(@Body() { nickname }: ConfirmNicknameDto) {
    return await this.usersService.confirmNickname(nickname);
  }

  @ApiOperation({ summary: '전화번호 중복 확인 및 인증 번호 전송' })
  @Post('confirm/phone')
  async confirmPhoneNumber(@Body() { phoneNumber }: ConfirmPhoneNumberDto) {
    return await this.usersService.confirmPhoneNumber(phoneNumber);
  }

  @ApiOperation({ summary: '인증 번호 확인' })
  @Post('confirm/auth')
  async confirmAuthNumber() {
    return;
  }

  @ApiOperation({ summary: '회원가입' })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: '이메일 찾기' })
  @Get('email')
  async findEmail(@Body() findEmailDto: FindEmailDto) {
    return await this.usersService.findEmail(findEmailDto);
  }

  @ApiOperation({ summary: '비밀번호 재설정' })
  @Put('password')
  async passwordReset(@Body() passwordResetDto: PasswordResetDto) {
    return await this.usersService.passwordReset(passwordResetDto);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('sign')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @ApiOperation({ summary: '토큰 재발급' })
  @ApiBearerAuth('RefreshToken')
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshToken() {
    return;
  }

  @ApiOperation({ summary: '로그아웃' })
  @ApiBearerAuth('AccessToken')
  @UseGuards(AuthGuard('access-token'))
  @Delete('sign')
  signOut(@User() userDto: UserDto) {
    return userDto;
  }

  @ApiOperation({ summary: '회원탈퇴' })
  @ApiBearerAuth('AccessToken')
  @UseGuards(AccessTokenGuard)
  @Delete()
  deleteUser() {
    return;
  }
}
