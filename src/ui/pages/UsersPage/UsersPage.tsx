import { Button, App, Switch, Input } from "antd";
import { useState } from "react";
import { User } from "@/types/User";
import { UserForm } from "@/forms/UserForm/UserForm";
import { useDeleteUserMutation, useSelectPaginatedUsersQuery } from "@/api/services/user";
import { OptionInGetQuerys } from "@/types/generalTypes";
import { useDebounce } from "@/hooks/debounce";
import { useGetUserTypesQuery } from "@/api/services/userTypes";
import { SelectUI } from "@/ui/components/SelectUI";
import { useTranslation } from "react-i18next";
import { globalT } from "@/i18n";
import { useHandlePaginatedData, usePagination } from "@/hooks/paginate";
import { EntityTable } from "@/ui/components/EntityTable";
import { columns } from "./table/columns";
import { deleteUserAction, updateAnimalsAction, updateUserAction } from "./table/actions";

const { useApp } = App;
export const UsersPage = () => {
  const { t } = useTranslation('users');
  const [text, setText] = useState("");
  const [userType, setUserType] = useState("")
  const debouncedText = useDebounce(text);
  const page = usePagination();

  const [option, setOption] = useState<OptionInGetQuerys>("active");
  const { data: dataPaginate, isLoading: isLoadingPaginate, isFetching: isFetchingPaginate } = useSelectPaginatedUsersQuery({ option, limit: 10, page, filter: debouncedText, userType });
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();
  const { data: dataUserType, isLoading: isLoadingTypes } = useGetUserTypesQuery("active");
  const { data, pagination } = useHandlePaginatedData(dataPaginate);
  const { modal, notification } = useApp();

  const handleCreate = () => {
    const mdl = modal.info({
      title: t("form.titles.create"),
      content: (
        <UserForm
          handleCancel={() => mdl.destroy()}
        />
      ),
      cancelButtonProps: {
        style: { display: "none" },
      },
      okButtonProps: {
        style: { display: "none" },
      },
    });
  };

  const handleDelete = async (record: User) => {
    try {
      await deleteUser(record.id).unwrap();
      notification.success({
        message: t("messages.success.delete"),
        description: t('messages.success.deleteDescription', { user: `${record.name} ${record.last_name}` }),
        duration: 2,
      });
    } catch (error) {
      const parsedError = error as { error: string };
      notification.error({
        message: "Error",
        description: t(`messages.errors.${parsedError.error}`),
        duration: 2,
      });
    }
  }

  const handleSwitch = (record: boolean) => {
    setOption(record ? "active" : "inactive");
  }

  const loading = isLoadingPaginate || isFetchingPaginate || isLoadingDelete || isLoadingTypes;

  const optionUserTypes = dataUserType?.map((type) => ({
    label: type.name,
    value: type.id
  }));

  const tableActions = {
    update: updateUserAction,
    delete: deleteUserAction(handleDelete),
    custom: [updateAnimalsAction(t)]
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Button type="primary" onClick={handleCreate}>
          {t("page.addButton")}
        </Button>
        <div className="flex gap-4 items-center">
          <SelectUI disabled={isLoadingTypes} size="large" placeholder={t("page.userTypeFilter")} allowClear options={optionUserTypes} onChange={(e) => setUserType(e ?? "")} />
          <Input placeholder={t("page.searchBy")} allowClear onChange={(e) => { setText(e.target.value) }} />
          <Switch className="w-44" defaultChecked checkedChildren={globalT('active')} unCheckedChildren={globalT('deleted')} onChange={handleSwitch} />
        </div>
      </div>
      <br />
      {loading ?
        <p>{globalT("loading")}</p>
        :
        <>
          <EntityTable
            actions={option === "active" ? tableActions : undefined}
            columns={columns(t)}
            data={data ?? []}
            loading={loading}
            pagination={pagination}
          />
        </>
      }
    </>
  );
};
