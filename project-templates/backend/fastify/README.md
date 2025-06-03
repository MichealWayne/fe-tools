# Fastify TypeScript Template(Beta)

A production-ready Fastify server template with TypeScript, featuring:

- 🚀 Fastify v4 with TypeScript support
- 🔐 Built-in security headers with @fastify/helmet
- 🔄 CORS support with @fastify/cors
- 📝 API documentation with Swagger/OpenAPI
- 📊 Logging with Pino
- 🔒 Rate limiting
- 🧪 Jest testing setup
- 🛠️ ESLint + Prettier for code quality
- 📦 Optimized for production

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later
- TypeScript 4.0 or later

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

### Development

Start the development server with hot-reload:

```bash
npm run dev
```

The server will be available at `http://localhost:3000`

### Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── interfaces/       # TypeScript interfaces
├── middlewares/      # Custom middlewares
├── routes/           # Route definitions
├── services/         # Business logic
├── utils/            # Utility functions
├── app.ts            # Application setup
└── index.ts          # Application entry point
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=3000
LOG_LEVEL=info
API_PREFIX=/api
```

## API Documentation

Access the interactive API documentation at `/documentation` when the server is running.

## Testing

Run tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

## Linting

Check for linting errors:

```bash
npm run lint
```

## License

ISC
