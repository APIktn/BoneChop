import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        const authHeader = request.headers.authorization

        if (!authHeader) {
            throw new UnauthorizedException('access denied. no token provided')
        }

        const token = authHeader.split(' ')[1]

        if (!token) {
            throw new UnauthorizedException('invalid token format')
        }

        const secret = process.env.JWT_SECRET

        if (!secret) {
            throw new Error('JWT_SECRET not defined')
        }
        
        try {
            const decoded = jwt.verify(token, secret)
            request.user = decoded
            return true
        } catch (err) {
            throw new UnauthorizedException('invalid or expired token')
        }
    }
}
