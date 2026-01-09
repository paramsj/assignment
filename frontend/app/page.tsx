"use client"

import { useEffect } from "react"

export default function Page() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.href = "/"
    }
  }, [])

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "JetBrains Mono, monospace",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>AssetManager</h1>
        <p style={{ color: "#666", marginBottom: "2rem" }}>Loading application...</p>
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "3px solid #000",
            borderTop: "3px solid transparent",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto",
          }}
        ></div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  )
}
