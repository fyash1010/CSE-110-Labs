import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe("create an expense", () =>  {
  test('create an expense', () => {
    render(<App />);

    const expenseNameInput = screen.getByLabelText(/name/i);
    const expenseCostInput = screen.getByLabelText(/cost/i);
    const saveExpenseButton = screen.getByText("Save");

    fireEvent.change(expenseNameInput, { target: { value: "Test expense 1" } });
    fireEvent.change(expenseCostInput, { target: { value: "9" } });
    fireEvent.click(saveExpenseButton);

    const newExpenseName = screen.getByText("Test expense 1");
    const newExpenseCost = screen.getByText("$9");
    const totalSpent = screen.getByText("Spent so far: $9");
    const remaining = screen.getByText("Remaining: $991");

    expect(newExpenseName).toBeInTheDocument();
    expect(newExpenseCost).toBeInTheDocument();
    expect(totalSpent).toBeInTheDocument();
    expect(remaining).toBeInTheDocument();

    expect(screen.getAllByRole('listitem').length).toBe(1);
  });

  test('multiple tests created', () => {
    render(<App />);

    const expenseNameInput = screen.getByLabelText(/name/i);
    const expenseCostInput = screen.getByLabelText(/cost/i);
    const saveExpenseButton = screen.getByText("Save");

    fireEvent.change(expenseNameInput, { target: { value: "Test expense 1" } });
    fireEvent.change(expenseCostInput, { target: { value: "9" } });
    fireEvent.click(saveExpenseButton);
    fireEvent.click(saveExpenseButton);
    fireEvent.click(saveExpenseButton);

    expect(screen.getAllByRole('listitem').length).toBe(3);
  });
});

describe("delete an expense", () => {
  test('delete an expense', () => {
    render(<App />);

    const expenseNameInput = screen.getByLabelText(/name/i);
    const expenseCostInput = screen.getByLabelText(/cost/i);
    const saveExpenseButton = screen.getByText("Save");

    fireEvent.change(expenseNameInput, { target: { value: "Test expense 1" } });
    fireEvent.change(expenseCostInput, { target: { value: "9" } });
    fireEvent.click(saveExpenseButton);
    fireEvent.click(saveExpenseButton);
    fireEvent.click(saveExpenseButton);

    expect(screen.getAllByRole('listitem').length).toBe(3);

    fireEvent.click(screen.getAllByTestId('deleteExpense')[0]);

    expect(screen.getAllByRole('listitem').length).toBe(2);

    const totalSpent = screen.getByText("Spent so far: $18");
    const remaining = screen.getByText("Remaining: $982");

    expect(totalSpent).toBeInTheDocument();
    expect(remaining).toBeInTheDocument();
  });

  test('resets total', () => {
    render(<App />);

    const expenseNameInput = screen.getByLabelText(/name/i);
    const expenseCostInput = screen.getByLabelText(/cost/i);
    const saveExpenseButton = screen.getByText("Save");

    fireEvent.change(expenseNameInput, { target: { value: "Test expense 1" } });
    fireEvent.change(expenseCostInput, { target: { value: "9" } });
    fireEvent.click(saveExpenseButton);

    const totalSpent = screen.getByText("Spent so far: $9");
    const remaining = screen.getByText("Remaining: $991");

    expect(totalSpent).toBeInTheDocument();
    expect(remaining).toBeInTheDocument();

    fireEvent.click(screen.getAllByTestId('deleteExpense')[0]);

    const finalTotalSpent = screen.getByText("Spent so far: $0");
    const finalRemaining = screen.getByText("Remaining: $1000");

    expect(finalTotalSpent).toBeInTheDocument();
    expect(finalRemaining).toBeInTheDocument();
  });
});

describe("budget balance verification", () => {
  test('budget balance verification', () => {
    render(<App />);

    const expenseNameInput = screen.getByLabelText(/name/i);
    const expenseCostInput = screen.getByLabelText(/cost/i);
    const saveExpenseButton = screen.getByText("Save");

    fireEvent.change(expenseNameInput, { target: { value: "Test expense 1" } });
    fireEvent.change(expenseCostInput, { target: { value: "9" } });
    fireEvent.click(saveExpenseButton);
    fireEvent.click(saveExpenseButton);

    const remainingText = screen.getByText("Remaining: $982").textContent;
    const spentText = screen.getByText("Spent so far: $18").textContent;

    const remainingAmount = parseInt(remainingText!.match(/\d+/)?.[0] || "0");
    const spentAmount = parseInt(spentText!.match(/\d+/)?.[0] || "0");
    expect(remainingAmount + spentAmount).toBe(1000);

    fireEvent.click(screen.getAllByTestId('deleteExpense')[0]);

    const finalRemainingText = screen.getByText("Remaining: $991").textContent;
    const finalSpentText = screen.getByText("Spent so far: $9").textContent;

    const finalRemainingAmount = parseInt(finalRemainingText!.match(/\d+/)?.[0] || "0");
    const finalSpentAmount = parseInt(finalSpentText!.match(/\d+/)?.[0] || "0");
    expect(remainingAmount + spentAmount).toBe(1000);
   })
});