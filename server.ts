import express from "express";
import { Resend } from "resend";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-email", async (req, res) => {
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
    res.status(500).json({ error });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});