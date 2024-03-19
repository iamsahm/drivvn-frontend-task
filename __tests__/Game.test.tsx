/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import Game from "../app/components/Game";

fetchMock.enableMocks();

function mockSuccessfulCardDrawResponse(
    value: string,
    suit: string,
    deckId: string,
    remaining: number
) {
    const suitShort = suit[0].toUpperCase();
    return {
        success: true,
        deck_id: deckId,
        cards: [
            {
                code: `${value}${suitShort}`,
                image: `https://deckofcardsapi.com/static/img/${value}${suitShort}.png`,
                images: {
                    svg: `https://deckofcardsapi.com/static/img/${value}${suitShort}.svg`,
                    png: `https://deckofcardsapi.com/static/img/${value}${suitShort}.png`,
                },
                value: value,
                suit: suit.toUpperCase(),
            },
        ],
        remaining: remaining,
    };
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
        const mockResponse = mockSuccessfulCardDrawResponse(
            "5",
            "SPADES",
            "1",
            51
        );
        fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

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
            JSON.stringify(
                mockSuccessfulCardDrawResponse("5", "SPADES", "1", 51)
            )
        );
        render(<Game deckId="1" />);
        const button = screen.getByTestId("drawButton");
        fireEvent.click(button);
        await screen.findByAltText("5 of SPADES");
        fetchMock.mockResponseOnce(
            JSON.stringify(
                mockSuccessfulCardDrawResponse("5", "HEARTS", "1", 50)
            )
        );

        fireEvent.click(button);
        await screen.findByAltText("5 of HEARTS");

        const snapValue = screen.getByText("SNAP VALUE!");
        expect(snapValue).toBeInTheDocument();
    });
    it("displays Snap Suit when the card suits match", async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify(
                mockSuccessfulCardDrawResponse("5", "SPADES", "1", 51)
            )
        );

        render(<Game deckId="1" />);
        const button = screen.getByTestId("drawButton");
        fireEvent.click(button);
        await screen.findByAltText("5 of SPADES");
        fetchMock.mockResponseOnce(
            JSON.stringify(
                mockSuccessfulCardDrawResponse("6", "SPADES", "1", 50)
            )
        );
        fireEvent.click(button);
        await screen.findByAltText("6 of SPADES");
        const snapSuit = screen.getByText("SNAP SUIT!");
        expect(snapSuit).toBeInTheDocument();
    });

    it("calls fetch with the correct URL", async () => {
        const fetchSpy = jest.spyOn(window, "fetch");
        render(<Game deckId="1" />);
        const button = screen.getByTestId("drawButton");
        fireEvent.click(button);
        expect(fetchSpy).toHaveBeenCalledWith(
            "https://deckofcardsapi.com/api/deck/1/draw/?count=1"
        );
    });
    it("displays the correct end game messages", async () => {
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
        let suitIndex = 0;
        let valueIndex = 0;
        for (let i = 0; i < 52; i++) {
            fetchMock.mockResponseOnce(
                JSON.stringify(
                    mockSuccessfulCardDrawResponse(
                        cardValues[valueIndex],
                        suits[suitIndex],
                        "1",
                        51 - i
                    )
                )
            );
            if (i === 0) {
                render(<Game deckId="1" />);
            }
            const button = screen.getByTestId("drawButton");
            fireEvent.click(button);
            await screen.findByAltText(
                `${cardValues[valueIndex]} of ${suits[suitIndex]}`
            );
            valueIndex++;
            if (valueIndex === cardValues.length) {
                valueIndex = 0;
                suitIndex++;
            }
        }
        expect(screen.getByText("VALUE MATCHES: 0")).toBeInTheDocument();
        expect(screen.getByText("SUIT MATCHES: 48")).toBeInTheDocument();
    });
    it("displays the cards remaining count", async () => {
        render(<Game deckId="1" />);
        const button = screen.getByTestId("drawButton");
        fetchMock.mockResponseOnce(
            JSON.stringify(
                mockSuccessfulCardDrawResponse("5", "SPADES", "1", 51)
            )
        );
        fireEvent.click(button);
        await screen.findByAltText("5 of SPADES");
        expect(screen.getByText("Cards remaining: 51")).toBeInTheDocument();
    });
    it("displays the probability of a snap value next draw", async () => {
        render(<Game deckId="1" />);
        const button = screen.getByTestId("drawButton");
        fetchMock.mockResponseOnce(
            JSON.stringify(
                mockSuccessfulCardDrawResponse("5", "SPADES", "1", 51)
            )
        );
        fireEvent.click(button);
        await screen.findByAltText("5 of SPADES");
        fetchMock.mockResponseOnce(
            JSON.stringify(
                mockSuccessfulCardDrawResponse("5", "HEARTS", "1", 50)
            )
        );
        fireEvent.click(button);
        await screen.findByAltText("5 of HEARTS");
        expect(screen.getByTestId("snapValueProbability")).toBeInTheDocument();
        expect(
            screen.getByText("Probability of a snap value: 1 in 51")
        ).toBeInTheDocument();
    });
});
