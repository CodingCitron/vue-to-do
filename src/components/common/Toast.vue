<template>
    <div class="toast-box">
        <Transition-group name="fade">
            <div
                v-for="toast in toasts"
                :key="toast.id"
                class="alert mb-2"
                role="alert"
                :class="`alert-${toast.type}`"
            >
                {{ toast.message }}
            </div>
        </Transition-group>
    </div>
</template>

<script>
import { useToast } from '@/composables/toast'

export default {
    setup() {
        const { toasts } = useToast()

        return {
            toasts,
        }
    },
}
</script>

<style scoped>
.toast-box {
    position: fixed;
    bottom: 24px;
    right: 24px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
</style>
