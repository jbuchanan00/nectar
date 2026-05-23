# nectar

A SvelteKit social media service for tattoo/ink enthusiasts. Handles post creation, image upload/retrieval, user feeds, and OAuth provider integration (Google, Meta/Instagram).

## Tech Stack

- **Framework**: SvelteKit with `@sveltejs/adapter-node`
- **Database**: PostgreSQL (via `pg` pool)
- **Cache**: Redis (short-lived OAuth tokens)
- **Image Storage**: gRPC to remote image service
- **Auth**: OAuth 2.0 (Google, Meta/Instagram) with long-lived token persistence
- **Styling**: Tailwind CSS
- **Deployment**: Docker (multi-stage build, Node 22 Alpine)
- **Base path**: `/nectar`

## Features

- **Post Management** — Create, retrieve, and query posts with tags
- **Image Handling** — Upload and retrieve images via gRPC to a remote storage service
- **Multi-user feeds** — Fetch posts for one or multiple users
- **Paginated queries** — User post endpoints support page/pageSize params
- **OAuth Integration** — Google and Meta (Instagram) provider auth with token lifecycle management
- **JWT** — Signed JWT tokens for session management

## Project Structure

```
nectar/
├── src/
│   ├── lib/
│   │   ├── db/
│   │   │   ├── handlers/
│   │   │   │   ├── posts/
│   │   │   │   │   ├── insertPost.ts        # Insert post + tags into DB
│   │   │   │   │   ├── getPostById.ts       # Fetch single post by ID
│   │   │   │   │   ├── getPostsByUserId.ts  # Paginated posts by user
│   │   │   │   │   └── getPostsByUserIds.ts # Bulk posts by user IDs
│   │   │   └── pool.ts                      # PostgreSQL pool config
│   │   └── server/
│   │       ├── api/
│   │       │   ├── auth/
│   │       │   │   ├── google/
│   │       │   │   │   ├── getGoogleAuth.ts     # Generate Google OAuth URL
│   │       │   │   │   └── googleAuthCallback.ts # Handle Google OAuth callback
│   │       │   │   └── meta/
│   │       │   │       ├── getMetaAuth.ts       # Generate Meta OAuth URL
│   │       │   │       └── metaAuthCallback.ts  # Handle Meta OAuth callback
│   │       │   ├── tokens/
│   │       │   │   ├── getLLToken.ts            # Get encrypted long-lived token from DB
│   │       │   │   ├── setLLToken.ts            # Store encrypted long-lived token in DB
│   │       │   │   ├── getSLToken.ts            # Get short-lived token from Redis
│   │       │   │   ├── setSLToken.ts            # Store short-lived token in Redis
│   │       │   │   └── jwt.ts                   # JWT create/verify
│   │       │   ├── users/
│   │       │   │   ├── exists.ts                # Check if user exists
│   │       │   │   └── deleteUser.ts            # Delete user by ID
│   │       │   ├── posts/
│   │       │   │   └── getPosts.ts              # Paginated post retrieval
│   │       │   ├── helpers/
│   │       │   │   └── encrypt.ts               # AES encrypt/decrypt for tokens
│   │       │   ├── cookies.ts                   # Cookie helpers for auth flow
│   │       │   └── geo.ts                       # IP-based geolocation
│   │       └── posts/
│   │           ├── addPost.ts                   # Server-side post insertion
│   │           ├── uploadImageToRemote.ts       # gRPC image upload
│   │           └── getImageFromRemote.ts        # gRPC image retrieval
│   └── routes/
│       ├── +page.server.ts                      # Server-side upload action (form data)
│       ├── health/
│       │   └── +server.ts                       # GET /health — returns 200 OK
│       ├── post/
│       │   └── +server.ts                       # GET /post?postId=uuid
│       ├── addpost/
│       │   ├── +page.server.ts                  # Form-based post creation
│       │   └── +server.ts                       # POST /addpost — API post creation
│       ├── imageupload/
│       │   └── +server.ts                       # POST /imageupload — upload image
│       ├── imagerequest/
│       │   └── +server.ts                       # GET /imagerequest?imageid=
│       ├── userposts/
│       │   └── +server.ts                       # GET /userposts?userId=&pageSize=&page=
│       └── posts/users/
│           └── +server.ts                       # GET/POST /posts/users?user=
├── .env
├── docker-compose.yml                           # Production
├── docker-compose.dev.yml                       # Development
├── Dockerfile                                   # Production multi-stage build
├── svelte.config.js
├── package.json
└── tsconfig.json
```

