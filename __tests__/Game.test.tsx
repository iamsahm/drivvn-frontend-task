/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
    it("contains the SnapStatus component", () => {
        render(<Game deckId="1" />);
        const snapStatus = screen.getByTestId("snapStatus");
        expect(snapStatus).toBeInTheDocument();
    });
    it("initially displays the placeholder cards", () => {
        render(<Game deckId="1" />);
        const cards = screen.getAllByAltText("0 of 0");
        expect(cards).toHaveLength(2);
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

        const snapValue = screen.getByText("SNAP VALUE!");
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

        const snapSuit = screen.getByText("SNAP SUIT!");
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
    it("doesn't have the draw card button when all the cards have been drawn", async () => {
        render(<Game deckId="1" />);
        const button = screen.getByTestId("drawButton");
        const cardValues = [
            "ACE",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "JACK",
            "QUEEN",
            "KING",
        ];
        const suits = ["SPADES", "DIAMONDS", "CLUBS", "HEARTS"];

        for (let suit of suits) {
            for (let value of cardValues) {
                fetchMock.mockResponseOnce(
                    JSON.stringify({
                        success: true,
                        cards: mockCard(value, suit),
                        deck_id: "1",
                    }),
                    { status: 200 }
                );
                fireEvent.click(button);
                await screen.findByAltText(`${value} of ${suit}`);
            }
        }
        expect(button).not.toBeInTheDocument();
    });
    it("displays the number of value and suit matches when the game is over", async () => {
        render(<Game deckId="1" />);
        const button = screen.getByTestId("drawButton");
        const cardValues = [
            "ACE",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "JACK",
            "QUEEN",
            "KING",
        ];
        const suits = ["SPADES", "DIAMONDS", "CLUBS", "HEARTS"];

        for (let suit of suits) {
            for (let value of cardValues) {
                fetchMock.mockResponseOnce(
                    JSON.stringify({
                        success: true,
                        cards: mockCard(value, suit),
                        deck_id: "1",
                    }),
                    { status: 200 }
                );
                fireEvent.click(button);
                await screen.findByAltText(`${value} of ${suit}`);
            }
        }
        const valueMatches = await screen.findByText("VALUE MATCHES: 0");
        const suitMatches = await screen.findByText("SUIT MATCHES: 48");
        expect(valueMatches).toBeInTheDocument();
        expect(suitMatches).toBeInTheDocument();
    });

    it("displays the number of value matches when every card has the same number at game over", async () => {
        render(<Game deckId="1" />);
        const button = screen.getByTestId("drawButton");
        const suits = ["SPADES", "DIAMONDS", "CLUBS", "HEARTS"];

        for (let i = 0; i < 13; i++) {
            for (let suit of suits) {
                fetchMock.mockResponseOnce(
                    JSON.stringify({
                        success: true,
                        cards: mockCard("Ace", suit),
                        deck_id: "1",
                    }),
                    { status: 200 }
                );
                fireEvent.click(button);
                await screen.findByAltText(`Ace of ${suit}`);
            }
        }
        const valueMatches = await screen.findByText("VALUE MATCHES: 51");
        const suitMatches = await screen.findByText("SUIT MATCHES: 0");
        expect(valueMatches).toBeInTheDocument();
        expect(suitMatches).toBeInTheDocument();
    });
});
