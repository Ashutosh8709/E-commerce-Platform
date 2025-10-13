import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//ROUTES
import userRouter from "./routes/user.routes.js";
import cartRouter from "./routes/cart.routes.js";
import productRouter from "./routes/product.routes.js";
import reviewRouter from "./routes/review.routes.js";
import wishlistRouter from "./routes/wishlist.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/wishlist", wishlistRouter);

// http://localhost:8080/api/v1/users/register
app.use(errorHandler);
export { app };
