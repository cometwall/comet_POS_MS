import type { FetchOptions } from 'ofetch'

// Extendemos las opciones de ofetch con una bandera propia,
// para marcar "ya intenté refrescar, no insistas de nuevo"
interface OpcionesConReintento extends FetchOptions {
    _reintentado?: boolean
}

export function useApi() {
    const config = useRuntimeConfig()

    const api = $fetch.create({
        baseURL: String(config.public.apiBase),
        credentials: 'include',

        onRequest({ options }) {

        },
        async onResponseError({ request, response, options }) {
            const opts = options as OpcionesConReintento
            const esRutaDeAuth = response.url.includes('/api/Auth/refresh') || response.url.includes('/api/Auth/login')

            if (response.status !== 401 || esRutaDeAuth || opts._reintentado){
                return
            }

            opts._reintentado = true

            const auth = useAuthStore()

            try {
                await auth.refresh()
                opts.retry = 1
                opts.retryStatusCodes = [401]
            } catch (error){
                
            }

        }
    })

    return api
}