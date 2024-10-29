import { User } from "../User";

export type TypeParamGetUser = "all"| "active" | "inactive"

export type CreateUserPayload = Omit<User, "id">;
export type UpdateUserPayload = User;
