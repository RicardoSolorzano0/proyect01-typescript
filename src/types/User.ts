import type { ObjectWithId } from './ObjectWithId';

export type UserGender = 'M' | 'F';

export interface User extends ObjectWithId {
  address: string;
  birthdate: Date;
  email: string;
  gender: UserGender;
  last_name: string;
  name: string;
  user_type_id: string;
};
