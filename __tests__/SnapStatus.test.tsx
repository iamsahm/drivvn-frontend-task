import React from "react";
import { render, screen } from "@testing-library/react";
import SnapStatus from "../app/components/SnapStatus";

const testSelector = "snapStatus";

describe("SnapStatus", () => {
    it("renders snap suit text when snapSuit is true", () => {
        render(<SnapStatus snapValue={false} snapSuit={true} />);
        const snapStatus = screen.getByTestId(testSelector);
        const snapSuitText = screen
            .getByTestId(testSelector)
            .querySelector("p")?.textContent;
        expect(snapSuitText).toEqual("SNAP SUIT!");
    });
    it("renders snap value text when snapValue is true", () => {
        render(<SnapStatus snapValue={true} snapSuit={false} />);
        const snapStatus = screen.getByTestId(testSelector);
        const snapValueText = screen
            .getByTestId(testSelector)
            .querySelector("p")?.textContent;
        expect(snapValueText).toEqual("SNAP VALUE!");
    });
    it("renders no text when snapValue and snapSuit are false", () => {
        render(<SnapStatus snapValue={false} snapSuit={false} />);
        const snapStatus = screen.getByTestId(testSelector);
        const snapText = screen.getByTestId(testSelector).querySelector("p");
        expect(snapText).toBeNull();
    });
});
