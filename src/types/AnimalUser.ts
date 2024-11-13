import type { ObjectWithId } from './ObjectWithId';

export interface AnimalUser extends ObjectWithId {
    animals: string[];
    user_id: string;
};

export interface AnimalUserResponse extends ObjectWithId {
    name: string;
}