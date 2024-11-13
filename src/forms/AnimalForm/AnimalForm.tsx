import type { FormProps } from 'antd';
import { App, Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { FormUi } from '../FormUi/FormUi';
import { useCreateAnimalMutation, useUpdateAnimalMutation } from '@/api/services/animals';
import { globalT } from '@/i18n';
import type { Animal } from '@/types/Animals';

type Props = {
  readonly animal?: Animal;
  readonly handleCancel: () => void;
};

type AnimalFormProps = Omit<Animal, 'id'>;

const { useApp } = App;

const { Item, useForm } = Form;

export const AnimalForm = ({ animal, handleCancel }: Props) => {
    const { t } = useTranslation('animals');
    const [createAnimal, { isLoading: isCreating }] = useCreateAnimalMutation();
    const [updateAnimal, { isLoading: isUpdating }] = useUpdateAnimalMutation();
    const { notification } = useApp();
    const [form] = useForm<AnimalFormProps>();


    const onFinish = async (values: AnimalFormProps) => {
        try {
            if (!animal) {
                await createAnimal({ ...values }).unwrap();
            } else {
                await updateAnimal({ id: animal.id, ...values }).unwrap();
            }
            notification.success({
                description: `${animal ? t('messages.success.updateDescription', { animal: `${animal?.name}` }) : t('messages.success.createDescription')}`,
                duration: 2,
                message: t(`messages.success.${animal ? 'update' : 'create'}`)
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

    const onFinishFailed: FormProps<AnimalFormProps>['onFinishFailed'] = errorInfo => {
        notification.error({
            description: globalT('checkFields'),
            duration: 2,
            message: 'Error'
        });
        console.log('Failed:', errorInfo);
    };

    const initialValues: Partial<AnimalFormProps> = {
        description: animal?.description,
        name: animal?.name
    };

    const loading = isCreating || isUpdating;

    return (
        <FormUi
            disabled={ loading }
            form={ form }
            initialValues={ initialValues }
            onFinish={ v => void onFinish(v)    }
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
                label={ t('entity.description') }
                name='description'
                rules={ [
                    {
                        message: globalT('fieldRequired'),
                        required: true
                    }
                ] }
            >
                <Input />
            </Item>

            <div className='flex justify-center gap-2'>
                <Button onClick={ handleCancel }>{globalT('cancel')}</Button>

                <Button
                    htmlType='submit'
                    type='primary'
                >
                    {animal ? globalT('edit') : globalT('create')}
                </Button>
            </div>
        </FormUi>
    );
};