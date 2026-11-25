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

export interface UsuarioDto {
    Id: number
    nombre: string
    email: string
    rol: string
    sucursalId: number | null
    activo: boolean
    bloqueadoHasta: Date | null
    fechaCreacion: Date
}