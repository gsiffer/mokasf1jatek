import { TooManyRequestError } from "../errors/index.js";

// Basic rate-limiting middleware for Express.
import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  handler: () => {
    throw new TooManyRequestError(
      "Too many requests from this IP, please try again after 15 minutes"
    );
  },
});

export default apiLimiter;
