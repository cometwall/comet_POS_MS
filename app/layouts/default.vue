<template>
  <div class="min-h-screen bg-gray-50">
    
    <!-- Barra superior-->
    <AppNavbar />
    
    <!-- Menu lateral -->
    <AppSidebar />

    <!-- Contenido de las páginas-->
    <main class="w-full p-4 sm:p-6 lg:p-8">
      <slot />
    </main>
  </div>
</template>
