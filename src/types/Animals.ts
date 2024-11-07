import { ObjectWithId } from "./ObjectWithId";


export interface Animal extends ObjectWithId {
  name: string;
  description: string;
};
