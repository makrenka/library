import React, { useState } from 'react';

import { Content } from '../../components/content';
import { Menu } from '../../components/menu';
import { MenuViewEnum } from '../../constants/menu-view';

import styles from './main-page.module.scss';

export const MainPage = () => {
    const [menuView, setMenuView] = useState(MenuViewEnum.window);
    const [checkboxChecked, setCheckboxChecked] = useState(false);

    const onCheckbox = () => {
        setCheckboxChecked(!checkboxChecked);
    };

    return (
        <section className={styles.mainPage} data-test-id='main-page'>
            <Menu menuView={menuView} setMenuView={setMenuView} onCheckbox={onCheckbox} />
            <Content menuView={menuView} checkboxChecked={checkboxChecked} />
        </section>
    );
};
