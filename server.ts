console.log("Starting server...");

import express, { Request, Response } from "express";
import { Resend } from "resend";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// ✅ SAFETY: check API key
if (!process.env.RESEND_API_KEY) {
  console.error("Missing RESEND_API_KEY");
  process.exit(1);
}

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running");
});

app.post("/send-email", async (req: Request, res: Response) => {
  const { userEmail, userName, eventTitle } = req.body;

  try {
    const response = await resend.emails.send({
      from: "CRC Run Club <onboarding@resend.dev>",
      to: userEmail,
      subject: `Registration Confirmed: ${eventTitle}`,
      html: `<p>Hi ${userName}, your registration is confirmed!</p>`,
    });

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port", process.env.PORT || 5000);
});