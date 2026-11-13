export default defineNuxtRouteMiddleware((to) => {
    const auth = useAuthStore()

    if (to.meta.publico){
        return
    }

    if(!auth.estaAutenticado){
        return navigateTo({
            path: '/login',
            query: {
                redirect: to.fullPath
            }
        })
    }

    if (to.meta.rolMinimo && !auth.tieneNivel(to.meta.rolMinimo as Rol)) {
        return navigateTo('/')
    }
})