## API Endpoints

### Health

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Returns `200 OK` |

### Posts

| Method | Path | Description |
|--------|------|-------------|
| POST | `/addpost` | Create a post. Body: `{ postPayload, image, tags }` |
| GET | `/post?postId=uuid` | Fetch a single post by ID |
| GET | `/userposts?userId=&pageSize=&page=` | Paginated posts for a user |
| GET | `/posts/users?user=uuid&user=uuid` | Posts for multiple users (query params) |
| POST | `/posts/users` | Posts for multiple users. Body: `{ ids: [{ id: string }] }` |

### Images

| Method | Path | Description |
|--------|------|-------------|
| POST | `/imageupload` | Upload image. Body: `{ filename, data }` (base64) |
| GET | `/imagerequest?imageid=` | Retrieve image bytes by image ID |

### Server-side Upload (SvelteKit action)

| Form Field | Type | Description |
|------------|------|-------------|
| `image` | string (base64) | Base64-encoded image data (`data:<mime>;base64,...`) |
| `tags` | string (JSON) | Array of `PostTags` |
| `description` | string | Post body text |
| `role` | string (int) | User role integer |

## Supported Media Types

| Extension | Media Type |
|-----------|------------|
| `jpeg`, `svg+xml`, `png`, `heic` | `image` |
| `gif` | `gif` |
| `mp4`, `mkv` | `video` |
| others | `slideshow` |

## OAuth Flow

### Provider Integration

- **Google** — `src/lib/server/api/auth/google/`
- **Meta (Instagram)** — `src/lib/server/api/auth/meta/`

### Token Lifecycle

The service uses a two-tier token system for OAuth providers:

1. **Short-Lived Tokens (Redis)** — Cached for quick access during active sessions
2. **Long-Lived Tokens (PostgreSQL)** — Encrypted and persisted for cross-session use

### Flow Diagram

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Client     │     │   Nectar     │     │  Provider    │
│              │     │              │     │  (Google/    │
│              │     │              │     │   Meta)      │
└──────┬───────┘     └──────┬───────┘     └──────────────┘
       │                    │
       │  1. Request Auth   │
       │───────────────────>│
       │                    │  2. Generate Auth URL
       │                    │──────────────────────>│
       │                    │                     │
       │  3. Auth URL       │                     │
       │<───────────────────│                     │
       │                    │                     │
       │  4. User redirects │                     │
       │─────────────────────────────────────────>│
       │                    │                     │
       │                    │  5. Callback with   │
       │  6. Callback       │     auth code       │
       │<────────────────────────────────────────│
       │                    │                     │
       │                    │  7. Exchange code   │
       │                    │<────────────────────│
       │                    │     access token    │
       │                    │                     │
       │                    │  8. Store token     │
       │                    │     (Redis + Enc.   │
       │                    │      DB)            │
       │                    │                     │
       │  9. Success        │                     │
       │<───────────────────│                     │
       │                    │                     │
