import { Response } from 'express';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}

// Function to update the budget
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    const { amount: amtStr } = body;
    const amount = parseInt(amtStr);

    // Check if the 'amount' field is provided and is a valid number
    if (amount === undefined || typeof amount !== "number" || amount < 0) {
        return res.status(400).send({ error: "Invalid or missing 'amount' field" });
    }

    // Update the budget amount
    budget.amount = amount;

    // Send the updated budget as a response
    res.status(200).send({ message: "Budget updated successfully", budget });
}
