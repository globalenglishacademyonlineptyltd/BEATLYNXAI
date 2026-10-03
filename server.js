const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.get("/health", (_req, res) => res.json({ ok: true, app: "BEATLYNXAI", version: "0.1.0" }));
app.post("/api/generate", (req, res) => {
  const { prompt = "", genre = "Pop", vibe = "Energetic" } = req.body || {};
  if (!prompt.trim()) return res.status(400).json({ error: "Please describe the track you want to create." });
  res.json({ status: "queued", message: "Track generation is ready to connect to an AI music provider.", track: { title: prompt.trim().slice(0, 48), genre, vibe } });
});
app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.listen(PORT, "0.0.0.0", () => console.log("BEATLYNXAI running on port " + PORT));