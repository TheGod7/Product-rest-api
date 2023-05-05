import express from "express";
import morgan from "morgan";

// Routes
import TaskRoutes from "./routes/product.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(TaskRoutes);

export { app };
