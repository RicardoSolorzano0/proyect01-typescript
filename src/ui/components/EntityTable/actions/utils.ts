import type { Icon }              from 'react-feather';
import { Edit, Eye, Trash2 }      from 'react-feather';
import type { CrudActionsType }   from './types';
import type { CustomButtonProps } from '../../Buttons';


type Action = {
    buttonType: CustomButtonProps['customColor'];
    icon: Icon;
    localeKey: string; // Use a better typing similar to the one on sabi, which could not be used 'cause TFuncKey was removed
};

export const crudActionsData: Record<CrudActionsType, Action> = {
    delete: {
        buttonType: 'danger',
        icon: Trash2,
        localeKey: 'delete'
    },
    update: {
        buttonType: 'default',
        icon: Edit,
        localeKey: 'update'
    },
    view: {
        buttonType: 'accent',
        icon: Eye,
        localeKey: 'view'
    }
};