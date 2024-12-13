import express from "express";
import authRoutes from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes"
import bookRoutes from "./routes/bookRoutes"
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));

app.get('/', (req, res) => {
    res.send('Health Check')
})

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

export default app;