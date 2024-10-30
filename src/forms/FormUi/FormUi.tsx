import { ReactNode } from "react";
import { Form, FormProps } from "antd";

type Props<T> = Omit<FormProps<T>, "children" > & { children: ReactNode };


export const FormUi = <T = never>(props: Props<T>) => {
    return (
        <Form
            name="basic"
            layout="vertical"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            autoComplete="off"
            {...props}
        />
    );
};
