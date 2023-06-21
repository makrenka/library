import { getWeekNumber } from './get-week-number';

interface CreateDateParams {
    locale?: string;
    date?: Date;
}

export const createDate = (params?: CreateDateParams) => {
    const locale = params?.locale ?? 'default';

    const tzOffset = new Date().getTimezoneOffset() * 60000;

    const startOfToday = new Date();

    startOfToday.setHours(0, 0, 0, 0);

    // const defaultDateWithOffset = new Date().getTime() - tzOffset;
    const defaultDateWithOffset = startOfToday.getTime() - tzOffset;

    const d = params?.date
        ? new Date(params.date.getTime() - tzOffset)
        : new Date(defaultDateWithOffset);
    const dayNumber = d.getDate();
    const day = d.toLocaleDateString(locale, { weekday: 'long' });
    const dayNumberInWeek = d.getDay() + 1; // вс = 1 сб = 7
    const dayShort = d.toLocaleDateString(locale, { weekday: 'short' });
    const year = d.getFullYear();
    const yearShort = d.toLocaleDateString(locale, { year: '2-digit' });
    const month = d.toLocaleDateString(locale, { month: 'long' });
    const monthShort = d.toLocaleDateString(locale, { month: 'short' });
    const monthNumber = d.getMonth() + 1;
    const monthIndex = d.getMonth();
    const timestamp = d.getTime();
    const week = getWeekNumber(d);

    return {
        date: d,
        dayNumber,
        day,
        dayNumberInWeek,
        dayShort,
        year,
        yearShort,
        month,
        monthShort,
        monthNumber,
        monthIndex,
        timestamp,
        week,
    };
};
