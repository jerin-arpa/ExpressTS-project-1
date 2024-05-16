import express, { Request, Response } from "express";

const app = express();
const port = 3000;

// Parsers
app.use(express.json());
app.use(express.text());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!");
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("Got the data");
});

export default app;
