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
npm install prisma@6.19.2 @prisma/client@6.19.2
npx prisma init
npx prisma generate
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install -D @types/bcrypt
npm install cookie-parser
npm install -D @types/cookie-parser
nest g module prisma
nest g service prisma
nest g module auth
nest g service auth
nest g controller auth
nest g module users
nest g service users
nest g controller users

npx prisma migrate dev --name init
npx prisma migrate deploy

////////////////////////////////////////
.env
// client
NEXT_PUBLIC_SERVER_URL=http://localhost:5000

// server
DATABASE_URL="mysql://root:password@localhost:3306/mydb"

SERVER_PROTOCOL=https
SERVER_HOST=localhost
SERVER_PORT=5000

CLIENT_URL=https://localhost:3000