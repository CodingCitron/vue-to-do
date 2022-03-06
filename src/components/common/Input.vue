<template>
    <div class="form-group">
        <label :for="id">{{ label }}</label>
        <input
            ref="input"
            @input="onInput"
            type="text"
            class="form-control mt-2"
            :id="id"
            :value="value"
        />
        <div v-if="error" class="mt-2 text-danger">{{ error }}</div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { onMounted } from '@vue/runtime-core'
export default {
    props: {
        label: {
            type: String,
        },
        id: {
            type: String,
        },
        value: {
            type: String,
        },
        error: {
            type: String,
        },
        focus: {
            type: Boolean,
        },
    },

    emits: ['update:value'],

    setup(props, context) {
        const input = ref(null)

        const onInput = e => context.emit('update:value', e.target.value)

        onMounted(() => {
            if (props.focus) {
                input.value.focus()
            }
        })

        return {
            input,
            onInput,
        }
    },
}
</script>

<style></style>
