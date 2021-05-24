import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Keyboard from "../workshop/Keyboard";

describe("Keyboard component", () => {
  test("The previously pressed key string is rendered", () => {
    render(<Keyboard />);

    fireEvent.keyDown(window, { key: "ArrowUp" });
    screen.getByText(/arrowup/i);

    fireEvent.keyDown(window, { key: "Enter" });
    screen.getByText(/enter/i);
  });

  test("Event listener should be removed when component unmounts", () => {
    // mock console.error so we can check if an error happened
    global.console.error = jest.fn(() => {});

    // render component then immediately remove from DOM
    const { unmount } = render(<Keyboard />);
    unmount();

    // press key and check there was no error
    // this proves the component correctly cleaned up its event listener
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(global.console.error).not.toHaveBeenCalled();
  });

  test("Only adds one keydown event listener", () => {
    // mock addEventListener so we can count how many times its called
    const actualAddEventListener = global.addEventListener;
    let keydownListeners = 0;
    global.addEventListener = jest.fn().mockImplementation((event, cb) => {
      if (event === "keydown") keydownListeners += 1; // keep track of how many keydownListeners have happened
      actualAddEventListener(event, cb); // run the real addEventListener after
    });

    render(<Keyboard />);

    fireEvent.keyDown(window, { key: "ArrowUp" });
    screen.getByText(/arrowup/i);

    fireEvent.keyDown(window, { key: "Enter" });
    screen.getByText(/enter/i);

    // proves component only ran window.addEventListener once
    expect(keydownListeners).toBe(1);

    // put addEventListener back to normal
    global.addEventListener = actualAddEventListener;
  });
});