```

### Token Functions

**Short-Lived (Redis)**

| Function | File | Description |
|----------|------|-------------|
| `setSLToken(userId, token)` | `tokens/setSLToken.ts` | Store token in Redis hash |
| `getSLToken(userId)` | `tokens/getSLToken.ts` | Retrieve token from Redis hash |

**Long-Lived (PostgreSQL)**

| Function | File | Description |
|----------|------|-------------|
| `setLLToken(db, userId, token)` | `tokens/setLLToken.ts` | Encrypt + upsert token into `meta_lltokens` |
| `getLLTokenAndId(db, userId, provider)` | `tokens/getLLToken.ts` | Fetch encrypted token + `provider_user_id` from DB |

**JWT**

| Function | File | Description |
|----------|------|-------------|
| `createJWT(userId)` | `tokens/jwt.ts` | Sign JWT with `userId` payload (HS256, 1h expiry) |
| `verifyJWT(token)` | `tokens/jwt.ts` | Verify and decode JWT, returns `{ userId }` |

### Encryption

| Function | File | Description |
|----------|------|-------------|
| `encrypt(token)` | `helpers/encrypt.ts` | AES encrypt token → `{ ciphertext, iv, tag }` |
| `decrypt(ciphertext, iv, tag)` | `helpers/index.ts` | Decrypt token from stored components |

## Database Schema (inferred)

### Posts

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `user_id` | uuid | Reference to user |
| `body` | text | Post description/content |
| `media_type` | text | `image` / `gif` / `video` / `slideshow` |
| `media_id` | uuid | Image storage identifier |
| `role` | integer | User role at time of post |
| `like_count` | integer | Like counter (defaults to 0) |
| `created_at` | timestamp | Creation time |
| `updated_at` | timestamp \| null | Last update time |

### Post Tags

Junction table mapping posts to tags (`PostTags`).

### Auth Tables (inferred)

| Table | Purpose |
|-------|---------|
| `auth_provider` | Maps `userId → provider` (google/meta) |
| `meta_lltokens` | Stores encrypted long-lived OAuth tokens per user |

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `POSTGRES_USER` | PostgreSQL username | `postgres` |
| `POSTGRES_HOST` | PostgreSQL host | `nectar-postgres` |
| `POSTGRES_PORT` | PostgreSQL port | `5433` |
| `POSTGRES_DB` | Database name | `mydb` |
| `POSTGRES_PASSWORD` | Database password | — |
| `UPLOAD_DIR` | Local upload directory | `/app/uploads/` |
| `GRPC_IMAGE_HOST` | gRPC image service host | `host.docker.internal` |
| `GRPC_IMAGE_PORT` | gRPC image service port | `9090` |
| `GRPC_TLS` | TLS enabled flag | `0` |
| `PUBLIC_POLESTAR_URL` | External navbar script URL | `https://app.inked-out.com/ui/polestar/navbars.js` |
| `PUBLIC_POLESTAR_BASE` | Polestar asset base URL | `https://app.inked-out.com/ui/polestar/` |
| `VITE_JWT_SECRET` | JWT signing secret | — |
| `ENVIRONMENT` | Environment mode | `dev` / `production` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | — |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | — |
| `INSTAGRAM_CLIENT_ID` | Instagram (Meta) OAuth client ID | — |
| `META_SECRET` | Instagram (Meta) OAuth secret | — |
| `OAUTH_REDIRECT_BASE` | Base URL for OAuth redirect URIs | — |

## Running Locally

### Development

```bash
docker compose -f docker-compose.dev.yml up
```

- Dev server runs on **port 5175**
- Hot reload via volume mounts
- Uploads mounted from `/mnt/c/Users/joshb/Documents/project-images/upload`
- Requires external `shared` Docker network

### Production

```bash
docker compose up
```

- App runs on **port 3000**
- `NODE_ENV=production`
- Multi-stage Docker build

### Without Docker

```bash
npm install
npm run dev
```

Ensure `.env` is configured with your PostgreSQL, gRPC image service, and OAuth credentials.

## Dependencies

| Category | Packages |
|----------|----------|
| Framework | `@sveltejs/kit`, `svelte`, `vite`, `@sveltejs/adapter-node`, `@sveltejs/vite-plugin-svelte` |
| Database | `pg` |
| Cache | `ioredis` (Redis client) |
| gRPC | `@grpc/grpc-js`, `@grpc/proto-loader` |
| Auth | `jose` (JWT), `passport` / OAuth strategy packages |
| Crypto | `crypto` (AES encrypt/decrypt) |
| Styling | `@tailwindcss/vite`, `tailwindcss` |
| Dev tools | `typescript`, `typescript-eslint` |
