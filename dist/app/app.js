"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
// Routing
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
app.get("/", logger, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send("Hello!");
    }
    catch (error) {
        next(error);
    }
}));
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
app.post("/", logger, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        res.send("Got the data");
    }
    catch (error) {
        next(error);
    }
}));
// Wrong rout handler
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: "Route Not Found",
    });
});
// Global error handler
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: "Failed to get the data",
        });
    }
});
exports.default = app;
