import { type CSSProperties } from "react";

interface MinimalTemplateProps {
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

export function MinimalTemplate({
  title,
  subtitle,
  theme = "light",
  bgColor,
  textColor,
  accentColor,
  showWatermark,
}: MinimalTemplateProps) {
  const isDark = theme === "dark";
  const bg = bgColor || (isDark ? "#09090b" : "#ffffff");
  const text = textColor || (isDark ? "#fafafa" : "#09090b");
  const accent = accentColor || (isDark ? "#3b82f6" : "#2563eb");
  const muted = isDark ? "rgba(250,250,250,0.38)" : "rgba(9,9,11,0.38)";

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: bg,
    fontFamily: "system-ui, -apple-system, 'Helvetica Neue', sans-serif",
    position: "relative",
  };

  return (
    <div style={containerStyle}>
      {/* Subtle corner marks — Swiss grid feel */}
      <div
        style={{
          position: "absolute",
          top: 32,
          left: 32,
          width: 24,
          height: 24,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <div style={{ width: 24, height: 1, backgroundColor: muted, display: "flex" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1,
            height: 24,
            backgroundColor: muted,
            display: "flex",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 32,
          right: 32,
          width: 24,
          height: 24,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ width: 24, height: 1, backgroundColor: muted, display: "flex" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 1,
            height: 24,
            backgroundColor: muted,
            display: "flex",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: 32,
          width: 24,
          height: 24,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
        }}
      >
        <div style={{ width: 24, height: 1, backgroundColor: muted, display: "flex" }} />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 1,
            height: 24,
            backgroundColor: muted,
            display: "flex",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 32,
          right: 32,
          width: 24,
          height: 24,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ width: 24, height: 1, backgroundColor: muted, display: "flex" }} />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 1,
            height: 24,
            backgroundColor: muted,
            display: "flex",
          }}
        />
      </div>

      {/* Main content — centered */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 100px",
          maxWidth: 1000,
        }}
      >
        {/* Accent dot */}
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: accent,
            marginBottom: 36,
            display: "flex",
          }}
        />

        {/* Giant title */}
        <h1
          style={{
            fontSize: title.length > 50 ? 68 : title.length > 30 ? 84 : 96,
            fontWeight: 900,
            color: text,
            lineHeight: 1.0,
            margin: 0,
            textAlign: "center",
            letterSpacing: "-0.035em",
          }}
        >
          {title}
        </h1>

        {/* Hairline divider */}
        {subtitle && (
          <div
            style={{
              width: 40,
              height: 1,
              backgroundColor: muted,
              marginTop: 40,
              marginBottom: 24,
              display: "flex",
            }}
          />
        )}

        {/* Subtitle */}
        {subtitle && (
          <p
            style={{
              fontSize: 22,
              color: muted,
              margin: 0,
              lineHeight: 1.4,
              textAlign: "center",
              fontWeight: 400,
              letterSpacing: "0.01em",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {showWatermark && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 36,
            fontSize: 12,
            color: muted,
            display: "flex",
            opacity: 0.5,
          }}
        >
          ogimage-api
        </div>
      )}
    </div>
  );
}
