import { ObjectWithId } from "./ObjectWithId";

export type UserGender = "M" | "F";

export interface User extends ObjectWithId {
  name: string;
  last_name: string;
  birthdate: Date;
  address: string;
  email: string;
  gender: UserGender;
  user_type_id: string;
};
