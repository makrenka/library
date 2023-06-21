export type ToastType = {
    type: 'warning' | 'normal' | 'success' | 'error';
    text: string;
};

export type ViewType = {
    toasts: ToastType[];
};
