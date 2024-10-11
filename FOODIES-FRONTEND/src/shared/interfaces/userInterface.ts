
export type UserType = 'client' | 'owner' | 'admin';

export interface User {
    email: string;
    password: string;
    type: UserType; 
    userId? :string
  }