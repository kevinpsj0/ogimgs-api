/* eslint-disable @next/next/no-img-element */
import { type CSSProperties } from "react";

interface BlogTemplateProps {
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

export function BlogTemplate({
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
  showWatermark,
}: BlogTemplateProps) {
  const isDark = theme === "dark";
  const bg = bgColor || (isDark ? "#111118" : "#fafaf8");
  const text = textColor || (isDark ? "#f0efe9" : "#1a1916");
  const muted = isDark ? "rgba(240,239,233,0.45)" : "rgba(26,25,22,0.45)";
  const divider = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  // Category accent color — warm editorial palette
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
      : isDark
      ? "#a78bfa"
      : "#7c3aed";

  const authorInitial = author ? author.charAt(0).toUpperCase() : "A";

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    backgroundColor: bg,
    fontFamily: "Georgia, 'Times New Roman', serif",
    position: "relative",
  };

  return (
    <div style={containerStyle}>
      {/* Subtle top stripe */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundImage: `linear-gradient(90deg, ${accentColor} 0%, ${accentColor}88 60%, transparent 100%)`,
          display: "flex",
        }}
      />

      {/* Top section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "52px 72px 0 72px",
        }}
      >
        {/* Category tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: `${accentColor}18`,
            borderRadius: 6,
            padding: "7px 16px",
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: accentColor,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {category || "Article"}
          </span>
        </div>

        {/* Reading time */}
        {readingTime && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontSize: 16,
                color: muted,
                fontFamily: "system-ui, sans-serif",
                fontWeight: 400,
              }}
            >
              {readingTime} min read
            </span>
          </div>
        )}
      </div>

      {/* Title area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          padding: "0 72px",
        }}
      >
        <h1
          style={{
            fontSize: title.length > 60 ? 46 : title.length > 40 ? 54 : 64,
            fontWeight: 700,
            color: text,
            lineHeight: 1.12,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            style={{
              fontSize: 22,
              color: muted,
              margin: 0,
              marginTop: 20,
              lineHeight: 1.5,
              fontWeight: 400,
              fontStyle: "italic",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom author bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 72px 48px 72px",
          borderTop: `1px solid ${divider}`,
          marginTop: 0,
          paddingTop: 28,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Author avatar */}
          <div
            style={{
              display: "flex",
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundImage: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#ffffff",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {authorInitial}
            </span>
          </div>

          {/* Author name + date */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 14,
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: text,
                fontFamily: "system-ui, sans-serif",
                lineHeight: 1.3,
              }}
            >
              {author || "Author"}
            </span>
            {date && (
              <span
                style={{
                  fontSize: 15,
                  color: muted,
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: 400,
                  lineHeight: 1.3,
                  marginTop: 2,
                }}
              >
                {date}
              </span>
            )}
          </div>
        </div>

        {/* Logo or publication mark */}
        {logo ? (
          <img src={logo} alt="" width={36} height={36} style={{ borderRadius: 8, opacity: 0.7 }} />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              opacity: 0.25,
            }}
          >
            <div style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: text, display: "flex" }} />
          </div>
        )}
      </div>

      {showWatermark && (
        <div
          style={{
            position: "absolute",
            bottom: 16,
            right: 28,
            fontSize: 12,
            color: muted,
            fontFamily: "system-ui, sans-serif",
            display: "flex",
            opacity: 0.4,
          }}
        >
          ogimage-api
        </div>
      )}
    </div>
  );
}
