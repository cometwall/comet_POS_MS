//Los 3 niveles definidos en el backend (RolesValidos + "SuperAdmin")
export type Rol = 'SuperAdmin' | 'Admin' | 'Cajero'

// --- DTOs que se envian al backend

export interface LoginDto {
    email:string
    password:string
}

export interface CambiarPasswordDto {
    passwordActual: string
    passwordNueva: string
}

// --- DTOs que devuelve el backend ---
export interface AuthRespuestaDto {
    nombre: string
    rol: Rol
    sucursalId: number | null
}

// --- Modelo propio para el store (no es un DTO del backend) ---

export interface UsuarioAutenticado {
    nombre: string
    rol: Rol
    sucursalId: number | null
}