<template>
    <div class="modal-wrapper">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Delete To-Do</h5>
                    <button
                        type="button"
                        class="btn-close"
                        @click="onClose"
                    ></button>
                </div>
                <div class="modal-body">
                    <p>정말 To-Do를 삭제하실 건가요?</p>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        @click="onClose"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        class="btn btn-danger"
                        @click="onDelete"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup(props, { emit }) {
        const onClose = () => {
            emit('close')
        }

        const onDelete = () => {
            emit('delete')
        }

        return {
            onClose,
            onDelete,
        }
    },
}
</script>

<style scoped>
.modal-wrapper {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
