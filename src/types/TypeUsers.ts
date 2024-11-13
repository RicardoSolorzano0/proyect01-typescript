import type { ObjectWithId } from './ObjectWithId';

export interface TypeUser extends ObjectWithId {
  color: string;
  description: string;
  name: string;
};
