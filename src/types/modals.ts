import type { Modal }     from 'antd';
import type { ModalFunc } from 'antd/lib/modal/confirm';


export type ModalFunctionsType = ReturnType<typeof Modal.useModal>[0];
export type ModalInstance = ReturnType<ModalFunc>;