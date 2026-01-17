// import express from "express"
// import "dotenv/config"
// import cors from "cors"
// import { clerkMiddleware } from '@clerk/express'
// import { serve } from "inngest/express";
// import { inngest, functions } from "./inngest/index.js";
// import listingRouter from "./routes/listingRoutes.js";
// import chatRouter from "./routes/chatRoutes.js";
// import adminRouter from "./routes/adminRoutes.js";
// import { stripeWebhook } from "./controllers/stripeWebhook.js";

// const app = express();

// app.use('/api/stripe', express.raw({type: 'application/json'}), stripeWebhook)

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(clerkMiddleware());


// app.get("/", (req, res) => {
//     res.send("Flip Earn API is running...");
// });

// app.use("/api/inngest", serve({ client: inngest, functions }));
// app.use("/api/listing", listingRouter);
// app.use("/api/chat", chatRouter);
// app.use("/api/admin", adminRouter);

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//     console.log(`Flip-Earn Server is running on port ${PORT}`);
// });

import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import listingRouter from "./routes/listingRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import { stripeWebhook } from "./controllers/stripeWebhook.js";

const app = express();

/* ---------- STRIPE WEBHOOK (NO JSON HERE) ---------- */
app.use(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhook
);


/* ---------- CORS (MUST BE FIRST) ---------- */
app.use(
  cors({
    origin: "https://flip-earn-gps.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// allow all preflight requests

/* ---------- BODY PARSERS ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- AUTH (AFTER CORS) ---------- */
app.use(clerkMiddleware());

/* ---------- ROUTES ---------- */
app.get("/", (req, res) => {
  res.send("Flip Earn API is running...");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/listing", listingRouter);
app.use("/api/chat", chatRouter);
app.use("/api/admin", adminRouter);

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Flip-Earn Server is running on port ${PORT}`);
});
