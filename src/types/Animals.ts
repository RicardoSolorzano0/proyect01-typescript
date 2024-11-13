import type { ObjectWithId } from './ObjectWithId';


export interface Animal extends ObjectWithId {
  description: string;
  name: string;
};
