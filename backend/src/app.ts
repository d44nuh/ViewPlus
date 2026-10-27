import dotenv from "dotenv";
import express from "express";
import { sequelize } from "./config/database.ts";
import movieRoutes from "./routes/movieRoutes.ts";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/admin/movies", movieRoutes);

const port = Number(process.env.PORT) || 3000;

await sequelize.sync();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});