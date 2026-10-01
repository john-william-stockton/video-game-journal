import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { join } from "node:path";

const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL || "http://localhost:8080";
const DIST = join(import.meta.dirname, "dist");

const app = express();

// Forward /api/* to Spring, keeping the /api prefix
app.use(
  createProxyMiddleware({
    target: API_URL,
    changeOrigin: true,
    pathFilter: "/api",
  })
);

// Serve the built React app
app.use(express.static(DIST));

// SPA fallback: any other path gets index.html
app.use((req, res) => res.sendFile(join(DIST, "index.html")));

app.listen(PORT, () => {
  console.log(`UI on :${PORT}, proxying /api to ${API_URL}`);
});