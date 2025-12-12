
import dotenv from "dotenv"
import connectDB from "./db/dbConnect.js"
import express from "express"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import schemeRouter from "./routes/scheme.routes.js"

const app = express();

dotenv.config({
    path: "./.env"
})

app.use(cors({
    origin: ["http://localhost:8080", "http://localhost:3000"]
}))
app.use(express.json({ limit: "50mb" }))

app.use("/api/v1/user", userRouter)
app.use("/api/v1/scheme", schemeRouter)

try {

    await connectDB();

    app.on("error", (error) => {
        console.log("Error", error);
        throw error;
    })

    app.listen(process.env.PORT, () => {
        console.log(`Server is running at PORT ${process.env.PORT}`);
    })

} catch (error) {
    console.log("Mongo db connection error", error);
}