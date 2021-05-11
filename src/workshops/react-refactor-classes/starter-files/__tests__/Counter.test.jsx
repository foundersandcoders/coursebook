import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Counter from "../workshop/Counter";

describe("Counter component", () => {
  test("Buttons increment and decrement count", () => {
    render(<Counter />);

    screen.getByText(/count is 0/i);

    const decButton = screen.getByLabelText(/decrement count/i);
    fireEvent.click(decButton);
    screen.getByText(/count is -1/i);

    const incButton = screen.getByLabelText(/increment count/i);
    fireEvent.click(incButton);
    fireEvent.click(incButton);
    screen.getByText(/count is 1/i);
  });
});
