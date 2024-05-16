"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
// Parsers
app.use(express_1.default.json());
app.use(express_1.default.text());
const userRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
userRouter.post("/create-user", (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: "User is created successfully",
        data: user,
    });
});
courseRouter.post("/create-course", (req, res) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: "Course is created successfully",
        data: course,
    });
});
// Middleware
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
app.get("/", logger, (req, res) => {
    res.send("Hello!");
});
// Use of params
/*
app.get("/:userId/:subId", logger, (req: Request, res: Response) => {
  console.log(req.params);
  res.send("Hello!");
});
*/
// Use of query
/*
app.get("/", logger, (req: Request, res: Response) => {
  console.log(req.query);
  res.send("Find data successfully");
});
*/
app.post("/", logger, (req, res) => {
    console.log(req.body);
    res.send("Got the data");
});
exports.default = app;
