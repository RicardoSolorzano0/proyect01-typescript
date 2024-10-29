import { User } from "@/types/User";

export const dataUsers: User[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Brown",
    birthdate: new Date("2001-10-01T00:00:00-06:00"),
    address: "New York No. 1 Lake Park",
  },
  {
    id: "2",
    firstName: "Jim",
    lastName: "Green",
    birthdate: new Date("2002-09-15T00:00:00-06:00"),
    address: "London No. 1 Lake Park",
  },
  {
    id: "3",
    firstName: "Joe",
    lastName: "Black",
    birthdate: new Date("2003-07-05T00:00:00-06:00"),
    address: "Sydney No. 1 Lake Park",
  },
];

export const dataTypeUsers = [
  {
    id: "1",
    name: "Admin",
    description: "Admin description",
    color: "#ff5016",
  },
  {
    id: "2",
    name: "User",
    description: "User description",
    color: "#1622ff",
  },
  {
    id: "3",
    name: "Guest",
    description: "Guest description",
    color: "#16ff1e",
  },
  {
    id: "4",
    name: "Moderator",
    description: "Moderator description",
    color: "#d1c025",
  },
  {
    id: "5",
    name: "SuperAdmin",
    description: "SuperAdmin description",
    color: "#8c25d1",
  },
  {
    id: "6",
    name: "SuperUser",
    description: "SuperUser description",
    color: "#d125ac",
  },
  {
    id: "7",
    name: "SuperGuest",
    description: "SuperGuest description",
    color: "#e0ec08",
  },
  {
    id: "8",
    name: "SuperModerator",
    description: "SuperModerator description",
    color: "#08ecdd",
  },
];
