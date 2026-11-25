export const useSidebar = () => {
    const isOpen = useState<boolean>('sidebar-abierto', () => false)

    const abrir = () => {
        isOpen.value = true
    }

    const cerrar = () => {
        isOpen.value = false
    }

    const toggle = () => {
        isOpen.value = !isOpen.value
    }

    return {
        isOpen,
        abrir,
        cerrar,
        toggle
    }
}