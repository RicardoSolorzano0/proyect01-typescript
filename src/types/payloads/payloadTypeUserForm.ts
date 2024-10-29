import { TypeUser } from "@/types/TypeUsers";

export type TypeUserFormProps = Omit<TypeUser, "id">;
export type TypeParamGetUserType = "all"| "active" | "inactive"


export type CreateUserTypePayload = Omit<TypeUser, "id">;
export type UpdateUserTypePayload = TypeUser;
