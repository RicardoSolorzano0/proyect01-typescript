import { Input, Form, Button } from "antd";
import type { FormProps } from "antd";
import { User } from "../../types/User";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

type Props = {
  user?: User;
  handleOk: () => void;
};

export const UserForm = ({ handleOk }: Props) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    handleOk();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Nombre"
        name="firstname"
        rules={[
          {
            required: true,
            message: "Campo requerido",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Apellido"
        name="lastname"
        rules={[
          {
            required: true,
            message: "Campo requerido",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Edad"
        name="age"
        rules={[
          {
            required: true,
            message: "Campo requerido",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Dirección"
        name="address"
        rules={[
          {
            required: true,
            message: "Campo requerido",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
