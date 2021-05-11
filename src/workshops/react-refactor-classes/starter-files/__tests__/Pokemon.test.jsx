import React from "react";
import { render, screen } from "@testing-library/react";
import Pokemon from "../workshop/Pokemon";

function mockResponse(name) {
  return {
    ok: true,
    json: () =>
      Promise.resolve({
        name,
        sprites: { front_default: "https://fake.com" },
      }),
  };
}

describe("Pokemon component", () => {
  test("Fetches pokemon data and renders it", async () => {
    const name = "charizard";
    window.fetch = jest.fn().mockResolvedValueOnce(mockResponse(name));

    render(<Pokemon name={name} />);

    // should show loading straight away
    screen.getByText(/Loading.../i);
    // should immediately start fetching
    expect(window.fetch).toHaveBeenCalledTimes(1);

    // should eventually load the pokemon's name/image
    await screen.findByText(name);
    await screen.findByAltText(`${name} default sprite`);
  });

  test("Refetches pokemon data when name prop changes", async () => {
    window.fetch = jest
      .fn()
      // first fetch returns Charizard
      .mockResolvedValueOnce(mockResponse("charizard"))
      // second fetch returns Pikachu
      .mockResolvedValueOnce(mockResponse("pikachu"));

    const { rerender } = render(<Pokemon name="charizard" />);

    // should eventually load Charizard
    await screen.findByText("charizard");

    // re-render component with new name prop
    rerender(<Pokemon name="pikachu" />);

    // new pokemon (pikachu) should be fetched and rendered
    await screen.findByText("pikachu");
    await screen.findByAltText(`pikachu default sprite`);

    expect(window.fetch).toHaveBeenCalledTimes(2);
  });

  test("Does not refetch data if unrelated prop changes", async () => {
    const name = "charizard";
    window.fetch = jest.fn().mockResolvedValueOnce(mockResponse(name));

    const { rerender } = render(<Pokemon name={name} />);

    // Charizard should eventually be rendered
    await screen.findByText(name);

    // re-render with the name prop unchanged
    rerender(<Pokemon name={name} blah="whatever" />);

    // Charizard should still be there after re-render
    screen.getByText(name);

    // fetch should only be called once even though the comp rendered twice
    expect(window.fetch).toHaveBeenCalledTimes(1);
  });
});
