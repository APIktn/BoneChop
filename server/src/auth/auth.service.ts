import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'

import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { generateUserCode } from '../utils/user-code.util'
import { generateAvatar } from '../utils/avatar.util'

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {

    const { firstName, lastName, userEmail, password } = dto

    const hashedPassword = await bcrypt.hash(password, 10)

    const userCode = await generateUserCode(this.prisma)

    const profileImage = generateAvatar(firstName, lastName)

    try {

      await this.prisma.user.create({
        data: {
          UserCode: userCode,
          UserEmail: userEmail,
          Password: hashedPassword,
          FirstName: firstName,
          LastName: lastName,
          Profile_Image: profileImage,
          CreateBy: userCode,
          CreateDateTime: new Date(),
          UpdateBy: userCode,
          UpdateDateTime: new Date(),
        },
      })

      return { message: 'registration successful' }

    } catch (error: any) {

      if (error.code === 'P2002') {
        throw new ConflictException('email already registered')
      }

      throw error
    }
  }

  async login(dto: LoginDto) {

    const { username, password } = dto

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { UserEmail: username.toLowerCase() },
          { UserName: username.toLowerCase() },
        ],
      },
    })

    if (!user) {
      throw new NotFoundException('user not found')
    }

    const ok = await bcrypt.compare(password, user.Password)

    if (!ok) {
      throw new BadRequestException('invalid password')
    }

    const payload = {
      id: user.Id,
      userCode: user.UserCode,
    }

    const accessToken = this.jwtService.sign(payload, {
      secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
      expiresIn: '15m',
    })

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    })

    return {
      accessToken,
      refreshToken,
      user: {
        userCode: user.UserCode,
        email: user.UserEmail,
        userName: user.UserName,
        firstName: user.FirstName,
        lastName: user.LastName,
      },
    }
  }

  async refreshAccessToken(refreshToken: string) {

    try {

      const payload = this.jwtService.verify(refreshToken, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      })

      const newAccessToken = this.jwtService.sign(
        {
          id: payload.id,
          userCode: payload.userCode,
        },
        {
          secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      )

      return newAccessToken

    } catch (error) {
      throw new UnauthorizedException('invalid refresh token')
    }
  }
}
