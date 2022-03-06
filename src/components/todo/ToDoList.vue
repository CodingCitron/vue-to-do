<template>
    <div>
        <List :items="todos">
            <template #default="{ item, index }">
                <div class="card flex-grow-1 me-2">
                    <div
                        class="card-body p-2 d-flex align-items-center"
                        @click="moveToPage(item.id)"
                    >
                        <div class="flex-grow-1">
                            <input
                                class="form-check-input me-2"
                                type="checkbox"
                                :checked="item.completed"
                                @change="toggleTodo(index, $event)"
                                @click.stop
                            />
                            <label
                                class="form-check-label"
                                v-bind:class="{ todo: item.completed }"
                                >{{ item.subject }}</label
                            >
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    class="btn btn-danger"
                    @click.stop="openModal(item.id)"
                >
                    Delete
                </button>
            </template>
        </List>
        <teleport to="#modal">
            <Transition name="fade">
                <Modal
                    v-if="showModal"
                    @close="closeModal"
                    @delete="deleteTodo"
                />
            </Transition>
        </teleport>
    </div>
</template>

<script>
import { watchEffect, ref } from 'vue'
import { useRouter } from 'vue-router'
import Modal from '@/components/common/Modal'
import List from '@/components/common/List'

export default {
    components: {
        Modal,
        List,
    },
    props: {
        todos: {
            type: Array,
            required: true,
        },
    },

    emits: ['toggle-todo', 'delete-todo'],

    setup(props, { emit }) {
        const router = useRouter()
        const showModal = ref(false)
        const todoDeleteId = ref(null)
        const toggleTodo = (index, event) => {
            emit('toggle-todo', index, event.target.checked)
        }

        const openModal = id => {
            showModal.value = true
            todoDeleteId.value = id
        }

        const closeModal = () => {
            todoDeleteId.value = null
            showModal.value = false
        }

        const deleteTodo = () => {
                emit('delete-todo', todoDeleteId.value)
                showModal.value = false
                todoDeleteId.value = null
            },
            moveToPage = id => {
                // router.push('/todos/' + id) //path 방식
                // name 방식
                router.push({
                    name: 'ToDo',
                    params: {
                        id: id,
                    },
                })
            }

        return {
            toggleTodo,
            deleteTodo,
            moveToPage,
            showModal,
            openModal,
            closeModal,
        }
    },
}
</script>

<style scoped>
.todo {
    color: gray;
    text-decoration: line-through;
}

.form-check-input,
.form-check-label,
.card-body {
    cursor: pointer;
}

button {
    width: 80px;
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
