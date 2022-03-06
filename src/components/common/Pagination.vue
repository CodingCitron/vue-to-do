<template>
    <nav
        aria-label="Page navigation example"
        class="mt-2 d-flex justify-content-center"
    >
        <ul class="pagination mb-0">
            <li class="page-item" v-if="currentPage !== 1">
                <a
                    class="page-link"
                    href="#"
                    aria-label="Previous"
                    @click="onClick(currentPage - 1)"
                >
                    <i class="bi bi-chevron-left"></i>
                </a>
            </li>
            <li
                class="page-item"
                v-for="page in totalPage"
                v-bind:key="page"
                v-bind:class="currentPage === page ? 'active' : ''"
            >
                <a class="page-link" @click="onClick(page)">{{ page }}</a>
            </li>
            <li class="page-item" v-if="currentPage !== totalPage">
                <a
                    class="page-link"
                    href="#"
                    aria-label="Next"
                    @click="onClick(currentPage + 1)"
                >
                    <i class="bi bi-chevron-right"></i>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        totalPage: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
    },

    emits: ['click'],

    setup(props, context) {
        const onClick = page => {
            context.emit('click', page)
        }

        return {
            onClick,
        }
    },
}
</script>

<style></style>
