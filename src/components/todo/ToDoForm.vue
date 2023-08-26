<template>
    <div v-if="loading">Loading...</div>
    <form v-else @submit.prevent="onSave">
        <div class="row">
            <div :class="editing ? 'col-6' : ''">
                <Input
                    label="제목"
                    v-model:value="toDo.subject"
                    :error="subjectError"
                    :focus="editing ? false : true"
                />
            </div>
            <div v-if="editing" class="col-6">
                <div class="form-group">
                    <label>상태</label>
                    <div>
                        <button
                            type="button"
                            class="btn mt-2"
                            :class="
                                toDo.completed ? 'btn-success' : 'btn-danger'
                            "
                            @click="toggleToDoStatus"
                        >
                            {{ toDo.completed ? '완료' : '미완' }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-2">
                <div class="form-group">
                    <label for="textarea">내용</label>
                    <textarea
                        id="textarea"
                        v-model="toDo.body"
                        class="form-control mt-2"
                    ></textarea>
                </div>
            </div>
        </div>
        <div class="mt-2 d-flex justify-content-end">
            <button
                type="submit"
                class="btn btn-primary btn-sm me-2"
                :disabled="!toDoUpdate"
            >
                {{ editing ? 'Update' : 'Create' }}
            </button>
            <button
                type="button"
                class="btn btn-outline-dark btn-sm"
                @click="moveToToDoListPage"
            >
                Cancel
            </button>
        </div>
    </form>
</template>

<script>
import { ref, computed, onUpdated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/axios'
import _ from 'lodash'
import Toast from '@/components/common/Toast'
import { useToast } from '@/composables/toast'
import Input from '@/components/common/Input.vue'

export default {
    components: {
        Toast,
        Input,
    },
    props: {
        editing: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const route = useRoute()
        const router = useRouter()
        const toDo = ref({
            subject: '',
            completed: false,
            body: '',
        })
        const originalToDo = ref(null)
        const loading = ref(false)
        const toDoId = route.params.id
        /* 토스트 */
        const { showToast, toastMessage, toastType, triggerToast } = useToast()
        /* 토스트 */

        const subjectError = ref('')

        /*
        onUpdated(() => {
            console.log(toDo.value.subject)
        })
        */

        const getToDo = async () => {
            loading.value = true
            try {
                const res = await axios.get(`todos/${toDoId}`)
                toDo.value = { ...res.data }
                originalToDo.value = { ...res.data }
            } catch (error) {
                console.error(error)
                triggerToast('ToDo를 가져오지 못했습니다.', 'danger', 5000)
            }

            loading.value = false
        }

        const toDoUpdate = computed(() => {
            return !_.isEqual(toDo.value, originalToDo.value)
        })

        const toggleToDoStatus = async () => {
            toDo.value.completed = !toDo.value.completed
        }

        const moveToToDoListPage = () => {
            router.push('/todos')
        }

        const onSave = async () => {
            subjectError.value = ''
            if (!toDo.value.subject) {
                subjectError.value = 'subject는 필수 입력 값입니다.'
                return
            }

            try {
                let res,
                    con = 'post'

                if (props.editing) con = 'put'

                res = await axios[con](`todos/${props.editing ? toDoId : ''}`, {
                    subject: toDo.value.subject,
                    completed: toDo.value.completed,
                    body: toDo.value.body,
                })

                if (props.editing) {
                    originalToDo.value = { ...res.data }
                    triggerToast('업데이트가 완료 되었습니다.', 'success', 5000)
                } else {
                    triggerToast('To-Do를 생성했습니다.', 'success', 5000)
                    router.push('/todos')
                }
            } catch (error) {
                console.error(error)
                triggerToast('저장을 실패 했습니다.', 'danger', 5000)
            }
        }

        if (props.editing) {
            getToDo()
        } else {
        }

        return {
            toDo,
            loading,
            toggleToDoStatus,
            moveToToDoListPage,
            onSave,
            toDoUpdate,
            showToast,
            toastMessage,
            toastType,
            subjectError,
        }
    },
}
</script>

<style scopued></style>
