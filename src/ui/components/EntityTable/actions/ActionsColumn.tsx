import { Button, Popconfirm, Space, Tooltip } from 'antd';
import type { TFunction } from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CrudActionsEnum, type TableActionType, type TableCompositeAction } from './types';
import { crudActionsData } from './utils';
import { ActionButton } from '../../Buttons';
import { FeatherIcon } from '../../FeatherIcon';
import type { ModalFunctionsType } from '@/types/modals';
import type { ObjectWithId } from '@/types/ObjectWithId';


type ActionsColumnProps<RecordType extends ObjectWithId> = {
    readonly actions: TableActionType<RecordType>;
    readonly modal: ModalFunctionsType;
    readonly record: RecordType;
    readonly actionsText?: boolean;
};

const getActionProps = <RecordType extends ObjectWithId>(data: TableCompositeAction<RecordType>, t: TFunction) => {
    if (Array.isArray(data)) {
        // Handling crud actions
        const [key, actionData] = data;
        const { buttonType, icon, localeKey } = crudActionsData[key];
        const title = t(localeKey);

        if (typeof actionData === 'function') {
            return {
                actionData,
                buttonProps: { icon: <FeatherIcon icon={ icon } /> },
                color: buttonType,
                title
            };
        }

        return {
            actionData,
            buttonProps: { ...actionData.buttonProps, icon: <FeatherIcon icon={ icon } /> },
            color: buttonType,
            title
        };
    }

    // Handling custom actions
    const { buttonProps, colorMode, title } = data;

    return {
        actionData: data,
        buttonProps,
        color: colorMode,
        title
    };
};

export const ActionsColumn = <RecordType extends ObjectWithId>(props: ActionsColumnProps<RecordType>) => {
    const { t } = useTranslation('common', { keyPrefix: 'table' });
    const { actions, actionsText, modal, record } = props;

    const [locked, setLocked] = useState(false);

    const lockActionsUI = (callback: () => void) => {
        setLocked(true);
        setTimeout(() => setLocked(false), 500);
        callback();
    };

    const shallowActions = Object.entries(actions).reduce<TableCompositeAction<RecordType>[]>((prev, data) => {
        const [key, values] = data;

        if (Array.isArray(values)) {
            // Spread custom actions
            return [...prev, ...values];
        }

        // Pass crud action
        return [...prev, [CrudActionsEnum.parse(key), values]];
    }, []);

    return (
        <Space>
            {shallowActions.map((data, i) => {
                const { actionData, buttonProps, color, title } = getActionProps(data, t);

                if (typeof actionData === 'function') {
                    if (actionsText) {
                        return (
                            <Button
                                key={ i }
                                type='link'
                                onClick={ () => lockActionsUI(() => actionData(record, modal)) }
                            >{title}
                            </Button>
                        );
                    }

                    return (
                        <Tooltip
                            key={ i }
                            title={ title }
                        >
                            <ActionButton
                                customColor={ color }
                                disabled={ locked }
                                onClick={ () => lockActionsUI(() => actionData(record, modal)) }
                                { ...buttonProps }
                            />
                        </Tooltip>
                    );
                }

                const { hidden, tooltipProps, type } = actionData;

                if (hidden && hidden(record)) {
                    return null;
                }

                if (type === 'click') {
                    const { onClick } = actionData;

                    if (actionsText) {
                        return (
                            <Button
                                key={ i }
                                type='link'
                                onClick={ () => lockActionsUI(() => onClick(record, modal)) }
                            >{title}
                            </Button>
                        );
                    }

                    return (
                        <Tooltip
                            key={ i }
                            title={ title }
                            { ...tooltipProps }
                        >
                            <ActionButton
                                customColor={ color }
                                disabled={ locked }
                                onClick={ () => lockActionsUI(() => onClick(record, modal)) }
                                { ...buttonProps }
                            />
                        </Tooltip>
                    );
                }

                if (type === 'link') {
                    return (
                        <Tooltip
                            key={ i }
                            title={ title }
                            { ...tooltipProps }
                        >
                            <Link { ...actionData.linkProps(record.id) }>
                                <ActionButton
                                    customColor={ color }
                                    { ...buttonProps }
                                />
                            </Link>
                        </Tooltip>
                    );
                }

                if (type === 'popconfirm') {
                    const { onConfirm, popConfirmProps } = actionData;

                    return (
                        <Tooltip
                            key={ i }
                            title={ title }
                            { ...tooltipProps }
                        >
                            <Popconfirm
                                { ...popConfirmProps }
                                onConfirm={ () => onConfirm(record) }
                            >
                                <ActionButton
                                    customColor={ color }
                                    { ...buttonProps }
                                />
                            </Popconfirm>
                        </Tooltip>
                    );
                }
            })}
        </Space>
    );
};