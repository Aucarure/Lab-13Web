import { NextResponse } from 'next/server';
import { createUser, findUserByEmail } from '@/lib/users';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
    }

    const existing = findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: 'El correo ya está registrado' }, { status: 400 });
    }

    await createUser(name, email, password);

    return NextResponse.json({ message: 'Usuario creado' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}