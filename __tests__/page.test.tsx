/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import Page from "../app/page";

fetchMock.enableMocks();

describe("Page component", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test("renders Game component with correct deckId", async () => {
        const mockApiResponse = {
            success: true,
            deck_id: "test-deck-id",
            shuffled: true,
            remaining: 52,
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockApiResponse));

        render(<Page />);

        await waitFor(() => {
            expect(screen.getByTestId("game")).toBeInTheDocument();
            expect(fetchMock).toHaveBeenCalledTimes(1);
            expect(fetchMock).toHaveBeenCalledWith(
                "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
            );
        });
    });

    test("handles fetch error", async () => {
        jest.spyOn(console, "error").mockImplementation(() => {}); // Mock console.error

        fetchMock.mockRejectOnce(new Error("Fetch error"));

        render(<Page />);

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledTimes(1);
        });
    });
});
