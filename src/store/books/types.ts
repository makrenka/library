import { Comment, ShortBookData } from '../user/types';

export type BooksType = {
    bookList: {
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        data: null | BookListItem[];
        dataAdmin: null | BookListItem[];
        dataProfile: null | BookListItem[];
    };
    book: {
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        data: null | BookDataType;
    };
    bookCategories: {
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        data: null | BookCategoriesDataType;
    };
    booking: {
        id: string | null | number;
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        isOpenBookingModal: boolean;
        data: BookingResponseSuccess | null;
        bookId: null | string | number;
        isBookingEdit: boolean;
        bookingDate: null | string;
        message: string | null;
        isOnBookInfoPage?: boolean;
    };
    delivery: {
        id: string | null | number;
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        data: DeliveryResponseSuccess | null;
        bookIdDelivery: null | string | number;
        isDeliveryEdit: boolean;
        dateHandedFrom: null | string;
        dateHandedTo: null | string;
        message: string | null;
        isOnBookInfoPage?: boolean;
        isDelivery: boolean;
        userId: string | null | number;
    };
    bookReview: {
        bookId: string | null | number;
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        isOpenReviewModal: boolean;
        data: BookRateSuccess | null;
        message: string | null;
        userId?: number;
    };
    history: {
        books: ShortBookData[] | null;
        id: number | null | string;
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        data: HistoryResponseSuccess | null;
    };
};

export type BookListItem = {
    issueYear: string;
    rating: number;
    title: string;
    authors: string[];
    image: {
        url: string;
    };
    categories: string[];
    id: number;
    booking: {
        id: number;
        order: boolean;
        dateOrder: string;
        customerId: number;
        customerFirstName: string;
        customerLastName: string;
    };
    delivery: {
        id: number;
        handed: boolean;
        dateHandedTo: string;
        dateHandedFrom: string;
        recipientId: number;
        recipientFirstName: string;
        recipientLastName: string;
    };
    histories: [
        {
            id: number;
            userId: number;
        },
    ];
};

export type BookDataType = {
    id: number;
    title: string;
    rating: number;
    issueYear: string;
    description: string;
    publish: string;
    pages: string;
    cover: string;
    weight: string;
    format: string;
    ISBN: string;
    producer: string;
    authors: string[];
    images: [
        {
            url: string;
        },
    ];
    categories: string[];
    comments: Comment[];

    booking: {
        id: number;
        order: boolean;
        dateOrder: string;
        customerId: number;
    };
    delivery: {
        id: number;
        handed: boolean;
        dateHandedFrom: string;
        dateHandedTo: string;
        recipientId: number;
    };
    histories: [
        {
            id: number;
            userId: number;
        },
    ];
};

export type BookCategoriesItem = {
    name: string;
    path: string;
    id: number;
};

export type BookingModalPayload = {
    showModal: boolean;
    bookId: string | null | number;
    isBookingEdit?: boolean;
    bookingId?: string | null | number;
    bookingDate?: string | null;
    isOnBookInfoPage?: boolean;
};

export type DeliveryModalPayload = {
    showModal: boolean;
    bookIdDelivery: string | null | number;
    deliveryId?: string | null | number;
    isDeliveryEdit?: boolean;
    dateHandedFrom?: string | null;
    dateHandedTo?: string | null;
    isDelivery: boolean;
    userId?: string | null | number;
};

export type BookCategoriesDataType = BookCategoriesItem[];

export type BookingResponseSuccess = {
    id: number | string;
    attributes: {
        order: true;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        dateOrder: string;
    };
};

export type DeliveryResponseSuccess = {
    id: number | string;
    attributes: {
        handed: true;
        dateHandedTo: string;
        dateHandedFrom: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
};

export type HistoryResponseSuccess = {
    id: number | string;
    attributes: {
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
};

export type BookingPayload = { dateOrder: string | Date; bookId: string | number | null };

export type BookingUpdatePayload = BookingPayload & { bookingId: string | number | null };

export type BookRateSuccess = {
    id: number | string;
    attributes: {
        rating: number | string;
        text: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
};

export type DeliveryPayload = {
    deliveryDateFrom: string | Date;
    deliveryDateTo: string | Date;
    bookIdDelivery: string | number | null;
};

export type DeliveryUpdatePayload = DeliveryPayload & { deliveryId: string | number | null };

export type HistoryPayload = {
    bookIdDelivery: number | null | string;
};

export type HistoryAddPayload = {
    historyId: number | null | string;
    bookIdDelivery: number | null | string;
};
