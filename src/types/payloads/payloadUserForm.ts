import { User } from "../User";

export type CreateUserPayload = Omit<User, "id">;
export type UpdateUserPayload = User;
