import { useState } from 'react';

import { Search } from '../search';
import { Button } from '../button';

import styles from './admin-menu.module.scss';

import sortDesc from './assets/sort-desc.svg';
import sortAsc from './assets/sort-asc.svg';

export const AdminMenu = () => {
    const [isSearhView, setSearhView] = useState(true);
    const [isSortView, setIsSortView] = useState(true);
    const [isSortedDesc, setIsSortedDesc] = useState(true);

    return (
        <div className={styles.adminMenu}>
            <Search isSearhView={isSearhView} setSearhView={setSearhView} isSortView={isSortView} />
            <Button classButton={styles.buttonSort} onClick={() => setIsSortedDesc(!isSortedDesc)}>
                <span>{isSortedDesc ? 'Сортировка от А до Я' : 'Сортировка от Я до А'}</span>
                <img
                    src={isSortedDesc ? sortDesc : sortAsc}
                    alt='icon-sort'
                    className={styles.buttonSortImg}
                />
            </Button>
        </div>
    );
};
