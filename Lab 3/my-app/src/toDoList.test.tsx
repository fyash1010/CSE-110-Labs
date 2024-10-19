import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constants";


test("all grocery items shown", () => {
    render(<ToDoList />);

    dummyGroceryList.forEach((item) => {
        const listItem = screen.getByText(item.name);
        expect(listItem).toBeInTheDocument();
    });
});

test("title shows checked", () => {
	render(<ToDoList />);

  const boughtText = screen.getByText(/Items bought:/i);

  expect(boughtText).toHaveTextContent('Items bought: 0');

  fireEvent.click(screen.getByTestId('checkbox-Bananas'));
  fireEvent.click(screen.getByTestId('checkbox-Apples'));
  expect(boughtText).toHaveTextContent('Items bought: 2');

  fireEvent.click(screen.getByTestId('checkbox-Apples'));
  expect(boughtText).toHaveTextContent('Items bought: 1');
});