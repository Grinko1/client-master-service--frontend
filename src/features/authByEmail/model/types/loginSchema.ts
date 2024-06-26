
export interface LoginSchema {
    _inited: boolean;
    email: string | undefined;
    password: string;
    userId?: number,
    role?: Role,
    profile: Profile,
    isLoading: boolean;
    error?: string;
}

export interface Role {
    id: string,
    role: string
}
export interface Profile {
    id: number | null,
    name: string,
    phone?: string,
    description?: string
}
