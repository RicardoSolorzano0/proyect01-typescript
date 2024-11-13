import type { FormProps } from 'antd';
import { Form } from 'antd';
import type { ReactNode } from 'react';

type Props<T> = Omit<FormProps<T>, 'children' > & { readonly children: ReactNode; };


export const FormUi = <T = never>(props: Props<T>) => {
    return (
        <Form
            autoComplete='off'
            layout='vertical'
            name='basic'
            labelCol={ {
                span: 8
            } }
            wrapperCol={ {
                span: 16
            } }
            // style={{
            //     maxWidth: 600,
            // }}
            { ...props }
        />
    );
};
