export interface DefaultTemplateParams {
  title: string;
  subtitle?: string;
  logo?: string;
  bgColor?: string;
  textColor?: string;
  domain?: string;
  width: number;
  height: number;
  showWatermark?: boolean;
}

export function defaultTemplate(params: DefaultTemplateParams): string {
  const {
    title,
    subtitle,
    logo,
    bgColor = "#0f0f23",
    textColor = "#ffffff",
    domain,
    width,
    height,
    showWatermark,
  } = params;

  const titleSize =
    title.length > 55 ? 52 : title.length > 35 ? 62 : 72;
  const maxTitleWidth = width - 200;

  const logoHtml = logo
    ? `<img src="${escapeHtml(logo)}" alt="" style="width:36px;height:36px;border-radius:8px;" />`
    : `<div style="width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,#3b82f6,#6366f1);display:flex;align-items:center;justify-content:center;">
         <div style="width:14px;height:14px;background:#fff;border-radius:3px;"></div>
       </div>`;

  const domainHtml = domain
    ? `<div style="display:flex;align-items:center;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:8px 18px;">
         <span style="font-size:15px;color:rgba(255,255,255,0.55);letter-spacing:0.3px;">${escapeHtml(domain)}</span>
       </div>`
    : "";

  const subtitleHtml = subtitle
    ? `<p style="font-size:24px;color:rgba(255,255,255,0.52);line-height:1.45;margin:24px 0 0 0;max-width:${maxTitleWidth}px;font-weight:400;">${escapeHtml(subtitle)}</p>`
    : "";

  const watermarkHtml = showWatermark
    ? `<span style="font-size:13px;color:rgba(255,255,255,0.18);margin-left:16px;">ogimage-api</span>`
    : "";

  // Decorative blurred glow circles
  const glowCircles = `
    <div style="position:absolute;top:-120px;right:-80px;width:400px;height:400px;border-radius:50%;background:rgba(99,102,241,0.12);filter:blur(80px);pointer-events:none;"></div>
    <div style="position:absolute;bottom:-100px;left:60px;width:320px;height:320px;border-radius:50%;background:rgba(59,130,246,0.10);filter:blur(60px);pointer-events:none;"></div>
  `;

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
    flex-direction: row;
    width: ${width}px;
    height: ${height}px;
    background-color: ${bgColor};
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    overflow: hidden;
  ">
    ${glowCircles}

    <!-- Left accent bar -->
    <div style="
      position: relative;
      z-index: 1;
      width: 5px;
      height: 100%;
      background: linear-gradient(180deg, #3b82f6 0%, #6366f1 100%);
      flex-shrink: 0;
    "></div>

    <!-- Main content column -->
    <div style="
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      flex: 1;
      height: 100%;
    ">
      <!-- Top color band -->
      <div style="
        height: 40px;
        width: 100%;
        background: linear-gradient(90deg, rgba(59,130,246,0.18) 0%, rgba(99,102,241,0.10) 50%, transparent 100%);
        flex-shrink: 0;
      "></div>

      <!-- Header row -->
      <div style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24px 64px 0 64px;
      ">
        ${logoHtml}
        ${domainHtml}
      </div>

      <!-- Title area -->
      <div style="
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
        padding: 0 64px;
      ">
        <h1 style="
          font-size: ${titleSize}px;
          font-weight: 800;
          color: ${textColor};
          line-height: 1.08;
          letter-spacing: -0.02em;
          max-width: ${maxTitleWidth}px;
          text-shadow: 0 0 40px rgba(59,130,246,0.3);
        ">${escapeHtml(title)}</h1>
        ${subtitleHtml}
      </div>

      <!-- Bottom bar -->
      <div style="
        display: flex;
        align-items: center;
        padding: 0 64px 44px 64px;
      ">
        <div style="display:flex;align-items:center;gap:6px;">
          <div style="width:8px;height:8px;border-radius:50%;background:#3b82f6;"></div>
          <div style="width:8px;height:8px;border-radius:50%;background:#6366f1;"></div>
          <div style="width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.2);"></div>
        </div>
        <div style="flex:1;height:1px;background:rgba(255,255,255,0.08);margin-left:16px;"></div>
        ${watermarkHtml}
      </div>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

