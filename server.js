import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// Security Packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";

// db an authenticateUser
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import myDriversRouter from "./routes/myDriversRoutes.js";
import locationsRouter from "./routes/locationsRoutes.js";
import constructorsRouter from "./routes/constructorsRoutes.js";
import driversRouter from "./routes/driversRoutes.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";
import authUserRole from "./middleware/authUserRole.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

// Enable trust proxy
app.set("trust proxy", 1);

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());
app.use(cookieParser());

// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());
// Node.js Connect middleware to sanitize user input coming from POST body, GET queries, and url params.
app.use(xss());
// Sanitizes user-supplied data to prevent MongoDB Operator Injection.
app.use(mongoSanitize());

// app.get("/", (req, res) => {
//   res.send("Welcome");
// });

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/mydrivers", authenticateUser, myDriversRouter);

app.use("/api/v1/locations", authenticateUser, locationsRouter);
app.use("/api/v1/constructors", authenticateUser, constructorsRouter);
app.use("/api/v1/drivers", authenticateUser, driversRouter);

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`sever is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
