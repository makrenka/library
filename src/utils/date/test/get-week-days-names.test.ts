import { describe } from "@jest/globals";
import { getWeekDaysNames } from "../get-week-days-names";

describe('week days names', () => {
    it('gets week days array', () => {
        const day = {
            day: "воскресенье",
            dayShort: "вс",
        };

        expect(getWeekDaysNames()).toHaveLength(7);
        expect(getWeekDaysNames()).toContainEqual(day);
    });
});