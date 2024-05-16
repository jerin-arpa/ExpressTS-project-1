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
// Middleware
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
app.get("/", logger, (req, res) => {
    res.send("Hello!");
});
// Use of params
app.get("/:userId/:subId", logger, (req, res) => {
    console.log(req.params);
    res.send("Hello!");
});
// Use of query
app.get("/", logger, (req, res) => {
    console.log(req.query);
    res.send("Find data successfully");
});
app.post("/", logger, (req, res) => {
    console.log(req.body);
    res.send("Got the data");
});
exports.default = app;
