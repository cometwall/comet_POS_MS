//  --- DTOs que se envian al backend
export interface ActualizarUsuarioDto {
    nombre: string
    rol: string
    sucursalId: number | null
}

export interface RegistrarUsuarioDto {
    nombre: string
    email: string
    password: string
    rol: string
    sucursalId: number | null
}

export interface ResetearPasswordDto {
    passwordNueva: string
}

//  --- DTOs que se reciben del backend

export interface UsuarioDto {
    id: number
    nombre: string
    email: string
    rol: string
    sucursalId: number | null
    activo: boolean
    bloqueadoHasta: string | null
    fechaCreacion: string
}

