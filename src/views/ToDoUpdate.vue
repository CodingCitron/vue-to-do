<template>
    <div>
        <h2>Update To-Do</h2>
        <ToDoForm :editing="true" />
    </div>
</template>

<script>
import ToDoForm from '@/components/todo/ToDoForm'

export default {
    components: {
        ToDoForm,
    },
}
</script>

<style></style>
