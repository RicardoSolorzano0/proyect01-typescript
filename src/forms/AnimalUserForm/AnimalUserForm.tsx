import type { FormProps } from 'antd';
import { App, Button, Form, Select, Space } from 'antd';
import { useTranslation } from 'react-i18next';

import { FormUi } from '../FormUi/FormUi';
import { useGetAnimalsQuery } from '@/api/services/animals';
import { useCreateAnimalsUserMutation, useGetAnimalsUserQuery } from '@/api/services/animalsUser';
import { globalT } from '@/i18n';
import type { CreateAnimalUserPayload } from '@/types/payloads/payloadAnimalUserForm';
import type { User } from '@/types/User';

type Props = {
    readonly user: User;
    readonly handleCancel: () => void;
};

const { Item, useForm } = Form;

type AnimalUserFormProps = Pick<CreateAnimalUserPayload, 'animals'>;

const { useApp } = App;
export const AnimalUserForm = ({ handleCancel, user }: Props) => {
    const { t } = useTranslation();
    const [form] = useForm<AnimalUserFormProps>();
    const { data, isFetching, isLoading } = useGetAnimalsQuery('active');
    const [create, { isLoading: isCreating }] = useCreateAnimalsUserMutation();
    const { data: dataAnimal, isLoading: isLoadingAnimals } = useGetAnimalsUserQuery({ user_id: user.id });
    const { notification } = useApp();
    const optionsAnimals = data?.map(animal => ({
        label: animal.name,
        value: animal.id
    }));

    const initValues: Partial<AnimalUserFormProps> = {
        //user_id: user.id,
        animals: dataAnimal?.map(animal => animal.id) || []
    };

    // const initialValues = {
    //     user_id: '123',
    //     animals: undefined
    // }

    // useEffect(() => {
    //     form.setFieldsValue(initValues);
    // }, [initValues]);
    
    const onFinish = async (values: AnimalUserFormProps) => {
        try {
            await create({ user_id: user.id, ...values }).unwrap();
            notification.success({
                description: `Animales agregados exitosamente`,
                duration: 2,
                // message: ` ${typeUser ? t("messages.userUpdated") : t("messages.userCreated")}`,
                // description: `${typeUser ? t("messages.userUpdatedDescription") : t("messages.userCreatedDescription")}`,
                message: `Animales favoritos`
            });
        } catch (error) {
            const parsedError = error as { error: string; };
            notification.error({
                description: parsedError.error,
                duration: 2,
                message: 'Error'
            });
        }
        handleCancel();
    };

    const onFinishFailed: FormProps<AnimalUserFormProps>['onFinishFailed'] = errorInfo => {
        console.log('Failed:', errorInfo);
        notification.error({
            description: globalT('checkFields'),
            duration: 2,
            message: 'Error'
        });
    };

    const loading = isLoading || isFetching || isCreating || isLoadingAnimals;

    if (dataAnimal === undefined) {
        return (
            <div>Cargando</div>
        );
    }

    return (
        <FormUi
            disabled={ loading }
            form={ form }
            initialValues={ initValues }
            onFinish={ v=> void onFinish(v) }
            onFinishFailed={ onFinishFailed }
        >
            <Item
                label={ t('forms.animalUser.animal') }
                name='animals'
                rules={ [
                    {
                        message: globalT('fieldRequired'),
                        required: true
                    }
                ] }
            >
                <Select
                    className='mt-3 w-full'
                    mode='multiple'
                    optionFilterProp='label'
                    options={ optionsAnimals }
                    placeholder='Seleccione animales'
                    optionRender={ option => (
                        <Space>
                            {option.data.label}
                        </Space>
                    ) }
                />
            </Item>

            {/* <Item
                                className="hidden"
                                label={t("forms.animalUser.animal")}
                                name="user_id"
                            >
                            </Item> */}
            <div className='mt-5 flex justify-center gap-2'>
                <Button onClick={ handleCancel }>{globalT('cancel')}</Button>

                <Button
                    htmlType='submit'
                    type='primary'
                >
                                    Guardar
                </Button>
            </div>
        </FormUi>
    );
};