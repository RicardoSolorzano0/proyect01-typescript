export type UserGender = "M" | "F";

export type User = {
  id: string;
  name: string;
  last_name: string;
  birthdate: Date;
  address: string;
  email: string;
  gender: UserGender;
  user_type_id: string;
};
