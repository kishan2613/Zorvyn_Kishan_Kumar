import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import recordRoutes from "./routes/recordRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";


dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/records", recordRoutes);

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Finance backend is running!!");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(5000, () => console.log("Server running"));