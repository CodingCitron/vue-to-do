<template>
    <div>
        <form @submit.prevent="onSubmit">
            <div class="d-flex">
                <div class="flex-grow-1 me-2">
                    <input
                        class="form-control"
                        type="text"
                        v-model="todo"
                        placeholder="Type new to-do"
                    />
                </div>
                <div>
                    <button type="submit" class="btn btn-primary">Add</button>
                </div>
            </div>
            <div v-if="hasError" class="mt-2 text-danger">
                아무것도 입력하지 않았습니다.
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    emits: ['add-todo'],
    setup(props, { emit }) {
        const todo = ref(''),
            hasError = ref(false),
            onSubmit = () => {
                if (todo.value.trim() === '') return (hasError.value = true)
                if (hasError.value === true) hasError.value = false

                emit('add-todo', {
                    id: Date.now(),
                    subject: todo.value,
                    completed: false,
                })

                todo.value = ''
            }

        return {
            todo,
            hasError,
            onSubmit,
        }
    },
}
</script>

<style scoped>
button {
    width: 80px;
}
</style>
