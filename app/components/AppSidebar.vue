<script setup lang="ts">
const {isOpen, cerrar } = useSidebar()

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen.value){
        cerrar()
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
    <div>
        <!-- Fondo oscuro (Backdrop)-->
        <Transition
            enter-active-class="transition-opacity duration-200 ease-in-out"
            leave-active-class="transition-opacity duration-200 ease-in-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <button
                v-if="isOpen"
                type="button"
                aria-label="Cerrar menú"
                class="fixed inset-0 z-40 bg-black/40"
                @click="cerrar"
            ></button>
        </Transition>

        <!-- Panel lateral -->
        <Transition
            enter-active-class="transition-transform duration-200 ease-in-out"
            leave-active-class="transition-transform duration-200 ease-in-out"
            enter-from-class="-translate-x-full"
            enter-to-class="translate-x-0"
            leave-from-class="translate-x-0"
            leave-to-class="-translate-x-full"
        >
            <aside
                v-if="isOpen"
                class="fixed inset-y-0 left-0 z-50 w-64 max-w-[85vw] bg-white shadow-xl"
                aria-label="Menú principal"
            >
                <!-- Cabecera del sidebar -->
                 <div class="flex items-center justify-between p-4 border-b border-gray-200">
                     <h2 class="text-lg font-bold text-gray-800">
                        Menú
                    </h2>
                     <button 
                        @click="cerrar" 
                        aria-label="Cerrar menú" 
                        class="text-gray-600 hover:text-gray-800"
                        >
                            &times;
                     </button>
                 </div>
                 <!-- Enlaces de navegación -->
                    <nav class="p-4">
                        <NuxtLink
                          to="/dashboard"
                          @click="cerrar"
                          class="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                        >
                        Dashboard
                        </NuxtLink>
                    </nav>
            </aside>
        </Transition>
    </div>
</template>