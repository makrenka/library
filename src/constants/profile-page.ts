export const PROFILE = 'profile';

export const BOOKING_DATA: BookingDataType = {
    title: 'Забронированная книга',
    titleAdmin: 'Забронированная книга',
    subtitle: 'Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь',
    data: 'Забронируйте книгу и она отобразится',
    dataAdmin: 'Нет забронированных книг',
    expiredTitle: 'Дата бронирования книги истекла',
    expiredSubtitle: 'Через 24 часа книга будет  доступна всем',
};

export const TAKEN_DATA = {
    title: 'Книга которую взяли',
    titleAdmin: 'Книга на руках',
    subtitle: 'Здесь можете просмотреть информацию о книге и узнать сроки возврата',
    data: 'Прочитав книгу, она отобразится в истории',
    dataAdmin: 'Нет книг на руках',
    expiredTitle: 'Вышел срок пользования книги',
    expiredSubtitle: 'Верните книгу, пожалуйста',
};

export type BookingDataType = {
    title: string;
    titleAdmin?: string;
    subtitle: string;
    data: string;
    dataAdmin?: string;
    expiredSubtitle: string;
    expiredTitle: string;
};
