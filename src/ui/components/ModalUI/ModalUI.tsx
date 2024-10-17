import { ReactNode } from "react";
import { Modal } from "antd";

type Props = {
  title: string;
  isModalOpen: boolean;
  children: ReactNode;
  handleOk: () => void;
  handleCancel: () => void;
};

export const ModalUI = ({
  isModalOpen,
  handleOk,
  handleCancel,
  title,
  children,
}: Props) => {
  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};
