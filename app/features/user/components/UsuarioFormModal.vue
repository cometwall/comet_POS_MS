<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useUserStore } from '~/stores/user'
import type { UsuarioDto } from '~/types/user'

const props = defineProps<{
    abierto: boolean
    usuario: UsuarioDto | null
}>()

const emit = defineEmits<{
    cerrar: []
}>()

const auth = useAuthStore()
const userStore = useUserStore()

const esSuperAdmin = computed(() => auth.tieneRol('SuperAdmin'))
const esEdicion = computed(() => props.usuario !== null)
const rolesDisponibles = computed(() => esSuperAdmin.value ? ['Cajero', 'Admin', 'SuperAdmin'] : ['Cajero'])

const nombre = ref('')
const email = ref('')
const password = ref('')
const rol = ref('Cajero')
const sucursalId = ref<number | null>(null)

const cargando = ref(false)
const errorGeneral = ref('')

watch(() => props.abierto, (abierto) => {
    if (!abierto) {
        return
    }

    errorGeneral.value = ''

    if (props.usuario) {
        nombre.value = props.usuario.nombre
        email.value = props.usuario.email
        rol.value = props.usuario.rol
        sucursalId.value = props.usuario.sucursalId
    } else {
        nombre.value = ''
        email.value = ''
        password.value = ''
        rol.value = rolesDisponibles.value[0] ?? 'Cajero'
        sucursalId.value = esSuperAdmin.value ? null : (auth.usuario?.sucursalId ?? null)
    }
})

async function onSubmit() {
    errorGeneral.value = ''
    cargando.value = true

    try {
        if (esEdicion.value && props.usuario) {
            await userStore.actualizar(props.usuario.id, {
                nombre: nombre.value,
                rol: rol.value,
                sucursalId: sucursalId.value
            })
        } else {
            await userStore.registrar({
                nombre: nombre.value,
                email: email.value,
                password: password.value,
                rol: rol.value,
                sucursalId: sucursalId.value
            })
        }
        emit('cerrar')
    } catch (error: any) {
        errorGeneral.value = typeof error.data === 'string' ? error.data : 'Ocurrió un error. Intenta de nuevo.'
    } finally {
        cargando.value = false
    }
}
</script>

<template>
  <div v-if="abierto" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
      <h3 class="text-lg font-bold text-gray-900 mb-4">
        {{ esEdicion ? 'Editar usuario' : 'Nuevo usuario' }}
      </h3>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            v-model="nombre"
            required
            class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div v-if="!esEdicion">
          <label class="block text-sm font-medium text-gray-700 mb-1">Correo</label>
          <input
            v-model="email"
            type="email"
            autocomplete="off"
            required
            class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div v-if="!esEdicion">
          <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            v-model="password"
            type="password"
            autocomplete="new-password"
            required
            class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Rol</label>
          <select
            v-model="rol"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option v-for="r in rolesDisponibles" :key="r" :value="r">{{ r }}</option>
          </select>
        </div>

        <div v-if="esSuperAdmin">
          <label class="block text-sm font-medium text-gray-700 mb-1">Sucursal ID</label>
          <input
            v-model.number="sucursalId"
            type="number"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <p v-if="errorGeneral" class="text-sm text-red-600">{{ errorGeneral }}</p>

        <div class="flex justify-end gap-2 pt-2">
          <button
            type="button"
            @click="emit('cerrar')"
            class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="cargando"
            class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{ cargando ? 'Guardando...' : 'Guardar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
