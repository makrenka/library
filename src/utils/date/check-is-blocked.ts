import { createDate } from './create-date';

// Бронирование: доступные даты: сегодня + завтра / если пятница = пт + пн / если выходные = пн
// Выдача: доступные даты: сегодня + две недели / выходные недоступны
export const checkIsBlockedDate = (date: ReturnType<typeof createDate>, days: number) => {
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

    const isBookingDeliveryTime =
        todayDate.dayNumberInWeek !== 7 &&
        todayDate.dayNumberInWeek !== 1 &&
        todayDate.timestamp + dayMs * days < date.timestamp &&
        (todayDate.dayNumberInWeek === 6 ? date.dayNumberInWeek !== 2 : true);

    return (
        isLessThanToday ||
        isBookingDeliveryTime ||
        isTodayFriday ||
        isTodaySunday ||
        isTodaySaturday ||
        isCurrentDateIsWeekend
    );
};
