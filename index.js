import express from "express";
import bodyParser from "body-parser";
import { router } from "./routes/routes.js";
import { config } from "dotenv";
import { dbConnect } from "./config/db.js";
config();

export const app = express();
app.use(bodyParser.json());

app.use("/api/faq", (req, res, next) => {
  if (req.originalUrl.endsWith("/")) {
    return next(); // Continue if it already has a slash
  } else {
    return res.redirect(301, req.originalUrl + "/"); // Redirect to /api/
  }
});

app.use("/", router);

const startServer = async () => {
  await dbConnect();
  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT} `);
  });
};
startServer();
