import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import classNames from 'classnames';

import { ReactComponent as Star } from './assets/icon_rating.svg';

import styles from './rating.module.scss';

type RatingType = {
    rating: number;
    classNameStar?: string;
    isEditable?: boolean;
    setValue?: UseFormSetValue<any>;
};

export const Rating = ({ rating, classNameStar, isEditable, setValue }: RatingType) => {
    const [starState, setStarState] = useState(1);
    const [starHover, setStarHover] = useState<number | undefined>(undefined);

    const editProps = (ind: number) => {
        if (isEditable) {
            return {
                onClick: () => {
                    setStarState(ind + 1);
                    if (setValue) {
                        setValue('rating', ind + 1, { shouldValidate: true });
                    }
                },
                onMouseOver: () => setStarHover(ind + 1),
                onMouseLeave: () => setStarHover(undefined),
            };
        }

        return null;
    };

    useEffect(() => {
        setStarState(rating);
    }, [rating]);

    return (
        <div className={styles.rating} data-test-id='rating'>
            {[...Array(5)].map((star, ind) => (
                <button
                    type='button'
                    // eslint-disable-next-line react/no-array-index-key
                    key={ind}
                    className={styles.starWrapper}
                    {...editProps(ind)}
                    data-test-id='star'
                >
                    <Star
                        className={classNames(
                            styles.starFilled,
                            {
                                [styles.star]: (starHover || starState) <= ind,
                            },
                            classNameStar,
                        )}
                        data-test-id={(starHover || starState) <= ind ? undefined : 'star-active'}
                    />
                </button>
            ))}
        </div>
    );
};
