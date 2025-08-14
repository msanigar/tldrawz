# Tldrawz - Realtime Collaborative Whiteboard

A minimal, production-ready realtime whiteboard POC built with Next.js, tldraw, and Cloudflare Workers.

## Features

- ✨ Real-time collaboration with live cursors
- 🎨 User presence with custom names and colors
- 📱 Responsive design with dark mode support
- 📤 Export to PNG/SVG
- 🔗 Shareable room links
- ⚡ Built on Cloudflare's edge network
- 🖼️ Image upload support
- 💾 Persistent storage with Cloudflare R2

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Real-time Sync**: tldraw useSync with official Cloudflare Workers implementation
- **Backend**: Cloudflare Workers + Durable Objects + R2 Storage
- **Deployment**: Netlify (frontend), Cloudflare (backend)

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo>
cd tldrawz
npm install
```

### 2. Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_SYNC_URL=https://your-worker.your-subdomain.workers.dev
NEXT_PUBLIC_APP_NAME=Tldrawz
```

### 3. Deploy Cloudflare Backend

The backend uses the official tldraw Cloudflare sync implementation:

```bash
# Navigate to the cloudflare-sync directory
cd cloudflare-sync

# Install dependencies
npm install

# Install Wrangler CLI if you haven't
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create R2 bucket (if not already created)
# Go to Cloudflare Dashboard > R2 > Create bucket named 'tldraw-content'

# Deploy
wrangler deploy

# Copy the Worker URL to your .env.local
```

### 4. Run Development Server

```bash
# From the main tldrawz directory
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Deployment

### Frontend (Netlify)

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard:
   - `NEXT_PUBLIC_SYNC_URL`: Your Cloudflare Worker URL
   - `NEXT_PUBLIC_APP_NAME`: Your app name
5. Deploy!

### Backend (Cloudflare)

The backend uses the official tldraw Cloudflare sync implementation:

- **Durable Objects**: Required for real-time sync (free tier: 1M requests/day)
- **R2 Storage**: Free tier includes 10GB storage for assets and room persistence
- **Workers**: Free tier includes 100,000 requests/day

## Project Structure

```
tldrawz/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── r/[roomId]/         # Room pages
├── components/
│   ├── NameGate.tsx        # User name/color input
│   ├── Toolbar.tsx         # Export, theme, share buttons
│   ├── UsageMonitor.tsx    # Free tier usage display
│   └── Whiteboard.tsx      # tldraw integration
├── lib/
│   ├── env.ts              # Environment validation
│   └── id.ts               # Room ID utilities
├── styles/
│   ├── globals.css         # Tailwind + custom styles
│   └── tldraw.css          # tldraw styles
└── cloudflare-sync/        # Backend implementation
    ├── worker/
    │   ├── TldrawDurableObject.ts  # Official sync implementation
    │   ├── worker.ts               # Main worker
    │   └── assetUploads.ts         # Asset handling
    └── wrangler.toml               # Cloudflare configuration
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SYNC_URL` | Cloudflare Worker URL | Yes |
| `NEXT_PUBLIC_APP_NAME` | App branding | No |

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run typecheck # Run TypeScript checks
```

## Cloudflare Backend Setup Details

### 1. Durable Objects Configuration

The `wrangler.toml` is already configured with:

```toml
[[durable_objects.bindings]]
name = "TLDRAW_DURABLE_OBJECT"
class_name = "TldrawDurableObject"

[[migrations]]
tag = "v1"
new_sqlite_classes = ["TldrawDurableObject"]  # Use SQLite for free tier
```

### 2. R2 Storage

For asset storage and room persistence:

```toml
[[r2_buckets]]
binding = "TLDRAW_BUCKET"
bucket_name = "tldraw-content"
```

### 3. Free Tier Limits & Billing Protection

**Free Tier Limits:**
- **Workers**: 100,000 requests/day
- **Durable Objects**: 1,000,000 requests/day  
- **R2**: 10GB storage, 1,000,000 Class A operations/day

**Billing Protection:**
- This setup uses only free tier services
- No credit card required for free tier
- Usage monitor included in the app to track limits

## Features

### Real-time Collaboration
- Multiple users can draw simultaneously
- Live cursors show where others are drawing
- User presence with custom names and colors
- Automatic conflict resolution

### Persistence
- Room state automatically saved to R2
- Drawings persist between sessions
- Asset uploads stored in R2

### Export & Sharing
- Export drawings as PNG or SVG
- Shareable room links
- Copy room URL to clipboard

## Troubleshooting

### Common Issues

1. **"Unknown switch case" errors**: This was fixed by using the official tldraw Cloudflare sync implementation
2. **WebSocket connection failures**: Ensure your Cloudflare Worker is deployed and accessible
3. **Asset upload issues**: Verify R2 bucket permissions and configuration

### Development Tips

- Use `wrangler tail` to monitor Cloudflare Worker logs
- Check browser console for frontend errors
- Verify environment variables are set correctly
