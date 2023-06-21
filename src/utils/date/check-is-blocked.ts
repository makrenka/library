import { createDate } from './create-date';

// доступные даты: сегодня + завтра / если пятница = пт + пн / если выходные = пн
export const checkIsBlockedDate = (date: ReturnType<typeof createDate>) => {
    const todayDate = createDate();
    // const zoneOffset = 10800000;
    const dayMs = 86400000;

    const isCurrentDateIsWeekend = date.dayNumberInWeek === 7 || date.dayNumberInWeek === 1;

    const isLessThanToday = date.timestamp < todayDate.timestamp;

    const isTodayFriday =
        todayDate.dayNumberInWeek === 6 && date.timestamp > todayDate.timestamp + dayMs * 3;

    const isTodaySaturday =
        todayDate.dayNumberInWeek === 7 && date.timestamp > todayDate.timestamp + dayMs * 2;

    const isTodaySunday =
        todayDate.dayNumberInWeek === 1 && date.timestamp > todayDate.timestamp + dayMs;

    const isTomorrow =
        todayDate.dayNumberInWeek !== 7 &&
        todayDate.dayNumberInWeek !== 1 &&
        todayDate.timestamp + dayMs < date.timestamp &&
        (todayDate.dayNumberInWeek === 6 ? date.dayNumberInWeek !== 2 : true);

    return (
        isLessThanToday ||
        isTomorrow ||
        isTodayFriday ||
        isTodaySunday ||
        isTodaySaturday ||
        isCurrentDateIsWeekend
    );
};
