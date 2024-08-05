/* eslint-disable testing-library/prefer-presence-queries */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "./TodoItem";
import mockData from "../data/mockData";

describe("<TodoItem /> tests", () => {
  it("should render todo item properly", () => {
    render(
      <TodoItem
        todo={mockData[0]}
        removeHandler={() => {}}
        updateTodo={() => {}}
      />
    );
    expect(screen.queryByText(/Eat breakfast/i)).toBeInTheDocument();
    expect(screen.getByTestId("close-btn-1")).toBeInTheDocument();
  });

  it("should render todo item with checkbox", () => {
    render(
      <TodoItem
        todo={mockData[0]}
        removeHandler={() => {}}
        updateTodo={() => {}}
      />
    );
    expect(screen.getByTestId("checkbox-1")).toBeInTheDocument();
    expect(screen.queryByText(/Eat breakfast/i)).toBeInTheDocument();
  });

  it("should call removeHandler when remove button is clicked", () => {
    const removeHandler = jest.fn();
    render(
      <TodoItem
        todo={mockData[0]}
        removeHandler={removeHandler}
        updateTodo={() => {}}
      />
    );
    fireEvent.click(screen.getByTestId("close-btn-1"));
    expect(removeHandler).toHaveBeenCalledWith(1);
  });

  it("should call updateTodo when checkbox is clicked", () => {
    const updateTodo = jest.fn();
    render(
      <TodoItem
        todo={mockData[0]}
        removeHandler={() => {}}
        updateTodo={updateTodo}
      />
    );
    fireEvent.click(screen.getByTestId("checkbox-1"));
    expect(updateTodo).toHaveBeenCalledWith(1);
  });
});
