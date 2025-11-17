import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import startupRoutes from "./routes/startup.routes.js";
import eventRoutes from "./routes/event.routes.js";
import programRoutes from "./routes/program.routes.js";
import registerRoutes from "./routes/register.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import eventRegistrationRoutes from "./routes/eventRegistration.routes.js";

const app = express();

const allowedOrigins = [process.env.CORS_ORIGIN];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);

            // Allow production domain
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            if (/^https:\/\/lce-app-amxc(-.*)?\.vercel\.app$/.test(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS: " + origin));
        },
        credentials: true,
    })
);

app.use(express.json({ limit: "20kb" })); // Helps in preventing DOS attacks
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/startups", startupRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/event-registrations", eventRegistrationRoutes);

export { app };
