import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { Response, Request } from 'express'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { UseGuards } from '@nestjs/common'
import { JwtGuard } from './guards/jwt.guard'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto)
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto)

    this.setCookies(res, result.accessToken, result.refreshToken)

    return {
      message: 'login successful',
      user: result.user,
    }
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies?.refresh_token

    if (!refreshToken) {
      throw new UnauthorizedException('no refresh token')
    }

    const result = await this.authService.refreshAccessToken(refreshToken)

    // rotation
    this.setCookies(res, result.accessToken, result.refreshToken)

    return { message: 'token refreshed' }
  }

@Post('logout')
async logout(
  @Req() req: any,
  @Res({ passthrough: true }) res: Response,
) {
  const refreshToken = req.cookies?.refresh_token

  if (refreshToken) {
    await this.authService.logout(refreshToken)
  }

  res.clearCookie('access_token')
  res.clearCookie('refresh_token', {
    path: '/auth/refresh',
  })

  return { message: 'logout successful' }
}


@UseGuards(JwtGuard)
@Post('logout-all')
async logoutAll(
  @Req() req: any,
  @Res({ passthrough: true }) res: Response,
) {
  const userId = req.user.id

  await this.authService.logoutAll(userId)

  res.clearCookie('access_token')
  res.clearCookie('refresh_token', {
    path: '/auth/refresh',
  })

  return { message: 'logged out from all devices' }
}

 // fn
  private setCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    const isProd = this.config.get<string>('NODE_ENV') === 'production'

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    })

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
  }
}
