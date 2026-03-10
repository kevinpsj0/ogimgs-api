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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: bg,
        fontFamily: "system-ui, -apple-system, 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Top spacer — pushes content toward center */}
      <div style={{ display: "flex", flex: 1 }} />

      {/* Main content — centered column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 100px",
        }}
      >
        {/* Small colored accent dot above title */}
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
            fontSize:
              title.length > 50 ? 68 : title.length > 30 ? 84 : 96,
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

        {/* Thin horizontal line below title */}
        <div
          style={{
            width: 40,
            height: 1,
            backgroundColor: muted,
            marginTop: 40,
            marginBottom: subtitle ? 24 : 0,
            display: "flex",
          }}
        />

        {/* Subtitle text */}
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

      {/* Bottom spacer — mirrors top spacer to keep content centered */}
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "flex-end",
          justifyContent: "flex-end",
          padding: "0 36px 20px 0",
        }}
      >
        {showWatermark && (
          <span
            style={{
              fontSize: 12,
              color: muted,
              opacity: 0.5,
            }}
          >
            ogimage-api
          </span>
        )}
      </div>
    </div>
  );
}
