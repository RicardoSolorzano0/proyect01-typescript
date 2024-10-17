import { Modal } from "antd";

type Props = {
  title: string;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

export const ModalUI = ({
  isModalOpen,
  handleOk,
  handleCancel,
  title,
}: Props) => {
  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
