import express, {Request, Response} from "express"
import cors from "cors";
import dotenv from "dotenv" 
import { query } from "./db.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}


// CRUD för vår resurs users 

// GET ONE
app.get("/users/:id", (req: Request, res: Response) => {

    // Logik för operation till vår postgresdatabas

});

// GET MANY
app.get("/users/", async (req: Request, res: Response) => {

    // Logik för operation till vår postgresdatabas

    try {
        const rows = await query<User>(
            "SELECT * FROM users"
        )
        console.log(rows);
        res.status(200).json(rows);

    } catch (error) {

        console.log(error);
        res.status(500).send("Internal server error");
    }

});

// CREATE 
app.post("/users/", (req: Request, res: Response) => {

    // Logik för operation till vår postgresdatabas

});

// UPDATE
app.put("/users/:id", (req: Request, res: Response) => {

    // Logik för operation till vår postgresdatabas

});

// DELETE
app.delete("/users/:id", (req: Request, res: Response) => {

    // Logik för operation till vår postgresdatabas

});


// SERVER KÖRS IGÅNG
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});