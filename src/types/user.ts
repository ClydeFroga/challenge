export interface User {
  id?: number;
  full_name: string;
  role: string;
  efficiency: number;
}

export interface UserCreateDTO extends Omit<User, "id"> {}

export interface UserUpdateDTO extends Omit<User, "id"> {}

export interface UserFilters extends Omit<User, "id"> {}
