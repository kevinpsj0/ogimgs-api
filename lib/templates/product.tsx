/* eslint-disable @next/next/no-img-element */
import { type CSSProperties } from "react";

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
  const containerStyle: CSSProperties = {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundImage: "linear-gradient(135deg, #7c3aed 0%, #a855f7 40%, #ec4899 100%)",
    fontFamily: "system-ui, -apple-system, sans-serif",
    position: "relative",
  };

  return (
    <div style={containerStyle}>
      {/* Noise/texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12) 0%, transparent 55%)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 10% 90%, rgba(0,0,0,0.15) 0%, transparent 50%)",
          display: "flex",
        }}
      />

      {/* Grid decoration — subtle */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 400,
          height: 400,
          opacity: 0.07,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,1) 39px, rgba(255,255,255,1) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,1) 39px, rgba(255,255,255,1) 40px)",
          display: "flex",
        }}
      />

      {/* Price badge — top right */}
      {price && (
        <div
          style={{
            position: "absolute",
            top: 44,
            right: 56,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
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

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          padding: "60px 72px",
          position: "relative",
        }}
      >
        {/* Logo + brand */}
        {logo && (
          <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
            <img
              src={logo}
              alt=""
              width={52}
              height={52}
              style={{ borderRadius: 12, border: "2px solid rgba(255,255,255,0.3)" }}
            />
          </div>
        )}

        {/* Launch badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
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
              {tagline || "Now available"}
            </span>
          </div>
        </div>

        {/* Product name */}
        <h1
          style={{
            fontSize: title.length > 40 ? 60 : title.length > 25 ? 72 : 86,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.0,
            margin: 0,
            letterSpacing: "-0.03em",
            textShadow: "0 4px 24px rgba(0,0,0,0.2)",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
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

        {/* CTA */}
        {cta && (
          <div style={{ display: "flex", marginTop: 40 }}>
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
              <span style={{ fontSize: 18, color: "#7c3aed", marginLeft: 10 }}>→</span>
            </div>
          </div>
        )}
      </div>

      {showWatermark && (
        <div
          style={{
            position: "absolute",
            bottom: 18,
            right: 32,
            fontSize: 13,
            color: "rgba(255,255,255,0.25)",
            display: "flex",
          }}
        >
          ogimage-api
        </div>
      )}
    </div>
  );
}
