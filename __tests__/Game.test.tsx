/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import Game from "../app/components/Game";

fetchMock.enableMocks();

function mockCard(value: string, suit: string) {
    const suitShort = suit[0];
    return [
        {
            code: `${value}${suitShort}`,
            image: `https://deckofcardsapi.com/static/img/${value}${suitShort}.png`,
            images: {
                svg: `https://deckofcardsapi.com/static/img/${value}${suitShort}.svg`,
                png: `https://deckofcardsapi.com/static/img/${value}${suitShort}.png`,
            },
            value,
            suit,
        },
    ];
}

describe("Game", () => {
    it("renders the Game component", () => {
        render(<Game deckId="1" />);
        const game = screen.getByTestId("game");
        expect(game).toBeInTheDocument();
    });

    it("contains the Table component", () => {
        render(<Game deckId="1" />);
        const table = screen.getByTestId("table");
        expect(table).toBeInTheDocument();
    });

    it("calls drawCard when the button is clicked", async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({
                success: true,
                cards: mockCard("5", "SPADES"),
                deck_id: "1",
            })
        );
        render(<Game deckId="1" />);
        const button = screen.getByTestId("drawButton");
        fireEvent.click(button);

        await screen.findByAltText("5 of SPADES");

        expect(fetchMock).toHaveBeenCalledWith(
            "https://deckofcardsapi.com/api/deck/1/draw/?count=1"
        );
    });

    it("contains the Draw a card button", () => {
        render(<Game deckId="1" />);
        const button = screen.getByTestId("drawButton");
        expect(button).toBeInTheDocument();
    });

    it("displays Snap Value when the card values match", async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({
                success: true,
                cards: mockCard("5", "SPADES"),
                deck_id: "1",
            })
        );
        render(<Game deckId="1" />);
        const button = screen.getByTestId("drawButton");
        fireEvent.click(button);
        await screen.findByAltText("5 of SPADES");
        fetchMock.mockResponseOnce(
            JSON.stringify({
                success: true,
                cards: mockCard("5", "HEARTS"),
                deck_id: "1",
            })
        );

        fireEvent.click(button);
        await screen.findByAltText("5 of HEARTS");

        const snapValue = screen.getByText("Snap Value!");
        expect(snapValue).toBeInTheDocument();
    });
    it("displays Snap Suit when the card suits match", async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({
                success: true,
                cards: mockCard("5", "SPADES"),
                deck_id: "1",
            })
        );
        render(<Game deckId="1" />);
        const button = screen.getByTestId("drawButton");
        fireEvent.click(button);
        await screen.findByAltText("5 of SPADES");
        fetchMock.mockResponseOnce(
            JSON.stringify({
                success: true,
                cards: mockCard("6", "SPADES"),
                deck_id: "1",
            })
        );

        fireEvent.click(button);
        await screen.findByAltText("6 of SPADES");

        const snapSuit = screen.getByText("Snap Suit!");
        expect(snapSuit).toBeInTheDocument();
    });

    it("calls fetch with the correct URL", () => {
        const fetchSpy = jest.spyOn(window, "fetch");
        render(<Game deckId="1" />);
        const button = screen.getByTestId("drawButton");
        fireEvent.click(button);
        expect(fetchSpy).toHaveBeenCalledWith(
            "https://deckofcardsapi.com/api/deck/1/draw/?count=1"
        );
    });
});
