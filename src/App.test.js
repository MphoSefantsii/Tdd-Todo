import fetchMock from "fetch-mock";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockData from "./data/mockData";
import App from "./App";

beforeEach(() => {
  fetchMock.restore();
  fetchMock.get("*", JSON.stringify(mockData)); // Mock initial fetch
});

afterEach(() => {
  fetchMock.restore();
});

describe("<App /> tests", () => {
  it("renders <App />", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );
  });

  it("should add a todo item", async () => {
    const newTodo = {
      userId: 3,
      id: Math.floor(Math.random() * 100) + 1,
      title: "Do math homework",
      completed: false,
    };

    fetchMock.post("*", JSON.stringify(newTodo));

    render(<App />);
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    userEvent.type(screen.getByRole("textbox"), "Do math homework");
    userEvent.click(screen.getByText(/Add new todo/i));

    await waitFor(() =>
      expect(screen.queryByText(/saving/i)).not.toBeInTheDocument()
    );
    expect(screen.getByText(/Do math homework/i)).toBeInTheDocument();
  });

  it("remove todo from list", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    userEvent.click(screen.getByTestId("close-btn-3"));

    // Ensure that the item is removed
    await waitFor(() =>
      expect(screen.queryByText(/Take out the trash/i)).not.toBeInTheDocument()
    );
  });

  it("todo item should be crossed out after completing", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    userEvent.click(screen.getByTestId("checkbox-1"));

    // Ensure that the item has the "completed" class
    expect(screen.getByText(/eat breakfast/i)).toHaveClass("completed");
  });
});
