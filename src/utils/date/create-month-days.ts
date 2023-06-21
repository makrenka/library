import { createDate } from './create-date';
import { getMonthNumberOfDays } from './get-month-number-of-days';

export const createMonthDays = (
    monthIndex = new Date().getMonth(),
    year = new Date().getFullYear(),
    locale = 'default',
) => {
    const getDay = (dayNumber: number) =>
        createDate({ date: new Date(year, monthIndex, dayNumber), locale });

    const days = [];

    for (let i = 0; i <= getMonthNumberOfDays(monthIndex, year) - 1; i += 1) {
        days[i] = getDay(i + 1);
    }

    return days;
};
