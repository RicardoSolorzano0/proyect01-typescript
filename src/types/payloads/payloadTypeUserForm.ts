import { TypeUser } from "@/types/TypeUsers";
import { OptionInGetQuerys, SelectPaginatePayload } from "../generalTypes";

export type TypeUserFormProps = Omit<TypeUser, "id">;


export type CreateUserTypePayload = Omit<TypeUser, "id">;
export type UpdateUserTypePayload = TypeUser;

export type SelectPaginatePayloadWithFilters = SelectPaginatePayload & {
    name?:string
}