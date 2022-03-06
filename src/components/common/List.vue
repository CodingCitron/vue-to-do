<template>
    <div
        v-for="(item, index) in items"
        v-bind:key="item.id"
        class="d-flex mt-2 align-items-center"
    >
        <slot :item="item" :index="index"></slot>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
}
</script>

<style></style>
