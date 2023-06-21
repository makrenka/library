import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '../button';

import buttonClose from './assets/button-cross.svg';

import styles from './modal.module.scss';

type ModalProps = {
    title?: string;
    onClose?: () => void;
    children?: JSX.Element | JSX.Element[];
    dataTestId?: string;
};

export const Modal = ({ title, onClose, children, dataTestId }: ModalProps) => {
    const el = useRef(document.createElement('div'));

    useEffect(() => {
        const { current } = el;

        document.body.appendChild(current);

        return () => {
            document.body.removeChild(current);
        };
    }, []);

    return createPortal(
        <div
            aria-hidden={true}
            onClick={onClose}
            className={styles.modalOuter}
            data-test-id='modal-outer'
        >
            <div
                className={styles.modalWrapper}
                aria-hidden={true}
                onClick={(e) => e.stopPropagation()}
                data-test-id={dataTestId}
            >
                <Button
                    classButton={styles.buttonClose}
                    onClick={onClose}
                    dataTestId='modal-close-button'
                >
                    <img src={buttonClose} alt='' />
                </Button>
                <div className={styles.title} data-test-id='modal-title'>
                    {title}
                </div>
                {children}
            </div>
        </div>,
        el.current,
    );
};
