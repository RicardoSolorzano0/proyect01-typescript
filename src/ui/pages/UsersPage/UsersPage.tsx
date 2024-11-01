import { Button, Table, App, Switch, Pagination } from "antd";
import Column from "antd/es/table/Column";
import { useState } from "react";
import { User } from "@/types/User";
import { UserForm } from "@/forms/UserForm/UserForm";
import dayjs from "dayjs";
//import { ExampleRedux } from "@/counter/ExampleRedux";
import { useDeleteUserMutation,  useSelectPaginatedUsersQuery } from "@/api/services/user";
import { OptionInGetQuerys } from "@/types/generalTypes";

const { useApp } = App;

export const UsersPage = () => {
  const [page, setPage] = useState(1);
  const [option, setOption] = useState<OptionInGetQuerys>("active");
  const {data: dataPaginate, isLoading: isLoadingPaginate, isFetching: isFetchingPaginate}= useSelectPaginatedUsersQuery({option, limit: 10, page});
  const [deleteUser,{ isLoading:isLoadingDelete}] = useDeleteUserMutation();

  const { modal, notification } = useApp();

  const handleEdit = (record: User) => {
    const mdl = modal.info({
      title: `Editar usuario ${record.name} ${record.last_name}`,
      content: (
        <UserForm
          user={record}
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

  const handleCreate = () => {
    const mdl = modal.info({
      title: "Crear nuevo usuario",
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

  const handleDelete = (record: User) => {
    modal.confirm({
      title: "Eliminar usuario",
      content: `¿Estas seguro de eliminar el usuario ${record.name} ${record.last_name}?`,
      onOk:async  () => {
        try{
          await deleteUser(record.id).unwrap();
          notification.success({
            message: "Usuario eliminado",
            description: `Se ha eliminado el usuario ${record.name} ${record.last_name}`,
            duration: 2,
          });
        }catch(error){
          const parsedError = error as { error: string };
          notification.error({
            message: "Error",
            description: parsedError.error,
            duration: 2,
          });
        }
      },
    });
  };

  const handleSwitch = (record:boolean) => {
    setOption(record ? "active" : "inactive");
  }

  const loading = isLoadingPaginate||isFetchingPaginate || isLoadingDelete;

  return (
    <>
      {/* <ExampleRedux /> */}
      <div className="flex justify-between items-center">
      <Button type="primary" onClick={handleCreate}>
        Agregar Usuario
      </Button>
      <Switch defaultChecked checkedChildren="Activos" unCheckedChildren="Eliminados" onChange={handleSwitch}/>
      </div>
      <br />
      {loading ? 
        <p>Cargando informacion...</p>
       : 
       <>
        <Table
          rowKey={(record) => record.id}
          dataSource={dataPaginate?.data}
          pagination={false}
        >
          <Column title="Nombre" dataIndex="name" key="name" />
          <Column title="Apellido" dataIndex="last_name" key="last_name" />
          <Column title="Correo" dataIndex="email" key="email" />
          <Column title="Fecha de nacimiento" dataIndex="birthdate" key="birthdate" render={(date) => {
            return dayjs(date).format("DD/MM/YYYY")}} />
          <Column title="Direccion" dataIndex="address" key="address" />
          {option==="active" && <Column
            title="Acciones"
            key="action"
            render={(_, record: User) => (
              <div className="flex gap-2">
                <Button variant="solid" onClick={() => handleEdit(record)}>
                  Editar
                </Button>
                <Button
                  variant="solid"
                  color="danger"
                  onClick={() => handleDelete(record)}
                >
                  Eliminar
                </Button>
              </div>
            )}
          />}
        </Table>
        <div className="flex justify-center items-center mt-3 ">
            <Pagination
              total={dataPaginate?.total}
              showTotal={(total) => {
                return `Total ${total}`
              }}
              defaultPageSize={10}
              defaultCurrent={1}
              onChange={(e) => {
                setPage(e)
              }}
            />
          </div>
        </>
      }
    </>
  );
};
