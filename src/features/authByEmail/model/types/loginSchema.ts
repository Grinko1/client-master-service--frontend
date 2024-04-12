import { UserRole } from "@/entities/User";

export interface LoginSchema {
    email: string | undefined;
    password: string;
    role: Role | null,
    isLoading: boolean;
    error?: string;
}

export interface Role {
    id: number,
    role: string
}