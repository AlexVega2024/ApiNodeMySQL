import "dotenv/config";
import express from "express";
import cors from "cors";
import noticiesRoute from "./routes/noticies.route.js";


const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use("/", noticiesRoute);

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});

