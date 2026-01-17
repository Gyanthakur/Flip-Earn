import express from "express"
import "dotenv/config"
import cors from "cors"
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import listingRouter from "./routes/listingRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import { stripeWebhook } from "./controllers/stripeWebhook.js";

const app = express();

app.use('/api/stripe', express.raw({type: 'application/json'}), stripeWebhook)

app.use(
  cors({
    origin: [
      "https://flip-earn-gps.vercel.app", // frontend
      "http://localhost:3000",            // local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(clerkMiddleware());


app.get("/", (req, res) => {
    res.send("Flip Earn API is running...");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/listing", listingRouter);
app.use("/api/chat", chatRouter);
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Flip-Earn Server is running on port ${PORT}`);
});