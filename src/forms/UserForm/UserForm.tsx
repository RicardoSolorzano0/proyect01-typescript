import { App, Button, DatePicker, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useCreateUserMutation, useUpdateUserMutation } from '@/api/services/user';
import { useGetUserTypesQuery } from '@/api/services/userTypes';
import { FormUi } from '@/forms/FormUi/FormUi';
import { globalT } from '@/i18n';
import type { User } from '@/types/User';
import { SelectUI } from '@/ui/components/SelectUI';

const { useApp } = App;

const { Item, useForm } = Form;

type UserFormProps = Omit<User, 'id' | 'birthdate'> & {
  birthdate: Dayjs;
};

type Props = {
  readonly user?: User;
  readonly handleCancel: () => void;
};

export const UserForm = ({ handleCancel, user }: Props) => {
    const { t } = useTranslation('users');
    const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
    const { data, isLoading: isLoadingTypes } = useGetUserTypesQuery('active');

    const optionUserTypes = data?.map(type => ({
        label: type.name,
        value: type.id
    }));

    const { notification } = useApp();
    const [form] = useForm<UserFormProps>();

    const initialValues: Partial<UserFormProps> = {
        address: user?.address,
        birthdate: user ? dayjs(user?.birthdate) : dayjs(),
        email: user?.email,
        gender: user?.gender,
        last_name: user?.last_name,
        name: user?.name,
        user_type_id: user?.user_type_id
    };

    const onFinish = async (values: UserFormProps) => {
        try {
            if (!user) {
                await createUser({ ...values, birthdate: values.birthdate.toDate() }).unwrap();
            } else {
                await updateUser({ id: user.id, ...values, birthdate: values.birthdate.toDate() }).unwrap();
            }
            notification.success({
                description: t(`messages.success.${user ? 'updateDescription' : 'createDescription'}`),
                duration: 2,
                message: t(`messages.success.${user ? 'update' : 'create'}`)
            });
        } catch (error) {
            const parsedError = error as { error: string; };
            notification.error({
                description: t(`messages.errors.${parsedError.error}`),
                duration: 2,
                message: 'Error'
            });
        }
        handleCancel();
    };

    const onFinishFailed: FormProps<UserFormProps>['onFinishFailed'] = errorInfo => {
        notification.error({
            description: globalT('checkFields'),
            duration: 2,
            message: 'Error'
        });
        console.log('Failed:', errorInfo);
    };

    const loading = isCreating || isUpdating || isLoadingTypes;

    return (
        <FormUi
            disabled={ loading }
            form={ form }
            initialValues={ initialValues }
            onFinish={ v=> void onFinish(v) }
            onFinishFailed={ onFinishFailed }
        >
            <Item
                label={ t('entity.name') }
                name='name'
                rules={ [
                    {
                        message: globalT('fieldRequired'),
                        required: true
                    }
                ] }
            >
                <Input />
            </Item>

            <Item
                label={ t('entity.lastName') }
                name='last_name'
                rules={ [
                    {
                        message: globalT('fieldRequired'),
                        required: true
                    }
                ] }
            >
                <Input />
            </Item>

            <Item
                label={ t('entity.birthdate') }
                name='birthdate'
                rules={ [
                    {
                        message: globalT('fieldRequired'),
                        required: true
                    }
                ] }
            >
                <DatePicker format='L' />
            </Item>

            <Item
                label={ t('entity.address') }
                name='address'
                rules={ [
                    {
                        message: globalT('fieldRequired'),
                        required: true
                    }
                ] }
            >
                <Input />
            </Item>

            <Item
                label={ t('entity.email') }
                name='email'
                rules={ [
                    {
                        message: globalT('fieldRequired'),
                        required: true
                    }
                ] }
            >
                <Input type='email' />
            </Item>

            <Item
                label={ t('entity.gender') }
                name='gender'
                rules={ [
                    {
                        message: globalT('fieldRequired'),
                        required: true
                    }
                ] }
            >
                <SelectUI
                    placeholder={ globalT('selectOption') }
                    size='large'
                    options={ [
                        { label: 'Masculino', value: 'M' },
                        { label: 'Femenino', value: 'F' }
                    ] }
                />
            </Item>

            <Item
                label={ t('entity.userType') }
                name='user_type_id'
                rules={ [
                    {
                        message: globalT('fieldRequired'),
                        required: true
                    }
                ] }
            >
                <SelectUI
                    options={ optionUserTypes }
                    placeholder={ globalT('selectOption') }
                    size='large'
                />
            </Item>

            <div className='flex justify-center gap-2'>
                <Button onClick={ handleCancel }>{globalT('cancel')}</Button>

                <Button
                    htmlType='submit'
                    type='primary'
                >
                    {user ? globalT('edit') : globalT('create')}
                </Button>
            </div>
        </FormUi>
    );
};
