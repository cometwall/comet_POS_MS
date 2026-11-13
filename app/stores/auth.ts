import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'
import type {
    UsuarioAutenticado,
    AuthRespuestaDto,
    Rol,
    LoginDto
} from '~/types/auth'

export const useAuthStore = defineStore('auth', () => {
    function logoutLocal(): void {
        usuario.value = null
    }
    const NIVELES_ROL: Record<Rol, number> = {
        Cajero: 1,
        Admin: 2,
        SuperAdmin: 3
    }
    //Estado
    const usuario = useCookie<UsuarioAutenticado | null>('usuario',{
        default: () => null,
        sameSite: 'lax',
        secure: import.meta.env.PROD
    })

    //Getters
    const estaAutenticado = computed(() => {
        return !!usuario.value
    })

    function tieneRol(...roles: Rol[]): boolean {
        return usuario.value !== null &&
            roles.includes(usuario.value.rol)
    }

    function tieneNivel(rolMinimo: Rol): boolean {
        if (!usuario.value){
            return false
        }
        return NIVELES_ROL[usuario.value.rol] >= NIVELES_ROL[rolMinimo]
    }

    //Acciones
    async function login(dto: LoginDto): Promise<void> {
        const api = useApi()

        const response = await api<AuthRespuestaDto>(
            '/api/Auth/login',
            {
                method: 'POST',
                body: dto
            }
        )
        usuario.value = {
            nombre: response.nombre,
            rol: response.rol,
            sucursalId: response.sucursalId
        }
    }
    
    async function logout(): Promise<void> {
        const api = useApi()

        try {
            await api('/api/Auth/logout', {
                method: 'POST'
            })
        } finally {
            logoutLocal()
        }
    }

    async function refresh(): Promise<void> {
        const api = useApi()

        try{
            const response = await api<AuthRespuestaDto>(
                '/api/Auth/refresh',
                {
                    method: 'POST'
                }
            )
            usuario.value = {
                nombre: response.nombre,
                rol: response.rol,
                sucursalId: response.sucursalId
            }
        }catch(error){
            logoutLocal()
            throw error
        }
    }

    return {
        usuario,
        estaAutenticado,
        tieneRol,
        tieneNivel,
        login,
        logout,
        refresh
    }

})