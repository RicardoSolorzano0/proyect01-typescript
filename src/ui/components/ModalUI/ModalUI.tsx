import { Modal } from "antd";

type Props = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};
export const ModalUI = ({ isModalOpen, handleOk, handleCancel }: Props) => {
  return (
    <>
      <Modal
        title="Basic Modal"
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
