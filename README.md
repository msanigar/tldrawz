# Tldrawz - Realtime Collaborative Whiteboard

A minimal, production-ready realtime whiteboard POC built with Next.js, tldraw, and Cloudflare Workers.

## Features

- ✨ Real-time collaboration with live cursors
- 🎨 User presence with custom names and colors
- 📱 Responsive design with dark mode support
- 📤 Export to PNG/SVG
- 🔗 Shareable room links
- ⚡ Built on Cloudflare's edge network

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Real-time Sync**: tldraw useSync with Cloudflare Workers
- **Backend**: Cloudflare Workers + Durable Objects
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

The backend uses the official tldraw Cloudflare template:

```bash
# Clone the sync backend into a sibling directory
cd ..
git clone https://github.com/tldraw/tldraw-sync-cloudflare cloudflare-sync
cd cloudflare-sync

# Install Wrangler CLI if you haven't
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create your project
wrangler init

# Configure your wrangler.toml with Durable Objects and R2 bindings
# (See the template's README for detailed configuration)

# Deploy
wrangler deploy

# Copy the Worker URL to your .env.local
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Deployment

### Frontend (Netlify)

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard
5. Deploy!

### Backend (Cloudflare)

The backend deployment is handled by the official template. Key points:

- **Durable Objects**: Required for real-time sync
- **R2 Storage**: Free tier includes 10GB storage for assets
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
│   └── Whiteboard.tsx      # tldraw integration
├── lib/
│   ├── env.ts              # Environment validation
│   └── id.ts               # Room ID utilities
└── styles/
    └── globals.css         # Tailwind + custom styles
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

Add to your `wrangler.toml`:

```toml
[[durable_objects.bindings]]
name = "TLDRAW_DURABLE_OBJECT"
class_name = "TldrawDurableObject"

[[migrations]]
tag = "v1"
new_sqlite_classes = ["TldrawDurableObject"]  # Use SQLite for free tier
```

### 2. R2 Storage (Optional)

For asset storage, add R2 binding:

```toml
[[r2_buckets]]
binding = "ASSETS"
bucket_name = "your-assets-bucket"
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
- Automatic throttling when approaching limits
- No billing will occur unless you explicitly upgrade to paid plans

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT
