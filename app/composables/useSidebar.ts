export const useSidebar = () => {
    const isOpen = useState<boolean>('sidebar-abierto', () => false)

    const bloquear = (bloquear: boolean) => {
        if (import.meta.client){
            document.body.style.overflow = bloquear ? 'hidden' : ''
        }
    }

    const abrir = () => {
        isOpen.value = true
        bloquear(true)
    }

    const cerrar = () => {
        isOpen.value = false
        bloquear(false)
    }

    const toggle = () => {
        if (isOpen.value) {
            cerrar()
        } else {
            abrir()
        }
    }

    return {
        isOpen,
        abrir,
        cerrar,
        toggle
    }
}