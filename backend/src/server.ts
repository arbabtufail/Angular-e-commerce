import "reflect-metadata";
import express, { Request, Response, Application, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHanlder from "./middlreware/Errors";
import User from "./routes/User";
import Category from "./routes/Category";
import Product from "./routes/Product";
import Order from "./routes/Order";
import { databaseConnection } from "./config/DatabaseConnection";
import container from "./container/Inversify.container";
import { UserService } from "./services/User";
import { CategoryService } from "./services/Category";
import { OrderService } from "./services/Order";
import { ProductService } from "./services/Product";

dotenv.config();
const app: Application = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.use(express.json());

export const userServiceInstance = container.resolve(UserService);
export const categoryServiceInstance = container.resolve(CategoryService);
export const orderServiceInstance = container.resolve(OrderService);
export const productServiceInstance = container.resolve(ProductService);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Server is up and Running...");
});
app.use("/api/users", User);
app.use("/api/category", Category);
app.use("/api/product", Product);
app.use("/api/order", Order);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found");
  res.status(404);
  next(error);
});
app.use(errorHanlder);

app.listen(port, async () => {
  try {
    await databaseConnection();
    console.log(`Server is Fired at http://localhost:${port}`);
  } catch (err) {
    console.error("Could not connect to the MongoDB");
  }
});
