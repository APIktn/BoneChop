tech stack
////////////////////////////////////////
client

npx create-next-app@latest client
npm install react-icons
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
npm install framer-motion
npm install axios
npm install jwt-decode
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest
npm install -D ts-jest @types/node

////////////////////////////////////////
server

npm install -g @nestjs/cli
nest new server
npm install @nestjs/config
npm install class-validator class-transformer
npm install prisma@6.19.2 @prisma/client@6.19.2
npx prisma init
npx prisma generate
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install @nestjs/mapped-types
npm install -D @types/bcrypt
npm install cookie-parser
npm install -D @types/cookie-parser
npm install @nestjs/platform-express multer
npm install -D @types/multer
npm install cloudinary

nest g module test
nest g service test
nest g controller test

npx prisma migrate dev --name init
npx prisma migrate deploy

////////////////////////////////////////
.env
// client
NEXT_PUBLIC_SERVER_URL=http://localhost:5000

// server
SERVER_PORT=5000
SERVER_HOST=localhost
NODE_ENV=development

CLIENT_URL=http://localhost:3000

# DATABASE (Prisma)
DATABASE_URL="mysql://root:pass@localhost:3306/bonechop"

# JWT
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

////////////////////////////////////////
ctrl + shift + p
Open User Settings (JSON)

    "files.exclude": {
        "client/.next": true
    },