import express, { NextFunction, Request, Response } from "express";

const app = express();
const port = 3000;

// Parsers
app.use(express.json());
app.use(express.text());

// Routing
const userRouter = express.Router();
const courseRouter = express.Router();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);

userRouter.post("/create-user", (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);

  res.json({
    success: true,
    message: "User is created successfully",
    data: user,
  });
});

courseRouter.post("/create-course", (req: Request, res: Response) => {
  const course = req.body;
  console.log(course);

  res.json({
    success: true,
    message: "Course is created successfully",
    data: course,
  });
});

// Middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname);
  next();
};

app.get(
  "/",
  logger,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send("Hello!");
    } catch (error) {
      next(error);
    }
  }
);

// Use of params
/* 
app.get(
  "/:userId/:subId",
  logger,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.params);
      res.send("Hello!");
    } catch (error) {
      next(error);
    }
  }
); 
*/

// Use of query
/* 
app.get(
  "/",
  logger,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.query);
      res.send("Find data successfully");
    } catch (error) {
      next(error);
    }
  }
); 
*/

app.post(
  "/",
  logger,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      res.send("Got the data");
    } catch (error) {
      next(error);
    }
  }
);

// Wrong rout handler
app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Route Not Found",
  });
});

// Global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: "Failed to get the data",
    });
  }
});

export default app;
