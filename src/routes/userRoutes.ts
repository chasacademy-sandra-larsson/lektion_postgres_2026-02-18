import { query } from "./../db.js"
import { Router, Request, Response } from "express";


interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

const router = Router();

// CRUD för vår resurs users 

// GET ONE
router.get("/:id", async (req: Request, res: Response) => {

    const { id } = req.params;

    // Logik för operation till vår postgresdatabas
    try {
        const rows = await query<User>(
            "SELECT * from users WHERE id = $1",
            [id]
        )
        console.log(rows[0]);
        res.status(200).json(rows[0]);
    
    } catch(error) {
        console.error(error);
        res.status(500).send("Internal server error");

    }
 
});

// GET MANY
router.get("/", async (req: Request, res: Response) => {

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
router.post("/", async (req: Request, res: Response) => {

    const {name, email, password} = req.body;

    // Logik för operation till vår postgresdatabas
    try {
        const rows = await query<User>(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, password]
        );
        res.status(201).json(rows[0]);

    } catch (error){
         console.log(error);
        res.status(500).send("Internal server error");
    }

});

// UPDATE
router.put("/:id", async (req: Request, res: Response) => {

    const { id } = req.params;
    const { name, email, password } = req.body;

    // Logik för operation till vår postgresdatabas
    try {

        const rows = await query<User>(
            "UPDATE users SET name = $1, email = $2, password = $3  WHERE id = $4 RETURNING *",
            [name, email, password, id]
        );
        console.log(`Updated ${id} with ${name} ${email} ${password}`)
        res.status(200).json(rows[0]);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");

    }

});

// DELETE
router.delete("/:id", async (req: Request, res: Response) => {

    // Logik för operation till vår postgresdatabas
    try {
        const { id } = req.params;
        const rows = await query<User>(
            "DELETE from users where id = $1",
            [id]
        )
        res.status(204).json(rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }

});

export default router;