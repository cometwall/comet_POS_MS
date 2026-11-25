import { useApi } from '~/composables/useApi'
import type { AuthRespuestaDto, LoginDto, CambiarPasswordDto } from '~/types/auth'

export async function loginRequest(dto: LoginDto): Promise<AuthRespuestaDto> {
    const api = useApi()

    return api<AuthRespuestaDto>('/api/Auth/login', {
        method: 'POST',
        body: dto
    })
}

export async function logoutRequest(): Promise<void> {
    const api = useApi()

    await api('/api/Auth/logout', {
        method: 'POST'
    })
}

export async function refreshRequest(): Promise<AuthRespuestaDto> {
    const api = useApi()

    return api<AuthRespuestaDto>('/api/Auth/refresh', {
        method: 'POST'
    })
}

export async function resetPasswordRequest(dto: CambiarPasswordDto): Promise<void>{
    const api = useApi()

    await api('/api/Auth/cambiar-password', {
        method: 'POST',
        body: dto
    })
}

