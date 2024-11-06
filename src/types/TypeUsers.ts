import { ObjectWithId } from "./ObjectWithId";

export interface TypeUser extends ObjectWithId {
  name: string;
  description: string;
  color: string;
};
