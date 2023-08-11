import { createRouter, createWebHistory } from 'vue-router'
import ToDos from '@/views/ToDo.vue'
import ToDo from '@/views/ToDoUpdate.vue'
import ToDoCreate from '@/views/ToDoCreate.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/todos',
            alias: '/',
            name: 'Todos',
            component: ToDos,
        },
        {
            path: '/todos/:id',
            name: 'ToDo',
            component: ToDo,
        },
        {
            path: '/todos/create',
            name: 'ToDoCreate',
            component: ToDoCreate,
        },
    ],
})

export default router
