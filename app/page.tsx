"use client";

import { useState } from "react";

export default function LandingPage() {
  const [demoTitle, setDemoTitle] = useState("Build Beautiful Social Cards");
  const [demoTemplate, setDemoTemplate] = useState("default");
  const [demoTheme, setDemoTheme] = useState("dark");

  const demoUrl = `/api/og?title=${encodeURIComponent(demoTitle)}&template=${demoTemplate}&theme=${demoTheme}&subtitle=${encodeURIComponent("Generate stunning OG images with a single API call")}`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold">
            ogimage<span className="text-blue-500">-api</span>
          </span>
          <div className="flex items-center gap-6 text-sm">
            <a href="#features" className="text-neutral-400 hover:text-white transition">Features</a>
            <a href="#pricing" className="text-neutral-400 hover:text-white transition">Pricing</a>
            <a href="#docs" className="text-neutral-400 hover:text-white transition">Docs</a>
            <a
              href="/api/og/preview"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Try It Free
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-24 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm px-4 py-1.5 rounded-full mb-8">
            Open source &middot; Self-hostable &middot; Free tier available
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
            OG Images via API.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">
              Zero Design Required.
            </span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Generate beautiful social cards for Twitter, Facebook, LinkedIn, and
            more — with a single GET request. No design tools. No headless
            browsers. Just fast, cached PNGs.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="/api/og/preview"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl text-lg font-semibold transition"
            >
              Open Preview Builder
            </a>
            <a
              href="#docs"
              className="border border-white/20 hover:border-white/40 text-white px-8 py-3.5 rounded-xl text-lg font-semibold transition"
            >
              Read the Docs
            </a>
          </div>
        </div>
      </section>

      {/* Live Demo */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-8">
            <h2 className="text-lg font-semibold mb-6">Live Demo</h2>
            <div className="grid md:grid-cols-[300px_1fr] gap-6">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm text-neutral-500 mb-1 block">Title</label>
                  <input
                    value={demoTitle}
                    onChange={(e) => setDemoTitle(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-500 mb-1 block">Template</label>
                  <select
                    value={demoTemplate}
                    onChange={(e) => setDemoTemplate(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
                  >
                    <option value="default">Default</option>
                    <option value="blog">Blog</option>
                    <option value="product">Product</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-neutral-500 mb-1 block">Theme</label>
                  <div className="flex gap-2">
                    {["light", "dark"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setDemoTheme(t)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium border transition ${
                          demoTheme === t
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-neutral-800 border-neutral-700 text-neutral-400"
                        }`}
                      >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={demoUrl}
                  alt="Live demo"
                  className="w-full rounded-lg border border-neutral-800"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need for social cards</h2>
            <p className="text-neutral-400 text-lg max-w-xl mx-auto">
              A complete API for generating, customizing, and serving OG images at scale.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "4 Built-in Templates",
                desc: "Default, Blog, Product, and Minimal templates — all customizable via query params.",
                icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
              },
              {
                title: "Light & Dark Themes",
                desc: "Switch between light and dark with a single parameter. Custom colors supported too.",
                icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
              },
              {
                title: "Edge Cached",
                desc: "Images are cached at the edge for blazing fast delivery. 24h cache with stale-while-revalidate.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
              },
              {
                title: "CORS Enabled",
                desc: "Use from any domain. Full CORS support with proper preflight handling.",
                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
              },
              {
                title: "GET or POST",
                desc: "Simple GET with query params, or POST with JSON body for complex configurations.",
                icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
              },
              {
                title: "Rate Limiting",
                desc: "Built-in rate limiting with tiered API keys. Free tier included for testing.",
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-neutral-900 border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition"
              >
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-neutral-400 text-lg">Start free. Scale when you need to.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                limit: "50 images / day",
                features: [
                  "All templates",
                  "Light & dark themes",
                  "Custom colors",
                  "Small watermark",
                  "Community support",
                ],
                cta: "Get Started",
                highlight: false,
              },
              {
                name: "Pro",
                price: "$19",
                period: "/month",
                limit: "1,000 images / day",
                features: [
                  "Everything in Free",
                  "No watermark",
                  "API key access",
                  "Priority cache",
                  "Email support",
                ],
                cta: "Start Pro Trial",
                highlight: true,
              },
              {
                name: "Business",
                price: "$49",
                period: "/month",
                limit: "10,000 images / day",
                features: [
                  "Everything in Pro",
                  "Custom fonts",
                  "Webhook notifications",
                  "SLA guarantee",
                  "Priority support",
                ],
                cta: "Contact Sales",
                highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 border ${
                  plan.highlight
                    ? "bg-blue-600/10 border-blue-500/40 ring-1 ring-blue-500/20"
                    : "bg-neutral-900 border-white/10"
                }`}
              >
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-neutral-400 text-sm">{plan.period}</span>
                </div>
                <p className="text-sm text-neutral-500 mb-6">{plan.limit}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="text-sm text-neutral-300 flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition ${
                    plan.highlight
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Docs */}
      <section id="docs" className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Start</h2>
            <p className="text-neutral-400 text-lg">Add OG images in under 2 minutes.</p>
          </div>

          <div className="space-y-8">
            <CodeBlock
              title="HTML"
              language="html"
              code={`<!-- Add to your <head> -->
<meta property="og:image"
  content="https://your-domain.com/api/og?title=My+Page+Title&template=default&theme=dark" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image"
  content="https://your-domain.com/api/og?title=My+Page+Title&template=default&theme=dark" />`}
            />

            <CodeBlock
              title="Next.js (App Router)"
              language="typescript"
              code={`// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'

export function generateMetadata({ params }): Metadata {
  return {
    openGraph: {
      images: [\`https://your-domain.com/api/og?title=\${params.slug}&template=blog&theme=dark\`],
    },
  }
}`}
            />

            <CodeBlock
              title="React (react-helmet)"
              language="jsx"
              code={`import { Helmet } from 'react-helmet'

function BlogPost({ title }) {
  const ogImage = \`https://your-domain.com/api/og?title=\${encodeURIComponent(title)}&template=blog\`

  return (
    <Helmet>
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}`}
            />

            <CodeBlock
              title="cURL / POST"
              language="bash"
              code={`# GET request
curl "https://your-domain.com/api/og?title=Hello+World&theme=dark" -o og.png

# POST request with JSON
curl -X POST https://your-domain.com/api/og \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: og_pro_your_key_here" \\
  -d '{"title": "Hello World", "template": "blog", "author": "Jane"}' \\
  -o og.png`}
            />

            {/* API Reference Table */}
            <div className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10">
                <h3 className="font-semibold">API Reference</h3>
              </div>
              <div className="p-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-neutral-400 border-b border-white/5">
                      <th className="pb-3 pr-6 font-medium">Parameter</th>
                      <th className="pb-3 pr-6 font-medium">Type</th>
                      <th className="pb-3 pr-6 font-medium">Default</th>
                      <th className="pb-3 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-neutral-300">
                    {[
                      ["title", "string", "-", "Main heading text (required)"],
                      ["subtitle", "string", "-", "Secondary text below the title"],
                      ["template", "string", "default", "default, blog, product, minimal"],
                      ["theme", "string", "light", "light or dark"],
                      ["logo", "string", "-", "URL to logo image"],
                      ["bgColor", "string", "auto", "Background color (hex)"],
                      ["textColor", "string", "auto", "Text color (hex)"],
                      ["width", "number", "1200", "Image width (200-2400)"],
                      ["height", "number", "630", "Image height (200-1400)"],
                      ["author", "string", "-", "Author name (blog)"],
                      ["date", "string", "-", "Date string (blog)"],
                      ["readingTime", "string", "-", "Minutes to read (blog)"],
                      ["price", "string", "-", "Price display (product)"],
                      ["cta", "string", "-", "CTA button text (product)"],
                      ["productImage", "string", "-", "Product image URL (product)"],
                    ].map(([param, type, def, desc], i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0">
                        <td className="py-3 pr-6">
                          <code className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded text-xs">{param}</code>
                        </td>
                        <td className="py-3 pr-6 text-neutral-500">{type}</td>
                        <td className="py-3 pr-6 text-neutral-500 font-mono text-xs">{def}</td>
                        <td className="py-3 text-neutral-400">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-neutral-500">
          <span>
            ogimage<span className="text-blue-500">-api</span>
          </span>
          <span>Built with Next.js &amp; @vercel/og</span>
        </div>
      </footer>
    </div>
  );
}

function CodeBlock({ title, language, code }: { title: string; language: string; code: string }) {
  return (
    <div className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
        <span className="text-sm text-neutral-400 font-medium">{title}</span>
        <span className="text-xs text-neutral-600">{language}</span>
      </div>
      <pre className="p-5 overflow-x-auto text-sm leading-relaxed">
        <code className="text-neutral-300">{code}</code>
      </pre>
    </div>
  );
}
