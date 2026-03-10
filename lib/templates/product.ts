export interface ProductTemplateParams {
  title: string;
  subtitle?: string;
  logo?: string;
  bgColor?: string;
  textColor?: string;
  price?: string;
  cta?: string;
  productImage?: string;
  tagline?: string;
  width: number;
  height: number;
  showWatermark?: boolean;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export function productTemplate(params: ProductTemplateParams): string {
  const {
    title,
    subtitle,
    logo,
    price,
    cta,
    tagline,
    width,
    height,
    showWatermark,
  } = params;

  const titleSize =
    title.length > 40 ? 60 : title.length > 25 ? 72 : 86;

  const priceHtml = price
    ? `<div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        background: rgba(255,255,255,0.15);
        border: 1px solid rgba(255,255,255,0.25);
        border-radius: 16px;
        padding: 14px 24px;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      ">
        <span style="font-size:13px;color:rgba(255,255,255,0.7);letter-spacing:1.5px;text-transform:uppercase;font-weight:600;">Starting at</span>
        <span style="font-size:34px;font-weight:800;color:#ffffff;line-height:1.1;margin-top:4px;">${escapeHtml(price)}</span>
      </div>`
    : "";

  const logoHtml = logo
    ? `<div style="margin-top:32px;flex-shrink:0;">
        <img src="${escapeHtml(logo)}" alt="" style="width:52px;height:52px;border-radius:12px;border:2px solid rgba(255,255,255,0.3);" />
       </div>`
    : "";

  const subtitleHtml = subtitle
    ? `<p style="
        font-size:22px;color:rgba(255,255,255,0.72);margin:20px 0 0 0;
        line-height:1.4;font-weight:400;max-width:620px;
      ">${escapeHtml(subtitle)}</p>`
    : "";

  const ctaHtml = cta
    ? `<div style="
        display: inline-flex;
        align-items: center;
        background: rgba(255,255,255,0.95);
        border-radius: 50px;
        padding: 16px 36px;
        backdrop-filter: blur(8px);
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      ">
        <span style="font-size:18px;font-weight:700;color:#7c3aed;letter-spacing:0.2px;">${escapeHtml(cta)}</span>
        <span style="font-size:18px;color:#7c3aed;margin-left:10px;">→</span>
      </div>`
    : `<div></div>`;

  const watermarkHtml = showWatermark
    ? `<span style="font-size:13px;color:rgba(255,255,255,0.25);">ogimage-api</span>`
    : "";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { width: ${width}px; height: ${height}px; overflow: hidden; }
  </style>
</head>
<body>
  <div style="
    position: relative;
    display: flex;
    flex-direction: column;
    width: ${width}px;
    height: ${height}px;
    background: linear-gradient(135deg, #7c3aed 0%, #a855f7 40%, #ec4899 100%);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    padding: 44px 56px;
    overflow: hidden;
  ">
    <!-- Radial depth overlay -->
    <div style="
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.08) 0%, transparent 60%);
      pointer-events: none;
    "></div>

    <!-- Top row: launch badge + price -->
    <div style="
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    ">
      <div style="
        display: inline-flex;
        align-items: center;
        background: rgba(255,255,255,0.18);
        border-radius: 20px;
        padding: 6px 16px;
        backdrop-filter: blur(8px);
      ">
        <div style="width:8px;height:8px;border-radius:50%;background:#4ade80;margin-right:8px;"></div>
        <span style="font-size:14px;color:rgba(255,255,255,0.9);font-weight:600;letter-spacing:0.5px;">${escapeHtml(tagline || "Now Available")}</span>
      </div>
      ${priceHtml}
    </div>

    ${logoHtml}

    <!-- Center: huge title -->
    <div style="
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: center;
    ">
      <h1 style="
        font-size: ${titleSize}px;
        font-weight: 900;
        color: #ffffff;
        line-height: 1.0;
        letter-spacing: -0.03em;
        text-shadow: 0 4px 24px rgba(0,0,0,0.2);
      ">${escapeHtml(title)}</h1>
      ${subtitleHtml}
    </div>

    <!-- Bottom row: CTA + watermark -->
    <div style="
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    ">
      ${ctaHtml}
      ${watermarkHtml}
    </div>
  </div>
</body>
</html>`;
}
