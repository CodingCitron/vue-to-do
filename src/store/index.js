import { createStore } from 'vuex'

export default createStore({
    modules: {
        toast: {
            namespaced: true,
            state: {
                toasts: [],
            },
            mutations: {
                ADD_TOAST(state, payload) {
                    state.toasts.push(payload)
                },
                REMOVE_TOAST(state) {
                    state.toasts.shift()
                },
            },
            actions: {
                triggerToast(context, payload) {
                    context.commit('ADD_TOAST', {
                        id: Date.now(),
                        message: payload.message,
                        type: payload.type,
                    })

                    const timeout = setTimeout(() => {
                        context.commit('REMOVE_TOAST')
                    }, payload.time)
                },
            },

            getters: {
                toastMessageWidthSmile(state) {
                    return `${state.toastMessage} :-)`
                },
            },
        },
    },
})
