import type { ButtonProps, PopconfirmProps, TooltipProps }      from 'antd';
import { z }                                                    from 'zod';
import { CustomButtonProps } from '../../Buttons';
import { ObjectWithId } from '@/types/ObjectWithId';
import { ModalFunctionsType, ModalInstance } from '@/types/modals';
import { LinkProps } from 'react-router-dom';


export const CrudActionsEnum = z.enum(['view', 'update', 'delete']);
export type CrudActionsType = z.infer<typeof CrudActionsEnum>;

type OnClickType<RecordType> = (record: RecordType, modalFn: ModalFunctionsType) => void;
type ConditionType<RecordType> = (record: RecordType) => boolean;

interface BasicAction {
    tooltipProps?: Omit<TooltipProps, 'title'>;
}

interface DetailedAction<RecordType> extends BasicAction {
    buttonProps?: Omit<ButtonProps, 'danger' | 'onClick'>;
    colorMode?: CustomButtonProps['customColor'];

    hidden?: ConditionType<RecordType>;
    title: string;
}

type ClickAction<RecordType extends ObjectWithId> = {
    hidden?: ConditionType<RecordType>;
    onClick: OnClickType<RecordType>;
    type: 'click';
};

type PopConfirmAction<RecordType> = {
    hidden?: ConditionType<RecordType>;
    onConfirm: (record: RecordType) => void;
    popConfirmProps: Omit<PopconfirmProps, 'onConfirm'>;
    type: 'popconfirm';
};

type LinkAction<RecordType> = {
    hidden?: ConditionType<RecordType>;
    linkProps: (id: string) => Pick<LinkProps, 'to' | 'state' | 'replace'>;
    type: 'link';
};

type TableActionTypes<RecordType extends ObjectWithId> =
    ClickAction<RecordType>
    | LinkAction<RecordType>
    | PopConfirmAction<RecordType>;

export type BaseActionProps<RecordType extends ObjectWithId> =
    TableActionTypes<RecordType>
    & DetailedAction<RecordType>;

type CrudActionProps<RecordType extends ObjectWithId> = {
    buttonProps?: Omit<ButtonProps, 'danger' | 'icon' | 'onClick' | 'title'>;
} & TableActionTypes<RecordType> & BasicAction;

export type CrudTableAction<RecordType extends ObjectWithId> = CrudActionProps<RecordType> | OnClickType<RecordType>;

export type TableCompositeAction<RecordType extends ObjectWithId> =
    [CrudActionsType, CrudTableAction<RecordType>]
    | BaseActionProps<RecordType>;

export type TableActionType<RecordType extends ObjectWithId> =
    Partial<Record<CrudActionsType, CrudTableAction<RecordType>>> &
    {
        custom?: BaseActionProps<RecordType>[];
    };

export type UpdateActionCompositionType<R extends ObjectWithId> = (handleUpdate: (
    record: R,
    modal: ModalInstance
) => Promise<void>) => CrudTableAction<R>;

export type DeleteActionCompositionType<R extends ObjectWithId> = (handleConfirm: (
    record: R,
    modal: ModalInstance
) => Promise<void>) => CrudTableAction<R>;