<script setup lang="ts">
const {isOpen, toggle } = useSidebar()
</script>

<template>
    <header class="sticky top-0 z-50 w-full h-16 bg-white border-b border-gray-200 flex
    items-center justify-between px-5 sm:px-6 lg:px-8"
    >
        <button
          @click="toggle"
          aria-label="Abrir menú"
          :aria-expanded="isOpen"
          class="flex flex-col justify-center gap-1.5 p-2 cursor-pointer"
        >
          <span class="block w-6 border-t-2 border-gray-800"></span>
          <span class="block w-6 border-t-2 border-gray-800"></span>
          <span class="block w-6 border-t-2 border-gray-800"></span>
        </button>

        <h1 class="text-lg sm:text-lg font-bold text-gray-800">
            Mi aplicacion
        </h1>
    </header>
</template>

