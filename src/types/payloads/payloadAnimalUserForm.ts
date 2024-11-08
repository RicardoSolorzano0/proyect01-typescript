import { AnimalUser } from "../AnimalUser";

export type CreateAnimalUserPayload = Omit<AnimalUser, "id">

export type SelectAnimalUsersPayload = {
    user_id: string
}