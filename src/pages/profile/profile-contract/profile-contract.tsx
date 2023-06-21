import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '../../../components/button';
import { CustomInput } from '../../../components/inputs/custom-input';
import { ProfileEmpty } from '../profile-empty';

import styles from './profile-contract.module.scss';

const DATA = {
    title: 'Договор',
    subtitle: 'Здесь вы можете просмотрить данные о договоре, а так же внести оплату',
    data: 'Нет данных',
};

type ProfileContractProps = {
    lastName: string;
    firstName: string;
    email: string;
};

export const ProfileContract = ({ lastName, firstName, email }: ProfileContractProps) => {
    const methods = useForm<any>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
    });

    return (
        <div className={styles.functionsItem}>
            <span className={styles.title}>{DATA.title}</span>
            <span className={styles.subtitle}>{DATA.subtitle}</span>
            {email ? (
                <FormProvider {...methods}>
                    <form className={styles.contract}>
                        <CustomInput
                            notAuthFilled={true}
                            name='Оформлен на'
                            placeholder='Оформлен на'
                            required={true}
                            defaultValue={`${lastName} ${firstName}`}
                        />
                        <CustomInput
                            notAuthFilled={true}
                            name='Номер договора'
                            placeholder='Номер договора'
                            required={true}
                            defaultValue={email}
                        />
                        <Button classButton={styles.button} view='secondary'>
                            посмотреть договор
                        </Button>
                    </form>
                </FormProvider>
            ) : (
                <ProfileEmpty data={DATA.data} />
            )}
        </div>
    );
};
