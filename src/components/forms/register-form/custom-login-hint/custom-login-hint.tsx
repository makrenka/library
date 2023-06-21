import classNames from 'classnames';

import { validateForDigit, validateForLatinLetters } from '../../../../utils/validations';
import { Hint } from '../../../hint';

import styles from '../../styles.module.scss';

export const CustomLoginHint = ({ value }: { value: string }) => (
    <Hint view='ghost' className={styles.hint}>
        Используйте для логина{' '}
        <span className={classNames(!validateForLatinLetters(value) && styles.errorHint)}>
            латинский алфавит
        </span>{' '}
        и <span className={classNames(!validateForDigit(value) && styles.errorHint)}>цифры</span>
    </Hint>
);
