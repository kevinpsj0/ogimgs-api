export interface BlogTemplateParams {
  title: string;
  subtitle?: string;
  logo?: string;
  theme?: "light" | "dark";
  bgColor?: string;
  textColor?: string;
  author?: string;
  date?: string;
  readingTime?: string;
  category?: string;
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

export function blogTemplate(params: BlogTemplateParams): string {
  const {
    title,
    subtitle,
    logo,
    theme = "light",
    bgColor,
    textColor,
    author,
    date,
    readingTime,
    category,
    width,
    height,
    showWatermark,
  } = params;

  const isDark = theme === "dark";
  const bg = bgColor || (isDark ? "#111118" : "#fafaf8");
  const text = textColor || (isDark ? "#f0efe9" : "#1a1916");
  const muted = isDark ? "rgba(240,239,233,0.45)" : "rgba(26,25,22,0.45)";
  const divider = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  const categoryColors: Record<string, string> = {
    design: "#f59e0b",
    engineering: "#3b82f6",
    product: "#8b5cf6",
    business: "#10b981",
    news: "#ef4444",
  };

  const accentColor =
    category && categoryColors[category.toLowerCase()]
      ? categoryColors[category.toLowerCase()]
      : isDark ? "#a78bfa" : "#7c3aed";

  const authorInitial = author ? author.charAt(0).toUpperCase() : "A";
  const titleSize = title.length > 60 ? 46 : title.length > 40 ? 54 : 64;

  const subtitleHtml = subtitle
    ? `<p style="
        font-size:22px;color:${muted};margin:20px 0 0 0;
        line-height:1.5;font-weight:400;font-style:italic;
      ">${escapeHtml(subtitle)}</p>`
    : "";

  const readingTimeHtml = readingTime
    ? `<span style="
        font-size:16px;color:${muted};
        font-family:'Inter',system-ui,sans-serif;font-weight:400;
      ">${escapeHtml(readingTime)} min read</span>`
    : "";

  const dateHtml = date
    ? `<span style="
        font-size:15px;color:${muted};
        font-family:'Inter',system-ui,sans-serif;
        font-weight:400;line-height:1.3;margin-top:2px;display:block;
      ">${escapeHtml(date)}</span>`
    : "";

  const logoHtml = logo
    ? `<img src="${escapeHtml(logo)}" alt="" style="width:36px;height:36px;border-radius:8px;opacity:0.7;" />`
    : `<div style="width:32px;height:32px;border-radius:50%;background:${text};opacity:0.2;"></div>`;

  const watermarkHtml = showWatermark
    ? `<span style="
        font-size:12px;color:${muted};
        font-family:'Inter',system-ui,sans-serif;
        margin-left:16px;opacity:0.4;
      ">ogimage-api</span>`
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
    display: flex;
    flex-direction: column;
    width: ${width}px;
    height: ${height}px;
    background-color: ${bg};
    font-family: Georgia, 'Times New Roman', serif;
    box-shadow: 0 20px 60px rgba(0,0,0,0.12);
    overflow: hidden;
  ">
    <!-- Top colored strip — 6px, editorial accent -->
    <div style="
      height: 6px;
      width: 100%;
      background: linear-gradient(90deg, ${accentColor} 0%, ${accentColor}88 60%, transparent 100%);
      flex-shrink: 0;
    "></div>

    <!-- Category tag + reading time -->
    <div style="
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 46px 72px 0 72px;
    ">
      <div style="
        display: inline-flex;
        align-items: center;
        background: ${accentColor}18;
        border-radius: 6px;
        padding: 7px 16px;
      ">
        <span style="
          font-size: 15px;
          font-weight: 700;
          color: ${accentColor};
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-family: 'Inter', system-ui, sans-serif;
        ">${escapeHtml(category || "Article")}</span>
      </div>
      ${readingTimeHtml}
    </div>

    <!-- Title area -->
    <div style="
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: center;
      padding: 0 72px;
    ">
      <h1 style="
        font-size: ${titleSize}px;
        font-weight: 700;
        color: ${text};
        line-height: 1.12;
        letter-spacing: -0.01em;
        font-family: Georgia, 'Times New Roman', serif;
      ">${escapeHtml(title)}</h1>
      ${subtitleHtml}
    </div>

    <!-- Bottom author bar -->
    <div style="
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 28px 72px 48px 72px;
      border-top: 1px solid ${divider};
    ">
      <!-- Left: avatar + author info -->
      <div style="display:flex;align-items:center;gap:14px;">
        <div style="
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
          font-family: 'Inter', system-ui, sans-serif;
        ">${authorInitial}</div>
        <div>
          <span style="
            font-size: 18px;
            font-weight: 600;
            color: ${text};
            font-family: 'Inter', system-ui, sans-serif;
            display: block;
            line-height: 1.3;
          ">${escapeHtml(author || "Author")}</span>
          ${dateHtml}
        </div>
      </div>

      <!-- Right: logo + watermark -->
      <div style="display:flex;align-items:center;">
        ${logoHtml}
        ${watermarkHtml}
      </div>
    </div>
  </div>
</body>
</html>`;
}
