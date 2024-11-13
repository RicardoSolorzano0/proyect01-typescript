import type { Animal } from '../Animals';

export type CreateAnimalPayload = Omit<Animal, 'id'>;
export type UpdateAnimalPayload = Animal;
