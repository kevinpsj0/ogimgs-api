# ogimage-api

A production-ready OG Image / Social Card Generator API built with Next.js 14 and [@vercel/og](https://vercel.com/docs/functions/og-image-generation) (Satori).

Generate beautiful social cards for Twitter, Facebook, LinkedIn, and more with a single API call.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## API Endpoints

### `GET /api/og`

Generate an OG image from query parameters.

```
/api/og?title=Hello+World&template=blog&theme=dark&author=Jane
```

### `POST /api/og`

Generate from a JSON body (same parameters).

```bash
curl -X POST http://localhost:3000/api/og \
  -H "Content-Type: application/json" \
  -d '{"title": "Hello World", "template": "blog", "theme": "dark"}' \
  -o og.png
```

### `GET /api/og/preview`

Interactive preview builder with live image updates and copy-paste meta tags.

### `POST /api/keys/generate`

Generate an API key.

```bash
curl -X POST http://localhost:3000/api/keys/generate \
  -H "Content-Type: application/json" \
  -d '{"email": "you@example.com", "tier": "pro"}'
```

## Parameters

| Parameter      | Type   | Default   | Description                             |
| -------------- | ------ | --------- | --------------------------------------- |
| `title`        | string | -         | Main heading text (required)            |
| `subtitle`     | string | -         | Secondary text                          |
| `template`     | string | `default` | `default`, `blog`, `product`, `minimal` |
| `theme`        | string | `light`   | `light` or `dark`                       |
| `logo`         | string | -         | URL to logo image                       |
| `bgColor`      | string | auto      | Background color (hex)                  |
| `textColor`    | string | auto      | Text color (hex)                        |
| `width`        | number | `1200`    | Image width (200-2400)                  |
| `height`       | number | `630`     | Image height (200-1400)                 |
| `author`       | string | -         | Author name (blog template)             |
| `date`         | string | -         | Date string (blog template)             |
| `readingTime`  | string | -         | Minutes to read (blog template)         |
| `price`        | string | -         | Price display (product template)        |
| `cta`          | string | -         | CTA button text (product template)      |
| `productImage` | string | -         | Product image URL (product template)    |

## Templates

- **default** - Clean card with title, subtitle, and optional logo
- **blog** - Article-style with author avatar, date, and reading time
- **product** - Product showcase with price and CTA button
- **minimal** - Large text centered on a solid background

## Rate Limiting

| Tier     | Price  | Daily Limit | Watermark |
| -------- | ------ | ----------- | --------- |
| Free     | $0     | 50          | Yes       |
| Pro      | $19/mo | 1,000       | No        |
| Business | $49/mo | 10,000      | No        |

Pass your API key via the `x-api-key` header or `api_key` query parameter.

## Tech Stack

- **Next.js 14** (App Router)
- **@vercel/og** (Satori) for image generation
- **TypeScript**
- **Tailwind CSS**

## Deploy to Vercel

```bash
npm run build
```

## Project Structure

```
app/
  page.tsx                    # Landing page
  layout.tsx                  # Root layout
  api/
    og/
      route.tsx               # GET/POST image generation
      preview/
        page.tsx              # Interactive preview builder
    keys/
      generate/
        route.ts              # API key generation
lib/
  templates/
    default.tsx               # Default template
    blog.tsx                  # Blog template
    product.tsx               # Product template
    minimal.tsx               # Minimal template
  rate-limit.ts               # Rate limiting middleware
  api-keys.ts                 # API key management
```

## License

MIT
