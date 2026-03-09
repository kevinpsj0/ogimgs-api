"use client";

import { useState, useCallback } from "react";

const TEMPLATES = ["default", "blog", "product", "minimal"] as const;
const THEMES = ["light", "dark"] as const;

export default function PreviewPage() {
  const [params, setParams] = useState({
    title: "Your Amazing Title Here",
    subtitle: "A compelling subtitle that draws readers in",
    template: "default" as string,
    theme: "light" as string,
    bgColor: "",
    textColor: "",
    logo: "",
    width: "1200",
    height: "630",
    // blog
    author: "",
    date: "",
    readingTime: "",
    // product
    price: "",
    cta: "",
    productImage: "",
  });

  const [copied, setCopied] = useState<string | null>(null);

  const update = useCallback((key: string, value: string) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  }, []);

  const buildUrl = useCallback(() => {
    const base =
      typeof window !== "undefined"
        ? `${window.location.origin}/api/og`
        : "/api/og";
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.set(key, value);
    });
    return `${base}?${searchParams.toString()}`;
  }, [params]);

  const previewUrl = buildUrl();

  const metaTag = `<meta property="og:image" content="${previewUrl}" />`;
  const htmlTag = `<img src="${previewUrl}" width="${params.width}" height="${params.height}" alt="OG Image" />`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#e5e5e5",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid #262626",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="/" style={{ textDecoration: "none", color: "#fff", fontSize: 18, fontWeight: 700 }}>
          ogimage<span style={{ color: "#3b82f6" }}>-api</span>
        </a>
        <a
          href="/"
          style={{
            color: "#a3a3a3",
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          &larr; Back to Home
        </a>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 24px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 8px" }}>
          OG Image Preview Builder
        </h1>
        <p style={{ color: "#737373", margin: "0 0 32px", fontSize: 15 }}>
          Customize your social card and copy the URL or meta tag.
        </p>

        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" as const }}>
          {/* Controls */}
          <div style={{ flex: "1 1 340px", minWidth: 340, maxWidth: 480 }}>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 20 }}>
              <Field label="Template">
                <select
                  value={params.template}
                  onChange={(e) => update("template", e.target.value)}
                  style={selectStyle}
                >
                  {TEMPLATES.map((t) => (
                    <option key={t} value={t}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Theme">
                <div style={{ display: "flex", gap: 8 }}>
                  {THEMES.map((t) => (
                    <button
                      key={t}
                      onClick={() => update("theme", t)}
                      style={{
                        ...btnStyle,
                        backgroundColor: params.theme === t ? "#3b82f6" : "#262626",
                        color: params.theme === t ? "#fff" : "#a3a3a3",
                      }}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Title *">
                <input
                  value={params.title}
                  onChange={(e) => update("title", e.target.value)}
                  style={inputStyle}
                  placeholder="Your title"
                />
              </Field>

              <Field label="Subtitle">
                <input
                  value={params.subtitle}
                  onChange={(e) => update("subtitle", e.target.value)}
                  style={inputStyle}
                  placeholder="Optional subtitle"
                />
              </Field>

              <Field label="Logo URL">
                <input
                  value={params.logo}
                  onChange={(e) => update("logo", e.target.value)}
                  style={inputStyle}
                  placeholder="https://example.com/logo.png"
                />
              </Field>

              <div style={{ display: "flex", gap: 12 }}>
                <Field label="Width">
                  <input
                    value={params.width}
                    onChange={(e) => update("width", e.target.value)}
                    style={inputStyle}
                    type="number"
                  />
                </Field>
                <Field label="Height">
                  <input
                    value={params.height}
                    onChange={(e) => update("height", e.target.value)}
                    style={inputStyle}
                    type="number"
                  />
                </Field>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <Field label="BG Color">
                  <input
                    value={params.bgColor}
                    onChange={(e) => update("bgColor", e.target.value)}
                    style={inputStyle}
                    placeholder="#ffffff"
                  />
                </Field>
                <Field label="Text Color">
                  <input
                    value={params.textColor}
                    onChange={(e) => update("textColor", e.target.value)}
                    style={inputStyle}
                    placeholder="#000000"
                  />
                </Field>
              </div>

              {/* Template-specific fields */}
              {params.template === "blog" && (
                <>
                  <Field label="Author">
                    <input
                      value={params.author}
                      onChange={(e) => update("author", e.target.value)}
                      style={inputStyle}
                      placeholder="John Doe"
                    />
                  </Field>
                  <div style={{ display: "flex", gap: 12 }}>
                    <Field label="Date">
                      <input
                        value={params.date}
                        onChange={(e) => update("date", e.target.value)}
                        style={inputStyle}
                        placeholder="Mar 8, 2026"
                      />
                    </Field>
                    <Field label="Read Time (min)">
                      <input
                        value={params.readingTime}
                        onChange={(e) => update("readingTime", e.target.value)}
                        style={inputStyle}
                        placeholder="5"
                      />
                    </Field>
                  </div>
                </>
              )}

              {params.template === "product" && (
                <>
                  <Field label="Price">
                    <input
                      value={params.price}
                      onChange={(e) => update("price", e.target.value)}
                      style={inputStyle}
                      placeholder="$29.99"
                    />
                  </Field>
                  <Field label="CTA Text">
                    <input
                      value={params.cta}
                      onChange={(e) => update("cta", e.target.value)}
                      style={inputStyle}
                      placeholder="Buy Now"
                    />
                  </Field>
                  <Field label="Product Image URL">
                    <input
                      value={params.productImage}
                      onChange={(e) => update("productImage", e.target.value)}
                      style={inputStyle}
                      placeholder="https://example.com/product.png"
                    />
                  </Field>
                </>
              )}
            </div>
          </div>

          {/* Preview */}
          <div style={{ flex: "2 1 600px" }}>
            <div
              style={{
                backgroundColor: "#171717",
                borderRadius: 12,
                border: "1px solid #262626",
                padding: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <span style={{ fontSize: 13, color: "#737373" }}>
                  Preview ({params.width} &times; {params.height})
                </span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="OG Image Preview"
                style={{
                  width: "100%",
                  borderRadius: 8,
                  border: "1px solid #262626",
                }}
              />
            </div>

            {/* Copy sections */}
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column" as const, gap: 16 }}>
              <CopyBlock
                label="Image URL"
                value={previewUrl}
                copied={copied === "url"}
                onCopy={() => copyToClipboard(previewUrl, "url")}
              />
              <CopyBlock
                label="Meta Tag"
                value={metaTag}
                copied={copied === "meta"}
                onCopy={() => copyToClipboard(metaTag, "meta")}
              />
              <CopyBlock
                label="HTML Image"
                value={htmlTag}
                copied={copied === "html"}
                onCopy={() => copyToClipboard(htmlTag, "html")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" as const, gap: 6, flex: 1 }}>
      <label style={{ fontSize: 13, color: "#a3a3a3", fontWeight: 500 }}>{label}</label>
      {children}
    </div>
  );
}

function CopyBlock({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: "#737373" }}>{label}</span>
        <button onClick={onCopy} style={{ ...copyBtnStyle }}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div
        style={{
          backgroundColor: "#171717",
          border: "1px solid #262626",
          borderRadius: 8,
          padding: "10px 14px",
          fontSize: 13,
          fontFamily: "monospace",
          color: "#a3a3a3",
          overflowX: "auto" as const,
          whiteSpace: "nowrap" as const,
        }}
      >
        {value}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  backgroundColor: "#171717",
  border: "1px solid #262626",
  borderRadius: 8,
  padding: "10px 14px",
  color: "#e5e5e5",
  fontSize: 14,
  outline: "none",
  width: "100%",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: "pointer",
};

const btnStyle: React.CSSProperties = {
  border: "1px solid #333",
  borderRadius: 8,
  padding: "8px 20px",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 500,
};

const copyBtnStyle: React.CSSProperties = {
  backgroundColor: "#262626",
  border: "1px solid #333",
  borderRadius: 6,
  padding: "4px 12px",
  color: "#a3a3a3",
  fontSize: 12,
  cursor: "pointer",
};
