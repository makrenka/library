import React, { useEffect, useRef, useState } from "react"

export const useClickOutside = (isVisible: boolean) => {

    const [isShow, setIsShow] = useState(isVisible);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: React.MouseEvent) => {
        if (!ref.current?.contains(event.target as HTMLDivElement)) {
            setIsShow(false);
        };
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside as () => void);
        return () => {
            document.removeEventListener('click', handleClickOutside as () => void);
        };
    });

    return { ref, isShow, setIsShow };
};