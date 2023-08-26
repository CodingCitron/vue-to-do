<template>
    <div>
        <div class="d-flex justify-content-between">
            <h2 class="mt-2">To-Do List</h2>
            <button
                class="btn btn-primary w80 mt-2 mb-2"
                type="button"
                @click="moveToCreatePage"
            >
                생성
            </button>
        </div>
        <input
            class="form-control mb-2"
            type="text"
            placeholder="Search"
            v-model="searchText"
            @keyup.enter="searchTodo"
        />
        <div class="mt-2 text-danger">{{ error }}</div>
        <div class="mt-2" v-if="!todos.length">추가된 Todo가 없습니다.</div>
        <ToDoList
            :todos="todos"
            @toggle-todo="toggleTodo"
            @delete-todo="deleteTodo"
        />
        <Pagination
            v-if="todos.length"
            :totalPage="totalPage"
            :currentPage="currentPage"
            @click="getTodos"
        />
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/axios'
import ToDoList from '@/components/todo/ToDoList'
import { useToast } from '@/composables/toast'
import Pagination from '@/components/common/Pagination.vue'

export default {
    components: {
        ToDoList,
        Pagination,
    },

    setup() {
        const todos = ref([]),
            searchText = ref(''),
            error = ref(''),
            numberOfTodos = ref(0),
            limit = 3,
            currentPage = ref(1),
            totalPage = computed(() => {
                return Math.ceil(numberOfTodos.value / limit)
            }),
            time = 500
        let timeout = null

        const router = useRouter()

        const moveToCreatePage = () => {
            router.push('/todos/create')
        }

        const { showToast, toastMessage, toastType, triggerToast } =
            useToast(5000)

        watch(searchText, (current, prev) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                getTodos(1)
            }, time)
        })
        // const filteredTodos = computed(() => {
        //     if (searchText.value && todos.value.length) {
        //         return todos.value.filter(todo => {
        //             return todo.subject.includes(searchText.value.trim())
        //         })
        //     }

        //     return todos.value
        // })

        const searchTodo = () => {
            clearTimeout(timeout)
            getTodos(1)
        }

        const getTodos = async (page = currentPage.value) => {
            try {
                const res = await axios.get(
                    `todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`,
                )
                todos.value = res.data
                numberOfTodos.value = res.headers['x-total-count']
                currentPage.value = page
            } catch (error) {
                console.error(error)
                triggerToast('ToDo 목록을 가져오지 못했습니다.', 'danger', 5000)
            }
        }

        getTodos()

        const addTodo = async todo => {
                error.value = ''
                try {
                    const res = await axios.post('todos', {
                        subject: todo.subject,
                        completed: todo.completed,
                    })

                    getTodos()
                } catch (err) {
                    error.value = '에러가 발생했습니다.'
                    console.error(err)
                    triggerToast(
                        'ToDo 목록을 추가하는데 실패 했습니다.',
                        'danger',
                        5000,
                    )
                }
            },
            toggleTodo = async (index, checked) => {
                error.value = ''
                const id = todos.value[index].id

                try {
                    await axios.patch('todos/' + id, {
                        completed: checked,
                    })
                    todos.value[index].completed = checked
                } catch (error) {
                    console.error(error)
                    error.value = '에러가 발생했습니다.'
                    triggerToast(
                        'ToDo toggle의 상태를 변경하는데 실패 했습니다.',
                        'danger',
                        5000,
                    )
                }
            },
            deleteTodo = async id => {
                error.value = ''

                try {
                    await axios.delete('todos/' + id)
                    getTodos()
                } catch (error) {
                    console.error(error)
                    error.value = '에러가 발생했습니다.'
                    triggerToast(
                        'ToDo를 삭제하는데 실패 했습니다.',
                        'danger',
                        5000,
                    )
                }
            }

        return {
            todos,
            addTodo,
            toggleTodo,
            deleteTodo,
            searchText,
            //filteredTodos,
            error,
            getTodos,
            totalPage,
            currentPage,
            searchTodo,
            //Toast
            showToast,
            toastMessage,
            toastType,
            triggerToast,
            //createPage
            moveToCreatePage,
        }
    },
}
</script>

<style></style>
