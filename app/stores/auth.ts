import { defineStore } from 'pinia'
import { logoutRequest, loginRequest, refreshRequest, resetPasswordRequest } from '~/features/auth/api'
import type {
    UsuarioAutenticado,
    Rol,
    LoginDto,
    CambiarPasswordDto
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
        const response = await loginRequest(dto)
        usuario.value = {
            nombre: response.nombre,
            rol: response.rol,
            sucursalId: response.sucursalId
        }
    }
    
    async function logout(): Promise<void> {

        try {
            await logoutRequest()
        } finally {
            logoutLocal()
        }
    }

    async function refresh(): Promise<void> {
        try{
            const response = await refreshRequest()
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

    async function resetPassword(dto: CambiarPasswordDto): Promise<void>{
        await resetPasswordRequest(dto)
    }

    return {
        usuario,
        estaAutenticado,
        tieneRol,
        tieneNivel,
        login,
        logout,
        refresh,
        resetPassword
    }

})