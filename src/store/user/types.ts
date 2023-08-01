export type ResponseUser = {
    id: number;
    username: string;
    email: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    phone: string;
    comments: ResponseUserComment[];
    role: UserRole;
    avatar: string;
    booking: UserBooking;
    delivery: UserDelivery;
    history: UserHistory;
};

export type ResponseUsersList = {
    id: number;
    username: string;
    email: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: {
        id: number;
        name: string;
        description: string;
        type: string;
        };
        avatar: string;
        delivery: {
            id: number;
            handed: boolean;
            dateHandedFrom: string;
            dateHandedTo: string;
        };
        historyCount: number;
};

export type UserHistory = {
    id: number;
    books: ShortBookData[];
};

export type UserDelivery = {
    id: number;
    handed: string;
    dateHandedFrom: string | Date;
    dateHandedTo: string | Date;
    book: ShortBookData;
};

export type ResponseUserComment = {
    id: number;
    rating: number;
    text: string;
    bookId: number;
};

export type UserBooking = {
    id: number | null;
    order: string | null;
    dateOrder: string | Date | null;
    book: ShortBookData | null;
};

export type ShortBookData = {
    id: number;
    title: string;
    issueYear: string;
    authors: string[];
    image: null;
};

export type Comment = {
    id: number;
    rating: number;
    text: string;
    createdAt: string;
    user: CommentUser;
};

export type CommentUser = {
    commentUserId: number;
    firstName: string;
    lastName: string;
    avatarUrl: string;
};

type UserRole = {
    id: number;
    name: string;
    description: string;
    type: string;
};

export type UserStateType = {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    isUpdateSuccess: boolean;
    isUpdateLoading: boolean;
    isUpdateError: boolean;
    data: ResponseUser;
    usersList: {
        data: ResponseUsersList;
    }
};

export type UpdateUserActionType = {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
};

export type UploadAvatarActionType = {
    id: number;
    formData: any;
};

export type FileUploadResponseType = {
    id: number;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    createdAt: string;
    updatedAt: string;
};
