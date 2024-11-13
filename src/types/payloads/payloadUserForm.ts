import type { SelectPaginatePayload } from '../generalTypes';
import type { User } from '../User';

export type CreateUserPayload = Omit<User, 'id'>;
export type UpdateUserPayload = User;

export type SelectPaginatePayloadWithUser = SelectPaginatePayload & {
    filter?: string;
    userType?: string;
};
