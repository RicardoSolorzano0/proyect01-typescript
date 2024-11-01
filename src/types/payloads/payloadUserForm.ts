import { SelectPaginatePayload } from "../generalTypes";
import { User } from "../User";

export type CreateUserPayload = Omit<User, "id">;
export type UpdateUserPayload = User;

export type SelectPaginatePayloadWithUser = SelectPaginatePayload & {
    filter?: string
}
