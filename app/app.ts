import * as Express from "express";
import { httpErrorHandler } from "./middleware";
import { sessionRoutes } from "./routes";
export const app = Express();

// Middleware
app.use(Express.json());

// API routes
app.use("/api/sessions", sessionRoutes);

// Error Handling Middleware
app.use(httpErrorHandler);
