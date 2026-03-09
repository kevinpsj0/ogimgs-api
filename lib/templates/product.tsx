/* eslint-disable @next/next/no-img-element */

interface ProductTemplateProps {
  title: string;
  subtitle?: string;
  logo?: string;
  theme?: "light" | "dark";
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

export function ProductTemplate({
  title,
  subtitle,
  logo,
  price,
  cta,
  tagline,
  showWatermark,
}: ProductTemplateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundImage:
          "linear-gradient(135deg, #7c3aed 0%, #a855f7 40%, #ec4899 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "44px 56px",
      }}
    >
      {/* Top row: "Now Available" badge (left) + price badge (right) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        {/* Launch badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.18)",
            borderRadius: 20,
            padding: "6px 16px",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#4ade80",
              marginRight: 8,
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.9)",
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            {tagline || "Now Available"}
          </span>
        </div>

        {/* Price badge */}
        {price && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: 16,
              padding: "14px 24px",
            }}
          >
            <span
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.7)",
                letterSpacing: 1.5,
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Starting at
            </span>
            <span
              style={{
                fontSize: 34,
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.1,
                marginTop: 4,
              }}
            >
              {price}
            </span>
          </div>
        )}
      </div>

      {/* Optional logo */}
      {logo && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 32,
            flexShrink: 0,
          }}
        >
          <img
            src={logo}
            alt=""
            width={52}
            height={52}
            style={{
              borderRadius: 12,
              border: "2px solid rgba(255,255,255,0.3)",
            }}
          />
        </div>
      )}

      {/* Center: huge white title — flex: 1 to fill middle */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontSize:
              title.length > 40 ? 60 : title.length > 25 ? 72 : 86,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.0,
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.72)",
              margin: 0,
              marginTop: 20,
              lineHeight: 1.4,
              fontWeight: 400,
              maxWidth: 620,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom row: CTA pill button + optional watermark */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        {cta ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: 50,
              padding: "16px 36px",
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#7c3aed",
                letterSpacing: 0.2,
              }}
            >
              {cta}
            </span>
            <span style={{ fontSize: 18, color: "#7c3aed", marginLeft: 10 }}>
              →
            </span>
          </div>
        ) : (
          <div style={{ display: "flex" }} />
        )}

        {showWatermark && (
          <span
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.25)",
            }}
          >
            ogimage-api
          </span>
        )}
      </div>
    </div>
  );
}
