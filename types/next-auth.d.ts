import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: {
      id: string;
      name?: string | null;
      surname?: string | null;
      email?: string | null;
      image?: string | null;
      emailVerified?: Date | null;
      hashedPassword?: string | null;
      role?: string;
      credits?: number;
    }
  }

  interface User {
    id: string;
    name?: string | null;
    surname?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    hashedPassword?: string | null;
    role?: string;
    credits?: number;
  }
}