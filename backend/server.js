import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import pg from "pg";
import { projects, skills } from "./data.js";

const { Pool } = pg;
const app = express();
const port = Number(process.env.PORT) || 3001;
const recipientEmail = process.env.CONTACT_EMAIL || "abrhammesfn1@gmail.com";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const database =
  process.env.DATABASE_URL
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
      })
    : null;

database?.on("error", (error) => {
  console.error("Unexpected database connection error:", error.message);
});

app.set("trust proxy", Number(process.env.TRUST_PROXY) || 0);
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", async (_request, response) => {
  if (!database) {
    return response.json({ status: "ok", database: "not_configured" });
  }

  try {
    await database.query("select 1");
    return response.json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("Database health check failed:", error.message);
    return response.status(503).json({ status: "error", database: "unavailable" });
  }
});

app.get("/api/projects", (_request, response) => {
  response.json({ projects });
});

app.get("/api/skills", (_request, response) => {
  response.json({ skills });
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many messages. Please try again later." },
});

app.post("/api/contact", contactLimiter, async (request, response) => {
  const { name, email, message } = request.body ?? {};

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return response
      .status(400)
      .json({ error: "Name, email, and message are required." });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (
    trimmedName.length < 1 ||
    trimmedName.length > 100 ||
    trimmedEmail.length > 254 ||
    !emailPattern.test(trimmedEmail) ||
    trimmedMessage.length < 10 ||
    trimmedMessage.length > 5000
  ) {
    return response.status(400).json({
      error:
        "Enter a valid email, a name up to 100 characters, and a message between 10 and 5000 characters.",
    });
  }

  if (!database) {
    console.error("Database is not configured: set DATABASE_URL in backend/.env.");
    return response.status(503).json({
      error: "The contact form is temporarily unavailable. Please email me directly.",
    });
  }

  try {
    await database.query(
      "insert into public.contact_messages (name, email, message) values ($1, $2, $3)",
      [trimmedName, trimmedEmail, trimmedMessage],
    );

    if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
      const escapeHtml = (value) =>
        value.replace(/[&<>"']/g, (character) => {
          const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          };
          return entities[character];
        });

      try {
        const providerResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL,
            to: [recipientEmail],
            reply_to: trimmedEmail,
            subject: `Portfolio message from ${trimmedName}`,
            text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\n${trimmedMessage}`,
            html: `<p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p><p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p><p>${escapeHtml(trimmedMessage).replace(/\n/g, "<br>")}</p>`,
          }),
        });

        if (!providerResponse.ok) {
          console.error("Contact message was saved, but email notification failed with status", providerResponse.status);
        }
      } catch (error) {
        console.error(
          "Contact message was saved, but email notification failed:",
          error.message,
        );
      }
    }

    return response.status(200).json({
      message: "Thanks for reaching out. Your message has been saved.",
    });
  } catch (error) {
    console.error("Contact message could not be saved:", error.message);
    return response.status(502).json({
      error: "Your message could not be saved. Please try again later.",
    });
  }
});

app.use("/api", (_request, response) => {
  response.status(404).json({ error: "API endpoint not found." });
});

app.use((error, _request, response, _next) => {
  if (error.type === "entity.parse.failed") {
    return response.status(400).json({ error: "Request body must be valid JSON." });
  }

  if (error.type === "entity.too.large") {
    return response.status(413).json({ error: "Request body is too large." });
  }

  console.error("Unhandled server error:", error.message);
  return response.status(500).json({ error: "An unexpected server error occurred." });
});

app.listen(port, () => {
  console.log(`Portfolio server listening on port ${port}`);
});
