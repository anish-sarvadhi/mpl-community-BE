# Node TypeScript Backend Application

A robust backend application built with Node.js and TypeScript, featuring Express.js, PostgreSQL with Sequelize ORM, and various security and utility packages.

## Features

- **TypeScript Integration**: Strongly typed codebase for better developer experience
- **Express.js Framework**: Fast, unopinionated web framework
- **PostgreSQL Database**: Reliable relational database with Sequelize ORM
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Security**: Implemented with Helmet, CORS, and other security best practices
- **File Uploads**: Integrated file upload capabilities
- **Validation**: Request validation using Joi
- **Internationalization**: Multi-language support with i18n
- **Logging**: Comprehensive logging with Winston
- **Environment Configuration**: Environment-specific settings

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL (v12 or higher)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd node_type_script
```

2. Install dependencies:

```bash
npm install
```

## Environment Setup

1. Create a `.env` file in the root directory based on the `.env.example` template:

```bash
cp .env.example .env
```

2. Update the `.env` file with your specific configuration:

```
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=24h

# Other Configurations
UPLOAD_DIR=./uploads
LOG_LEVEL=info
```

## Running the Application

The application can be run in different environments:

### Development Mode

```bash
npm run dev
```

### Local Mode

```bash
npm run local
```

### Production Mode

```bash
npm run start
```

## Database Setup

### Database Migrations

Run migrations to create database tables:

```bash
npx sequelize-cli db:migrate
```

### Database Seeding

Seed the database with initial user data:

```bash
npx sequelize-cli db:seed:all
```

This will create initial user accounts in the database that you can use to log in.

## API Documentation

API documentation is available at `/api-docs` when the server is running.

## Project Structure

```
node_type_script/
├── src/                  # Source code
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── middlewares/      # Express middlewares
│   ├── models/           # Sequelize models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions
│   ├── app.ts            # Express app setup
│   └── server.ts         # Server entry point
├── migrations/           # Database migrations
├── seeders/              # Database seeders
├── .env                  # Environment variables
├── .env.example          # Example environment variables
├── .eslintrc             # ESLint configuration
├── .prettierrc           # Prettier configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
```

This README provides a comprehensive guide for setting up and running your Node TypeScript project. It includes all the steps you requested:

1. Installation instructions (npm install)
2. Environment setup (.env configuration)
3. Running the application in different environments (dev/local)
4. Database setup including running seeders for user data

The structure is clean and follows standard README conventions with sections for features, prerequisites, installation, and usage. Feel free to customize any sections to better match your specific project requirements!