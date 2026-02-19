import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class JwtGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest()

    //  cookie & bearer
    const authHeader = request.headers.authorization
    const bearerToken = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null

    const token = request.cookies?.access_token || bearerToken

    if (!token) {
      throw new UnauthorizedException('no access token')
    }

    try {
      // verify access token
      const payload = this.jwtService.verify(token, {
        secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
      })

      const user = await this.prisma.user.findUnique({
        where: { Id: payload.id },
        select: { TokenVersion: true },
      })

      if (!user) {
        throw new UnauthorizedException('user not found')
      }

      // check version
      if (payload.tokenVersion !== user.TokenVersion) {
        throw new UnauthorizedException('token version mismatch')
      }

      request.user = payload

      return true

    } catch (err) {
      throw new UnauthorizedException('invalid or expired token')
    }
  }
}
