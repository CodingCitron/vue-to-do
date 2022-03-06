import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/Home.vue'
import ToDos from '@/views/ToDo.vue'
import ToDo from '@/views/ToDoUpdate.vue'
import ToDoCreate from '@/views/ToDoCreate.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage,
        },
        {
            path: '/todos',
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

// 1 /home 2 /todos 3 /todos/create 4 /todos/:id

export default router
