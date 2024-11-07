import type { TFunction }                        from 'i18next';
import { BaseActionProps, CrudTableAction, DeleteActionCompositionType } from '../../../components/EntityTable/actions/types';
import { User } from '../../../../types/User';
import { FeatherIcon } from '../../../components/FeatherIcon';
import { PlusSquare } from 'react-feather';
import { globalT } from '@/i18n';
import { UserForm } from '@/forms/UserForm/UserForm';

export const updateUserAction: CrudTableAction<User> = (user, modalFn) => {
    const mdl = modalFn.info({
        title: globalT("users:form.titles.edit", { user: `${user.name} ${user.last_name}` }),
        content: (
          <UserForm
            user={user}
            handleCancel={() => mdl.destroy()}
          />
        ),
        okButtonProps: {
          style: { display: "none" },
        },
        cancelButtonProps: {
          style: { display: "none" },
        },
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
            onOk: () => handleConfirm(record, mdl),
            title: globalT("users:form.titles.delete", { user: `${record.name} ${record.last_name}` }),
            content: globalT('users:form.contents.delete', { user: `${record.name} ${record.last_name}` }),
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
        void modalFn.info({
            content: (
                <div className='grid grid-cols-4 text-lg'>
                    hola mundo
                </div>
            ),
            width: '50%'
        });
    },
    title: t("form.titles.create"),
    type: 'click'
});