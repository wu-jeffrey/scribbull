import * as Express from "express";
import * as path from "path";
import { httpErrorHandler } from "./middleware";
import { sessionRoutes } from "./routes";

export const app = Express();

// Middleware
app.use(Express.json());

// API routes
app.use("/api/sessions", sessionRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(Express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Error Handling Middleware
app.use(httpErrorHandler);
