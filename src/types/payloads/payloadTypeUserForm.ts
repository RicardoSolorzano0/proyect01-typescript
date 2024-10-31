import { TypeUser } from "@/types/TypeUsers";
import { OptionInGetQuerys } from "../generalTypes";

export type TypeUserFormProps = Omit<TypeUser, "id">;


export type CreateUserTypePayload = Omit<TypeUser, "id">;
export type UpdateUserTypePayload = TypeUser;


export type SelectPaginatePayload ={
    option:OptionInGetQuerys,
    limit:number,
    page:number
}