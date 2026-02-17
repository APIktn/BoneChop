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
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D jsdom@22.1.0
npm install -D @vitest/coverage-v8

////////////////////////////////////////
server

npm install -g @nestjs/cli
nest new server
npm install @nestjs/config
npm install prisma @prisma/client
npx prisma init
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
