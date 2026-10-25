import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadImages() {
  "use cache";
  const [photo, logo] = await Promise.all([
    readFile(join(process.cwd(), "public/images/hero/skyland-crew-installing-wall-panels.jpeg")),
    readFile(join(process.cwd(), "public", siteConfig.logo.src)),
  ]);
  return {
    photoSrc: `data:image/jpeg;base64,${photo.toString("base64")}`,
    logoSrc: `data:image/png;base64,${logo.toString("base64")}`,
  };
}

/** Branded social-share image built from a real job-site photo and the logo. */
export default async function Image() {
  const { photoSrc, logoSrc } = await loadImages();

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", fontFamily: "sans-serif" }}>
        <img src={photoSrc} alt="" width={1200} height={630} style={{ position: "absolute", width: 1200, height: 630, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            background: "linear-gradient(90deg, rgba(20,20,20,0.95) 0%, rgba(20,20,20,0.8) 55%, rgba(20,20,20,0.35) 100%)",
          }}
        />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 14, background: "#f7c51e", display: "flex" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", width: 820 }}>
          <img src={logoSrc} alt="" width={150} height={150} style={{ marginLeft: -14 }} />
          <div style={{ display: "flex", marginTop: 18, color: "#f7c51e", fontSize: 24, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>
            {siteConfig.tagline}
          </div>
          <div style={{ display: "flex", marginTop: 14, color: "white", fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
            {siteConfig.name}
          </div>
          <div style={{ display: "flex", marginTop: 22, color: "rgba(255,255,255,0.85)", fontSize: 28, lineHeight: 1.4 }}>
            Drywall · Steel Framing · T-Bar Ceilings · Renovations
          </div>
          <div style={{ display: "flex", marginTop: 34, alignSelf: "flex-start", background: "#06aec4", color: "white", fontSize: 26, fontWeight: 700, padding: "12px 26px" }}>
            {siteConfig.contact.phoneDisplay}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
