import { useApi } from '~/composables/useApi'
import type { 
    ActualizarUsuarioDto, 
    RegistrarUsuarioDto, 
    ResetearPasswordDto, 
    UsuarioDto} from '~/types/user'

export async function listarUsuariosRequest(
    incluirInactivos: boolean = false
): Promise<UsuarioDto[]> {
    const api = useApi()

    return api<UsuarioDto[]>('/api/Usuarios', {
        method: 'GET',
        query: {
            incluirInactivos
        }
    })
}

export async function desbloquearRequest(usuarioId: number): Promise<void> {
    const api = useApi()

    return api<void>(`/api/Usuarios/${usuarioId}/desbloquear`, {
        method: 'POST'
    })
}

export async function obtenerPorIdRequest(usuarioId: number): Promise<UsuarioDto> {
    const api = useApi()

    return api<UsuarioDto>(`/api/Usuarios/${usuarioId}`, {
        method: 'GET'
    })
}

export async function actualizarRequest(usuarioId: number, actualizarUsuarioDto: ActualizarUsuarioDto): Promise<void> {
    const api = useApi()

    return api<void>(`/api/Usuarios/${usuarioId}`, {
        method: 'PUT',
        body: actualizarUsuarioDto
    })
}

export async function desactivarRequest(usuarioId: number): Promise<void> {
    const api = useApi()

    return api<void>(`/api/Usuarios/${usuarioId}/desactivar`, {
        method: 'POST'
    })
}

export async function activarRequest(usuarioId: number): Promise<void> {
    const api = useApi()

    return api<void>(`/api/Usuarios/${usuarioId}/activar`, {
        method: 'POST'
    })
}

export async function resetearPasswordRequest(
    usuarioId: number, 
    dto: ResetearPasswordDto
): Promise<void> {
    const api = useApi()

    return api<void>(`/api/Usuarios/${usuarioId}/resetear-password`, {
        method: 'POST',
        body: dto
    })
}

export async function registrarRequest(registrarUsuarioDto: RegistrarUsuarioDto): Promise<void> {
    const api = useApi()

    return api<void>('/api/Auth/registro', {
        method: 'POST',
        body: registrarUsuarioDto
    })
}