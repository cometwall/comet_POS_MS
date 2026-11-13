<script setup lang="ts">
import { z } from 'zod';
import { useAuthStore } from '~/stores/auth'


const route = useRoute()
const auth = useAuthStore()

//Valudacion del formulario
const esquemaLogin = z.object({
    email: z.string().email('Correo invalido'),
    password: z.string().min(1, 'La contraseña es requerida')
})

//Estado reactivo
const email = ref('')
const password = ref('')
const cargando = ref(false)

const errores = ref<{
    email?: string,
    password?: string
}>({})

const errorGeneral = ref('')

//Envio del formulario
async function onSubmit(){
    errores.value = {}
    errorGeneral.value = ''

    const resultado = esquemaLogin.safeParse({
        email: email.value,
        password: password.value
    })

    //Validacion local con zod
    if (!resultado.success) {
        const erroresValidacion = resultado.error.flatten().fieldErrors

        errores.value = {
            email: erroresValidacion.email?.[0],
            password: erroresValidacion.password?.[0]
        }
        return
    }

    cargando.value = true

    try {
        await auth.login({
            email: email.value,
            password: password.value
        })

        //Recuperar destino original o redirigir al dashboard
        const redirect = route.query.redirect
        const destino = typeof redirect === 'string' ? redirect : '/dashboard'

        await navigateTo(destino)
    }catch(error: any){
        //Mantener un mensaje generico para no revelar
        //si el usuario existe o si la contraseña es incorrecta
        if (error.statusCode === 429 || error.response?.status === 429){
            errorGeneral.value = 'Demasiados intentos. Espera un momento antes de volver a intentarlo.'
        } else {
            errorGeneral.value = 'Credenciales invalidas'
        }
    }finally{
        cargando.value = false
    }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md mx-auto">
      <div class="mb-8 text-center">
        <h1 class="text-2xl font-bold text-gray-900">
          Iniciar sesión
        </h1>
        <p class="mt-2 text-sm text-gray-600">
          Ingresa tus credenciales para continuar.
        </p>
      </div>
  
      <form @submit.prevent="onSubmit" class="space-y-5">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
  
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="correo@ejemplo.com"
            :disabled="cargando"
            class="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
          />
  
          <p v-if="errores.email" class="mt-1 text-sm text-red-600">
            {{ errores.email }}
          </p>
        </div>
  
        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
  
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            placeholder="Tu contraseña"
            :disabled="cargando"
            class="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
          />
  
          <p v-if="errores.password" class="mt-1 text-sm text-red-600">
            {{ errores.password }}
          </p>
        </div>
  
        <!-- Error general -->
        <div
          v-if="errorGeneral"
          role="alert"
          class="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
        >
          {{ errorGeneral }}
        </div>
  
        <!-- Submit -->
        <button
          type="submit"
          :disabled="cargando"
          class="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {{ cargando ? 'Iniciando sesión...' : 'Iniciar sesión' }}
        </button>
      </form>
    </div>
  </div>
</template>