import type { TFunction }                        from 'i18next';
import { PlusSquare } from 'react-feather';
import type { User } from '../../../../types/User';
import type { BaseActionProps, CrudTableAction, DeleteActionCompositionType } from '../../../components/EntityTable/actions/types';
import { FeatherIcon } from '../../../components/FeatherIcon';
import { AnimalUserForm } from '@/forms/AnimalUserForm/AnimalUserForm';
import { UserForm } from '@/forms/UserForm/UserForm';
import { globalT } from '@/i18n';

export const updateUserAction: CrudTableAction<User> = (user, modalFn) => {
    const mdl = modalFn.info({
        cancelButtonProps: {
            style: { display: 'none' }
        },
        content: (
            <UserForm
                handleCancel={ () => mdl.destroy() }
                user={ user }
            />
        ),
        okButtonProps: {
            style: { display: 'none' }
        },
        title: globalT('users:form.titles.edit', { user: `${user.name} ${user.last_name}` })
    });
};

// export const updateUserAction: CrudTableAction<User> = {
//     hidden: (record) => record.name === 'Ricardo',
//     onClick: (user, modalFn) => {
//         const mdl = modalFn.info({
//             title: globalT("users:form.titles.edit", { user: `${user.name} ${user.last_name}` }),
//             content: (
//               <UserForm
//                 user={user}
//                 handleCancel={() => mdl.destroy()}
//               />
//             ),
//             okButtonProps: {
//               style: { display: "none" },
//             },
//             cancelButtonProps: {
//               style: { display: "none" },
//             },
//         });
//     },
//     type: 'click'
// };

export const deleteUserAction: DeleteActionCompositionType<User> = handleConfirm => {
    return (record, modalFn) => {
        const mdl = modalFn.confirm({
            content: globalT('users:form.contents.delete', { user: `${record.name} ${record.last_name}` }),
            onOk: () => handleConfirm(record, mdl),
            title: globalT('users:form.titles.delete', { user: `${record.name} ${record.last_name}` })
        });
    };
};

export const updateAnimalsAction: (t: TFunction) => BaseActionProps<User> = t => ({
    buttonProps: {
        icon: <FeatherIcon icon={ PlusSquare } />
    },
    //hidden: (record) => record.name === 'Ricardo',
    colorMode: 'warning',
    onClick: (user, modalFn) => {
        const mdl = modalFn.info({
            cancelButtonProps: {
                style: { display: 'none' }
            },
            content: 
              <AnimalUserForm
                  handleCancel={ () => mdl.destroy() }
                  user={ user }
              />
            ,
            okButtonProps: {
                style: { display: 'none' }
            },
            title: t('form.titles.favorite', { user: `${user.name}` })
        });
    },
    title: t('form.titles.favorite'),
    type: 'click'
});