import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Simulamos una DB en memoria
export const users: User[] = [];

export async function createUser(name: string, email: string, password: string): Promise<User> {
  const hashed = await bcrypt.hash(password, 10);
  const user: User = {
    id: String(Date.now()),
    name,
    email,
    password: hashed,
  };
  users.push(user);
  return user;
}

export function findUserByEmail(email: string): User | undefined {
  return users.find(u => u.email === email);
}