import { NextRequest, NextResponse } from "next/server";
import { generateApiKey, type Tier } from "@/lib/api-keys";

const VALID_TIERS: Tier[] = ["free", "pro", "business"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, tier = "free" } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!VALID_TIERS.includes(tier)) {
      return NextResponse.json(
        { error: `Invalid tier. Must be one of: ${VALID_TIERS.join(", ")}` },
        { status: 400 }
      );
    }

    const record = generateApiKey(email, tier);

    return NextResponse.json({
      success: true,
      apiKey: record.key,
      tier: record.tier,
      message: "Store this API key securely — it won't be shown again.",
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
