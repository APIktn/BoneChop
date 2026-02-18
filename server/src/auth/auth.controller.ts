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

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService,
        private readonly config: ConfigService,
    ) { }

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

        const isProd = this.config.get<string>('NODE_ENV') === 'production'

        // access token
        res.cookie('access_token', result.accessToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: 'strict',
            maxAge: 900000
        })

        // refresh token
        res.cookie('refresh_token', result.refreshToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: 'strict',
            maxAge: 604800000
        })

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

        const newAccessToken =
            await this.authService.refreshAccessToken(refreshToken)

        const isProd = this.config.get<string>('NODE_ENV') === 'production'

        res.cookie('access_token', newAccessToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: 'strict',
            maxAge: 900000
        })

        return { message: 'access token refreshed' }
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {

        res.clearCookie('access_token')
        res.clearCookie('refresh_token')

        return { message: 'logout successful' }
    }
}
