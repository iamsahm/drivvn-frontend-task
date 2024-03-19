/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import ProbabilityStatus from "../app/components/ProbabilityStatus";
import { Card } from "../app/components/card";

const cards: Card[] = [];

const suits = ["SPADES", "HEARTS", "DIAMONDS", "CLUBS"];
const ranks = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
];

suits.forEach((suit) => {
    ranks.forEach((rank) => {
        const suitShort = suit[0];
        const value = rank;
        const card: Card = {
            code: `${value}${suitShort}`,
            image: `https://deckofcardsapi.com/static/img/${value}${suitShort}.png`,
            images: {
                svg: `https://deckofcardsapi.com/static/img/${value}${suitShort}.svg`,
                png: `https://deckofcardsapi.com/static/img/${value}${suitShort}.png`,
            },
            value: value,
            suit: suit.toUpperCase(),
        };
        cards.push(card);
    });
});

describe("ProbablilityStatus", () => {
    it("should accept an array of cards and return two p elements with text", () => {
        render(<ProbabilityStatus cardsDrawn={cards} />);
        const snapValueProbability = screen.getByTestId("snapValueProbability");
        const suitProbability = screen.getByTestId("suitProbability");
        expect(snapValueProbability).toBeInTheDocument();
        expect(suitProbability).toBeInTheDocument();
    });

    it("should show a string if the passed array is empty", () => {
        render(<ProbabilityStatus cardsDrawn={[]} />);
        const text = screen.getByText(
            "Draw a card to see the probability the next card is a snap"
        );
        expect(text).toBeInTheDocument();
    });
    it("should return the correct probability of a snap suit", () => {
        const currentCard = cards.find((card) => card.code === "AS") as Card; // Ace of Spades
        render(<ProbabilityStatus cardsDrawn={[currentCard]} />);
        const suitProbability = screen.getByTestId("suitProbability");
        expect(suitProbability.textContent).toBe(
            "Probability of a snap suit: 12 in 51"
        );
    });
    it("should return the correct probability of a snap value", () => {
        const currentCard = cards.find((card) => card.code === "AS") as Card; // Ace of Spades
        render(<ProbabilityStatus cardsDrawn={[currentCard]} />);
        const snapValueProbability = screen.getByTestId("snapValueProbability");
        expect(snapValueProbability.textContent).toBe(
            "Probability of a snap value: 3 in 51"
        );
    });
    it("should return the correct probability of a snap suit and value for an array of cards", () => {
        render(
            <ProbabilityStatus cardsDrawn={[cards[3], cards[18], cards[51]]} /> // 4 of Spades, 4 of Hearts, King of Clubs
        );
        const suitProbability = screen.getByTestId("suitProbability");
        const snapValueProbability = screen.getByTestId("snapValueProbability");
        expect(suitProbability.textContent).toBe(
            "Probability of a snap suit: 12 in 49"
        );
        expect(snapValueProbability.textContent).toBe(
            "Probability of a snap value: 3 in 49"
        );
    });
});
