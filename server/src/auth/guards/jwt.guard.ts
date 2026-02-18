import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtGuard implements CanActivate {

  constructor(private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {

    const request = context.switchToHttp().getRequest()
    const token = request.cookies?.access_token

    if (!token) {
      throw new UnauthorizedException('no access token')
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
      })

      request.user = payload
      return true

    } catch {
      throw new UnauthorizedException('invalid or expired token')
    }
  }
}