import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'

dotenv.config()

async function bootstrap() {
  const PORT = Number(process.env.SERVER_PORT) || 5000
  const HOST = process.env.SERVER_HOST || 'localhost'
  const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000'
  const isProd = process.env.NODE_ENV === 'production'

  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  app.enableCors({
    origin: CLIENT_URL,
    credentials: true,
  })

  app.use(cookieParser())

  await app.listen(PORT,HOST)

  console.log(
    `🚀 Server running on ${isProd ? 'https' : 'http'}://${HOST}:${PORT}`,
  )
}

bootstrap()
