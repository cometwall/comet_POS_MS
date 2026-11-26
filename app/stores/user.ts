import { defineStore } from 'pinia'
import { 
    listarUsuariosRequest,
    desbloquearRequest,
    obtenerPorIdRequest,
    actualizarRequest,
    desactivarRequest,
    activarRequest,
    resetearPasswordRequest,
    registrarRequest
} from '~/features/user/api'

import type { 
    UsuarioDto,
    RegistrarUsuarioDto,
    ActualizarUsuarioDto,
    ResetearPasswordDto
} from '~/types/user'

export const useUserStore = defineStore('user', () => {

    //Estado
    const usuarios = ref<UsuarioDto[]>([])
    const usuarioSeleccionado = ref<UsuarioDto | null>(null)
    const cargando = ref(false)
    const error = ref<string | null>(null)

    //Getters
    const usuariosActivos = computed(() =>
        usuarios.value.filter(usuario => usuario.activo)
    )

    const usuariosInactivos = computed(() =>
        usuarios.value.filter(usuario => !usuario.activo)
    )

    const totalUsuarios = computed(() => 
        usuarios.value.length
    )

    // Acciones

    async function listarUsuarios(incluirInactivos: boolean = false): Promise<void> {
        cargando.value = true
        error.value = null

        try {
            usuarios.value = await listarUsuariosRequest(incluirInactivos)
        } catch (err) {
            error.value = 'Error al cargar los usuarios'
            throw err
        } finally {
            cargando.value = false
        }
    }

    async function obtenerPorId(usuarioId: number): Promise<UsuarioDto> {
        cargando.value = true
        error.value = null

        try {
            const usuario = await obtenerPorIdRequest(usuarioId)
            usuarioSeleccionado.value = usuario

            return usuario
        }catch(err) {
            error.value = 'Error al obtener el usuario'
            throw err
        }finally {
            cargando.value = false
        }
    }

    async function registrar(dto: RegistrarUsuarioDto): Promise<void> {
        await registrarRequest(dto)
        await listarUsuarios(true)
    }

    async function actualizar(
        usuarioId: number,
        dto: ActualizarUsuarioDto
    ): Promise<void> {
        await actualizarRequest(usuarioId, dto)
        await listarUsuarios(true)
    }

    async function activar(usuarioId: number): Promise<void> {
        await activarRequest(usuarioId)
        await listarUsuarios(true)
    }

    async function desactivar(usuarioId: number): Promise<void> {
        await desactivarRequest(usuarioId)
        await listarUsuarios(true)
    }

    async function desbloquear(usuarioId: number): Promise<void> {
        await desbloquearRequest(usuarioId)
        await listarUsuarios(true)
    }

    async function resetearPassword(
        usuarioId: number,
        dto: ResetearPasswordDto
    ): Promise<void> {
        await resetearPasswordRequest(usuarioId, dto)
    }

    function limpiarSeleccion(): void {
        usuarioSeleccionado.value = null
    }

    return {
        //Estado
        usuarios,
        usuarioSeleccionado,
        cargando,
        error,

        //Getters
        usuariosActivos,
        usuariosInactivos,
        totalUsuarios,

        //Acciones
        listarUsuarios,
        obtenerPorId,
        registrar,
        actualizar,
        activar,
        desactivar,
        desbloquear,
        resetearPassword,
        limpiarSeleccion
    }
})