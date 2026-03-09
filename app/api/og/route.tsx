import { ImageResponse } from "@vercel/og";
import { NextRequest, NextResponse } from "next/server";
import { DefaultTemplate } from "@/lib/templates/default";
import { BlogTemplate } from "@/lib/templates/blog";
import { ProductTemplate } from "@/lib/templates/product";
import { MinimalTemplate } from "@/lib/templates/minimal";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-api-key",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

interface OgParams {
  title: string;
  subtitle?: string;
  logo?: string;
  theme?: "light" | "dark";
  template?: "default" | "blog" | "product" | "minimal";
  bgColor?: string;
  textColor?: string;
  width?: number;
  height?: number;
  // blog
  author?: string;
  date?: string;
  readingTime?: string;
  // product
  price?: string;
  cta?: string;
  productImage?: string;
}

function parseParams(params: Record<string, string | undefined>): OgParams {
  return {
    title: params.title || "Hello World",
    subtitle: params.subtitle,
    logo: params.logo,
    theme: (params.theme as "light" | "dark") || "light",
    template: (params.template as OgParams["template"]) || "default",
    bgColor: params.bgColor,
    textColor: params.textColor,
    width: params.width ? Math.min(Math.max(parseInt(params.width), 200), 2400) : 1200,
    height: params.height ? Math.min(Math.max(parseInt(params.height), 200), 1400) : 630,
    author: params.author,
    date: params.date,
    readingTime: params.readingTime,
    price: params.price,
    cta: params.cta,
    productImage: params.productImage,
  };
}

function renderTemplate(params: OgParams, showWatermark: boolean) {
  const common = {
    title: params.title,
    subtitle: params.subtitle,
    logo: params.logo,
    theme: params.theme,
    bgColor: params.bgColor,
    textColor: params.textColor,
    width: params.width!,
    height: params.height!,
    showWatermark,
  };

  switch (params.template) {
    case "blog":
      return (
        <BlogTemplate
          {...common}
          author={params.author}
          date={params.date}
          readingTime={params.readingTime}
        />
      );
    case "product":
      return (
        <ProductTemplate
          {...common}
          price={params.price}
          cta={params.cta}
          productImage={params.productImage}
        />
      );
    case "minimal":
      return <MinimalTemplate {...common} />;
    default:
      return <DefaultTemplate {...common} />;
  }
}

function generateImage(params: OgParams, showWatermark: boolean) {
  return new ImageResponse(renderTemplate(params, showWatermark), {
    width: params.width,
    height: params.height,
    headers: {
      ...CORS_HEADERS,
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    const rateLimit = checkRateLimit(request);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          limit: rateLimit.limit,
          tier: rateLimit.tier,
          message: rateLimit.tier === "free"
            ? "Upgrade to Pro for 1,000 images/day. Visit /api/keys/generate"
            : "Daily limit reached. Contact support for higher limits.",
        },
        { status: 429, headers: CORS_HEADERS }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const rawParams: Record<string, string | undefined> = {};
    searchParams.forEach((value, key) => {
      rawParams[key] = value;
    });

    const params = parseParams(rawParams);

    if (!params.title) {
      return NextResponse.json(
        { error: "Missing required parameter: title" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    return generateImage(params, rateLimit.showWatermark);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Internal server error";
    return NextResponse.json(
      { error: message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const rateLimit = checkRateLimit(request);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          limit: rateLimit.limit,
          tier: rateLimit.tier,
        },
        { status: 429, headers: CORS_HEADERS }
      );
    }

    const body = await request.json();
    const params = parseParams(body);

    if (!params.title) {
      return NextResponse.json(
        { error: "Missing required parameter: title" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    return generateImage(params, rateLimit.showWatermark);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Internal server error";
    return NextResponse.json(
      { error: message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
