/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import Table from "../app/components/Table";

describe("Table", () => {
    const cards = [
        {
            code: "6H",
            image: "https://deckofcardsapi.com/static/img/6H.png",
            images: {
                svg: "https://deckofcardsapi.com/static/img/6H.svg",
                png: "https://deckofcardsapi.com/static/img/6H.png",
            },
            value: "6",
            suit: "HEARTS",
        },
        {
            code: "5S",
            image: "https://deckofcardsapi.com/static/img/5S.png",
            images: {
                svg: "https://deckofcardsapi.com/static/img/5S.svg",
                png: "https://deckofcardsapi.com/static/img/5S.png",
            },
            value: "5",
            suit: "SPADES",
        },
    ];
    it("renders the Table component", () => {
        render(<Table leftCard={cards[0]} rightCard={cards[1]} />);
        const table = screen.getByTestId("table");
        expect(table).toBeInTheDocument();
    });
    it("renders two images", () => {
        render(<Table leftCard={cards[0]} rightCard={cards[1]} />);

        const images = screen.getAllByRole("img");
        expect(images.length).toBe(2);
    });
    it("renders the correct images", () => {
        render(<Table leftCard={cards[0]} rightCard={cards[1]} />);

        const images = screen.getAllByRole("img");
        expect(images[0]).toHaveAttribute("src", cards[0].image);
        expect(images[1]).toHaveAttribute("src", cards[1].image);
    });
    it("renders the correct alt text", () => {
        render(<Table leftCard={cards[0]} rightCard={cards[1]} />);

        const images = screen.getAllByRole("img");
        expect(images[0]).toHaveAttribute(
            "alt",
            `${cards[0].value} of ${cards[0].suit}`
        );
        expect(images[1]).toHaveAttribute(
            "alt",
            `${cards[1].value} of ${cards[1].suit}`
        );
    });
});
