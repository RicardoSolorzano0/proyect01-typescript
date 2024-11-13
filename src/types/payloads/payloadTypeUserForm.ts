import type { SelectPaginatePayload } from '../generalTypes';
// import { OptionInGetQuerys } from '../generalTypes';
import type { TypeUser } from '@/types/TypeUsers';

export type TypeUserFormProps = Omit<TypeUser, 'id'>;


export type CreateUserTypePayload = Omit<TypeUser, 'id'>;
export type UpdateUserTypePayload = TypeUser;

export type SelectPaginatePayloadWithFilters = SelectPaginatePayload & {
    name?: string;
};