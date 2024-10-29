import { TypeUser } from "../TypeUsers";

export type TypeUserFormProps = Omit<TypeUser, "id">;
export type TypeParamGetUserType = "all"| "active" | "inactive"
