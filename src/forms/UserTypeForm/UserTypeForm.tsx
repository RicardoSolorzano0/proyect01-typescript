import { App, Button, ColorPicker, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCreateUserTypeMutation, useUpdateUserTypeMutation } from '@/api/services/userTypes';
import { FormUi } from '@/forms/FormUi/FormUi';
import { globalT } from '@/i18n';
import type { CreateUserTypePayload } from '@/types/payloads/payloadTypeUserForm';
import type { TypeUser } from '@/types/TypeUsers';

const { useApp } = App;
const { Item, useForm } = Form;

type Props = {
  readonly typeUser?: TypeUser;
  readonly handleCancel: () => void;
};

type TypeUserFormProps = CreateUserTypePayload;

export const UserTypeForm = ({
    handleCancel,
    typeUser
}: Props) => {
    const { t } = useTranslation('usersTypes');
    const { notification } = useApp();
    const [form] = useForm<TypeUserFormProps>();

    const [createUserType, { isLoading: isCreating }] = useCreateUserTypeMutation();
    // se puede hacer de la siguiente manera también
    //const [updateUserType,{data:dataUpdate, error:errorUpdate, isLoading:isLoadingUpdate, isSuccess:isSuccessUpdate}] = useUpdateUserTypeMutation();
    const [updateUserType, { isLoading: isUpdating }] = useUpdateUserTypeMutation();

    const loading = isCreating || isUpdating;

    const initValues: Partial<TypeUserFormProps> = {
        color: typeUser?.color,
        description: typeUser?.description,
        name: typeUser?.name
    };

    const onFinish = async (values: TypeUserFormProps) => {
        try {
            if (!typeUser) {
                await createUserType(values).unwrap();
            } else {
                await updateUserType({ id: typeUser.id, ...values }).unwrap();
            }
            notification.success({
                description: `${typeUser ? t('messages.success.updateDescription') : t('messages.success.createDescription')}`,
                duration: 2,
                message: t(`messages.success.${typeUser ? 'update' : 'create'}`)
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

    const onFinishFailed: FormProps<TypeUserFormProps>['onFinishFailed'] = errorInfo => {
        console.log('Failed:', errorInfo);
        notification.error({
            description: globalT('checkFields'),
            duration: 2,
            message: 'Error'
        });
    };

    return (
        <FormUi
            disabled={ loading }
            form={ form }
            initialValues={ initValues }
            onFinish={ v=> void onFinish(v) }
            onFinishFailed={ onFinishFailed }
        >
            <Item
                label={ t('entity.name') }
                name='name'
                rules={ [
                    {
                        message: globalT('fielRequired'),
                        required: true
                    }
                ] }
            >
                <Input />
            </Item>

            <Item
                label={ t('entity.description') }
                name='description'
                rules={ [
                    {
                        message: globalT('fielRequired'),
                        required: true
                    }
                ] }
            >
                <Input />
            </Item>

            <Item
                label={ t('entity.color') }
                name='color'
                rules={ [
                    {
                        message: globalT('fielRequired'),
                        required: true
                    }
                ] }
            >
                <ColorPicker onChange={ color => form.setFieldsValue({ color: color.toHexString() }) } />
            </Item>

            <div className='flex justify-center gap-2'>
                <Button onClick={ handleCancel }>Cancelar</Button>

                <Button
                    htmlType='submit'
                    type='primary'
                >
                    {typeUser ? globalT('edit') : globalT('create')}
                </Button>
            </div>
        </FormUi>
    );
};
