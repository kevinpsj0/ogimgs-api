/* eslint-disable @next/next/no-img-element */

interface DefaultTemplateProps {
  title: string;
  subtitle?: string;
  logo?: string;
  theme?: "light" | "dark";
  bgColor?: string;
  textColor?: string;
  domain?: string;
  width: number;
  height: number;
  showWatermark?: boolean;
}

export function DefaultTemplate({
  title,
  subtitle,
  logo,
  bgColor,
  textColor,
  domain,
  width,
  showWatermark,
}: DefaultTemplateProps) {
  const bg = bgColor || "#0f0f23";
  const text = textColor || "#ffffff";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        backgroundColor: bg,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Left blue accent bar — 5px wide flex column */}
      <div
        style={{
          display: "flex",
          width: 5,
          height: "100%",
          backgroundImage: "linear-gradient(180deg, #3b82f6 0%, #6366f1 100%)",
          flexShrink: 0,
        }}
      />

      {/* Main content column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          height: "100%",
        }}
      >
        {/* Top color band strip */}
        <div
          style={{
            display: "flex",
            height: 40,
            width: "100%",
            backgroundImage:
              "linear-gradient(90deg, rgba(59,130,246,0.18) 0%, rgba(99,102,241,0.10) 50%, transparent 100%)",
            flexShrink: 0,
          }}
        />

        {/* Header row: logo + domain pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 64px 0 64px",
          }}
        >
          {/* Logo / brand mark */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {logo ? (
              <img
                src={logo}
                alt=""
                width={36}
                height={36}
                style={{ borderRadius: 8 }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  backgroundImage:
                    "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    backgroundColor: "#ffffff",
                    borderRadius: 3,
                    display: "flex",
                  }}
                />
              </div>
            )}
          </div>

          {/* Domain pill */}
          {domain && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                padding: "8px 18px",
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: 0.3,
                }}
              >
                {domain}
              </span>
            </div>
          )}
        </div>

        {/* Title area — flex: 1 to fill remaining space */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            padding: "0 64px",
          }}
        >
          <h1
            style={{
              fontSize:
                title.length > 55 ? 52 : title.length > 35 ? 62 : 72,
              fontWeight: 800,
              color: text,
              lineHeight: 1.08,
              margin: 0,
              letterSpacing: "-0.02em",
              maxWidth: width - 200,
            }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              style={{
                fontSize: 24,
                color: "rgba(255,255,255,0.52)",
                lineHeight: 1.45,
                margin: 0,
                marginTop: 24,
                maxWidth: width - 240,
                fontWeight: 400,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Bottom bar: decorative dots + divider line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 64px 44px 64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#3b82f6",
                display: "flex",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#6366f1",
                marginLeft: 6,
                display: "flex",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "rgba(255,255,255,0.2)",
                marginLeft: 6,
                display: "flex",
              }}
            />
          </div>

          <div
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "rgba(255,255,255,0.08)",
              marginLeft: 16,
              display: "flex",
            }}
          />

          {showWatermark && (
            <span
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.18)",
                marginLeft: 16,
              }}
            >
              ogimage-api
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
