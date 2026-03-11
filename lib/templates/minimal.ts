export interface MinimalTemplateParams {
  title: string;
  subtitle?: string;
  theme?: "light" | "dark";
  bgColor?: string;
  textColor?: string;
  accentColor?: string;
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

export function minimalTemplate(params: MinimalTemplateParams): string {
  const {
    title,
    subtitle,
    theme = "light",
    bgColor,
    textColor,
    accentColor,
    width,
    height,
    showWatermark,
  } = params;

  const isDark = theme === "dark";
  const bg = bgColor || (isDark ? "#09090b" : "#ffffff");
  const text = textColor || (isDark ? "#fafafa" : "#09090b");
  const accent = accentColor || (isDark ? "#3b82f6" : "#2563eb");
  const muted = isDark ? "rgba(250,250,250,0.38)" : "rgba(9,9,11,0.38)";

  const titleSize =
    title.length > 50 ? 68 : title.length > 30 ? 84 : 96;

  const subtitleHtml = subtitle
    ? `<p style="
        font-size: 22px;
        color: ${muted};
        margin: 0;
        line-height: 1.4;
        text-align: center;
        font-weight: 400;
        letter-spacing: 0.01em;
      ">${escapeHtml(subtitle)}</p>`
    : "";

  const watermarkHtml = showWatermark
    ? `<span style="
        position: absolute;
        bottom: 20px;
        right: 36px;
        font-size: 12px;
        color: ${muted};
        opacity: 0.5;
        font-family: 'Inter', system-ui, sans-serif;
      ">ogimage-api</span>`
    : "";

  // Swiss-design corner registration marks
  const cornerSize = 20;
  const cornerOffset = 28;
  const cornerColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)";

  const corners = `
    <!-- Top-left -->
    <div style="position:absolute;top:${cornerOffset}px;left:${cornerOffset}px;width:${cornerSize}px;height:2px;background:${cornerColor};"></div>
    <div style="position:absolute;top:${cornerOffset}px;left:${cornerOffset}px;width:2px;height:${cornerSize}px;background:${cornerColor};"></div>
    <!-- Top-right -->
    <div style="position:absolute;top:${cornerOffset}px;right:${cornerOffset}px;width:${cornerSize}px;height:2px;background:${cornerColor};"></div>
    <div style="position:absolute;top:${cornerOffset}px;right:${cornerOffset}px;width:2px;height:${cornerSize}px;background:${cornerColor};"></div>
    <!-- Bottom-left -->
    <div style="position:absolute;bottom:${cornerOffset}px;left:${cornerOffset}px;width:${cornerSize}px;height:2px;background:${cornerColor};"></div>
    <div style="position:absolute;bottom:${cornerOffset}px;left:${cornerOffset}px;width:2px;height:${cornerSize}px;background:${cornerColor};"></div>
    <!-- Bottom-right -->
    <div style="position:absolute;bottom:${cornerOffset}px;right:${cornerOffset}px;width:${cornerSize}px;height:2px;background:${cornerColor};"></div>
    <div style="position:absolute;bottom:${cornerOffset}px;right:${cornerOffset}px;width:2px;height:${cornerSize}px;background:${cornerColor};"></div>
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${width}px;
    height: ${height}px;
    background-color: ${bg};
    font-family: 'Inter', system-ui, -apple-system, 'Helvetica Neue', sans-serif;
    overflow: hidden;
  ">
    ${corners}

    <!-- Single accent dot -->
    <div style="
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: ${accent};
      margin-bottom: 36px;
    "></div>

    <!-- Giant title -->
    <h1 style="
      font-size: ${titleSize}px;
      font-weight: 900;
      color: ${text};
      line-height: 1.0;
      text-align: center;
      letter-spacing: -0.035em;
      padding: 0 100px;
    ">${escapeHtml(title)}</h1>

    <!-- Thin rule -->
    <div style="
      width: 40px;
      height: 1px;
      background: ${muted};
      margin-top: 40px;
      ${subtitle ? "margin-bottom: 24px;" : ""}
    "></div>

    ${subtitleHtml}
    ${watermarkHtml}
  </div>
</body>
</html>`;
}

