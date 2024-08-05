/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import mockData from "./data/mockData";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url === "https://jsonplaceholder.typicode.com/todos") {
      return Promise.resolve({
        json: () => Promise.resolve(mockData),
      });
    }
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          userId: 3,
          id: Math.floor(Math.random() * 10000) + 1,
          title: "Do math homework",
          completed: false,
        }),
    });
  });
});

describe("<App /> tests", () => {
  it("should add a todo item", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).toBeNull();
    });
    userEvent.type(screen.getByRole("textbox"), "Do math homework");
    userEvent.click(screen.getByText(/Add new todo/i));
    await waitFor(() => {
      expect(screen.queryByText(/saving/i)).toBeNull();
    });
    expect(screen.getByText(/Do math homework/i)).toBeInTheDocument();
  });

  it("should remove a todo from the list", async () => {
    render(<App />);
    await waitFor(() => expect(screen.queryByText(/loading/i)).toBeNull());
    expect(screen.getByText(/Take out the trash/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId("close-btn-3"));
    await waitFor(() =>
      expect(screen.queryByText(/Take out the trash/i)).toBeNull()
    );
  });
});
