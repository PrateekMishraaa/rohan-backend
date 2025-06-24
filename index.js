import express from "express";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const app = express();
import User from "./routes/User.js"
import mongoose from "mongoose";
import cors from "cors";

const MongoDb = process.env.MONGOURI; // ✅ Corrected
console.log(MongoDb);
import Contact from "./routes/Contact.js"
app.use(cors());
app.use(express.json());
app.use("/api",Contact)
app.use("/api",User)

mongoose.connect(MongoDb)
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error:", err));

app.get("/", (req, res) => {
  console.log("hello prateek");
  res.send("hii prateek how are you?");
});

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
