import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'
import selfsigned from 'selfsigned'
import * as dotenv from 'dotenv'

async function bootstrap() {
  dotenv.config()

  const PROTOCOL = process.env.SERVER_PROTOCOL || 'https'
  const HOST = process.env.SERVER_HOST || 'localhost'
  const PORT = Number(process.env.SERVER_PORT) || 5000
  const CLIENT_URL = process.env.CLIENT_URL

  const attrs = [{ name: 'commonName', value: HOST }]
  const pems = await selfsigned.generate(attrs)

  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: pems.private,
      cert: pems.cert,
    },
  })

  app.enableCors({
    origin: CLIENT_URL,
    credentials: true,
  })

  app.use(cookieParser())

  await app.listen(PORT, '0.0.0.0')

  console.log(`🚀 Server running on ${PROTOCOL}://${HOST}:${PORT}`)
}

bootstrap()
