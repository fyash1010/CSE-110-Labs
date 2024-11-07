import { Database } from "sqlite/build/Database";
import { Expense } from "../types";
import { Request, Response } from "express";

export async function createExpenseServer(req: Request, res: Response, db: Database) {
    try {
        // Type casting the request body to the expected format.
        const { id, cost, description } = req.body as { id: string, cost: number, description: string };
        if (!description || !id || !cost) {
            return res.status(400).send({ error: "Missing required fields" });
        }
 
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
        res.status(201).send({ id, description, cost });
    } catch (error) {
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
 } 

export async function deleteExpense(req: Request, res: Response, db: Database) {
    // TO DO: Implement deleteExpense function
    try {
        const { id } = req.params as { id: string };
        if (!id) {
            return res.status(400).send({ error: "Missing required fields" });
        }

        if (await db.get('SELECT * FROM expenses WHERE id = ?', [id])) {
            await db.run('DELETE FROM expenses WHERE id = ?', [id]);
            res.status(200).send({ id });
        } else {
            return res.status(404).send({ error: "Expense not found" });
        }
    } catch (error) {
        return res.status(400).send({ error: `Expense could not be deleted, + ${error}` });
    };
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    try {
        res.status(200).send({ "data": await db.all('SELECT * FROM expenses') });
    } catch (error) {
        return res.status(400).send({ error: `Expenses could not be retrieved, + ${error}` });
    }
}