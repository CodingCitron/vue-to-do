import { computed } from 'vue'
import { useStore } from 'vuex'

export const useToast = () => {
    const store = useStore()
    const toasts = computed(() => store.state.toast.toasts)
    // const showToast = computed(() => store.state.toast.showToast),
    //     toastMessage = computed(() => store.getters['toast/toastMessageWidthSmile']),
    //     toastType = computed(() => store.state.toast.toastType),
    const triggerToast = (message, type, time) => {
        store.dispatch('toast/triggerToast', {
            message: message,
            type: type,
            time: time,
        })
    }

    return {
        toasts,
        triggerToast,
    }
}
