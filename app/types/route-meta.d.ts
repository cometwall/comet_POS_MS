import type { Rol } from './auth'

declare module 'vue-router' {
    interface RouteMeta {
        publico?: boolean
        rolMinimo?: Rol
    }
}

export {}