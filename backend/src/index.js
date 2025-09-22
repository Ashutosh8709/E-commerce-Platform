import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
	.then(() => {
		console.log("MONGODB connected successfuly!!");
		app.listen(process.env.PORT || 8080, () => {
			console.log(
				`Server is running on port ${process.env.PORT}`
			);
		});
		app.on("error", (error) => {
			console.log("ERRR", error);
			throw error;
		});
	})
	.catch((err) => {
		console.log("MONGODB connection failed !!", err);
	});
