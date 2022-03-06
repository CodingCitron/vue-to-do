<template>
    <div>
        <AppHeader />
        <main class="container mt-2">
            <router-view />
        </main>
        <AppFooter />
    </div>
    <Toast />
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
import Toast from '@/components/common/Toast.vue'
import { useStore } from 'vuex'

export default {
    name: 'App',

    components: {
        AppHeader,
        AppFooter,
        Toast,
    },
}
</script>

<style></style>
