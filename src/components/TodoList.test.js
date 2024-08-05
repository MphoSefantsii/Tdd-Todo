import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";
import mockData from "../data/mockData";

describe("todo list test", () => {
  it("should show title of todos", () => {
    render(<TodoList todos={mockData} />);
    mockData.forEach((todoItem) =>
      expect(screen.getByText(todoItem.title)).toBeInTheDocument()
    );
  });
});
