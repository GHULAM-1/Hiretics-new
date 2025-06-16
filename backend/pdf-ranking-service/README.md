# PDF Ranking Service

A NestJS-based microservice for processing and ranking CVs/resumes using AI-powered analysis. This service integrates with Supabase for data storage and Google's Generative AI for intelligent CV parsing and scoring.

## Features

- **CV Upload & Processing**: Upload PDF resumes for automated parsing
- **AI-Powered Analysis**: Extract candidate information and score CVs against job descriptions
- **Ranking System**: Rank candidates based on how well they match job requirements
- **REST API**: Clean REST endpoints for integration with other services
- **Type Safety**: Full TypeScript implementation with proper type definitions

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Supabase account and project
- Google AI API key (Gemini)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_key

# Google Generative AI Configuration  
GEMINI_API_KEY=your_gemini_api_key
```

### Getting Your API Keys

1. **Supabase**: 
   - Go to [supabase.com](https://supabase.com)
   - Create a new project or use existing one
   - Go to Settings → API to find your URL and service role key

2. **Google Gemini API**:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key to your `.env` file

## Database Schema

The service expects the following Supabase tables:

### `campaigns` table
```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### `applicants` table
```sql
CREATE TABLE applicants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  cv_link TEXT NOT NULL,
  age INTEGER,
  campaign_id UUID REFERENCES campaigns(id),
  city TEXT,
  university TEXT,
  score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env
# Edit .env with your actual API keys
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Build the application
npm run build
```

The service will be available at `http://localhost:3002`

## API Endpoints

### Upload and Process CV
```
POST /cv
Content-Type: multipart/form-data

Body (form-data):
- file: (File) PDF file to upload
- campaign_id: (Text) UUID of the campaign

Example using curl:
curl -X POST http://localhost:3002/cv \
  -F "file=@path/to/resume.pdf" \
  -F "campaign_id=1a242a5b-b4a0-401d-b396-a9c0cbca8db7"
```

### Get Ranked CVs
```
GET /cv?campaign_id=<campaign_uuid>
```

Returns candidates ranked by their match score (highest first).

## Development

```bash
# Run in watch mode
npm run start:dev

# Run tests
npm run test

# Run linting
npm run lint

# Format code
npm run format
```

## Project Structure

```
src/
├── cv/                          # CV processing module
│   ├── dto/                     # Data transfer objects
│   ├── interfaces/              # TypeScript interfaces
│   ├── cv.controller.ts         # REST API endpoints
│   ├── cv.service.ts           # Business logic
│   └── cv.module.ts            # Module configuration
├── supabase.client.ts          # Supabase configuration
├── app.module.ts               # Main application module
└── main.ts                     # Application entry point
```

## Technologies Used

- **NestJS**: Progressive Node.js framework
- **TypeScript**: Type-safe JavaScript
- **Supabase**: Backend-as-a-Service (database, storage)
- **Google Generative AI**: AI-powered text analysis
- **pdf-parse**: PDF text extraction
- **Multer**: File upload handling

## Error Handling

The service includes comprehensive error handling:
- Missing environment variables
- Invalid file uploads
- Database connection issues
- AI processing failures

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
