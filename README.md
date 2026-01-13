# Guitar Fretboard App

A full-stack web application for learning guitar scales, chords, and fretboard visualization built with Next.js, TypeScript, Tailwind CSS, and Prisma.

## Project Structure

```
guitar-fretboard-app/
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed data for scales and chords
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── scales/  # Scales API endpoints
│   │   │   └── chords/  # Chords API endpoints
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page
│   └── lib/
│       └── prisma.ts    # Prisma client singleton
├── .env.example         # Environment variables template
└── package.json
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma

## Setup Instructions

### Prerequisites

- Node.js 20+ or 22.12+
- PostgreSQL database
- pnpm (recommended)

### Installation

1. Clone the repository and install dependencies:

```bash
cd guitar-fretboard-app
pnpm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and update the `DATABASE_URL` with your PostgreSQL connection string.

3. Set up the database:

```bash
# Push schema to database
pnpm db:push

# Seed the database with scales and chords
pnpm db:seed
```

4. Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:push` | Push schema to database |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:seed` | Seed database with initial data |
| `pnpm db:studio` | Open Prisma Studio |

## API Endpoints

### Scales

- `GET /api/scales` - Get all scales
- `GET /api/scales?category=pentatonic` - Get scales by category
- `POST /api/scales` - Create a new scale

### Chords

- `GET /api/chords` - Get all chords
- `GET /api/chords?category=seventh` - Get chords by category
- `POST /api/chords` - Create a new chord

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_APP_URL` | Public app URL |
| `NODE_ENV` | Environment (development/production) |

## Database Models

- **User** - User accounts and profiles
- **Scale** - Guitar scales with intervals and notes
- **Chord** - Guitar chords with intervals
- **UserProgress** - Track user practice and mastery
- **FavoriteScale** - User's favorite scales

## Deployment

The app can be deployed to Vercel, Railway, or any platform supporting Next.js and PostgreSQL.

```bash
pnpm build
pnpm start
```
