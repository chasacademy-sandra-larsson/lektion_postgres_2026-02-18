import express, {Request, Response} from "express"
import cors from "cors";
import dotenv from "dotenv" 
import userRoutes from "./routes/userRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;


// Middleware 
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRoutes);


// SERVER KÖRS IGÅNG
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});