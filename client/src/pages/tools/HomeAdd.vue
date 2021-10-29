<template>
    <div @click.self="handleCancel" class="HomeAdd">
        <Form>
            <FormGroup>
                <FormControl
                    label="Article Header"
                    name="header"
                    v-model="headerValue"
                />
            </FormGroup>
            <FormGroup>
                <FormControl
                    category="textarea"
                    label="Article Body"
                    name="body"
                    v-model="bodyValue"
                />
            </FormGroup>
            <FormGroup class="buttons">
                <div class="button-wrapper">
                    <Button @click="(e) => handleSave(e)">
                        <Typography>save</Typography>
                    </Button>
                </div>
                <div class="button-wrapper">
                    <Button @click="(e) => handleCancel(e)">
                        <Typography>cancel</Typography>
                    </Button>
                </div>
            </FormGroup>
        </Form>
    </div>
</template>

<script>
import { provide, ref } from 'vue'

import { postArticle } from '../../store/articles'
import { setMode } from '../../store/ui'
import store from '../../store/store'

export default {
    name: 'HomeAdd',
    setup () {
        provide('store', store)

        const headerValue = ref('')
        const bodyValue = ref('')

        const handleSave = (e) => {
            e.preventDefault()

            postArticle(headerValue.value, bodyValue.value)
        }

        const handleCancel = (e) => {
            e.preventDefault()

            setMode('readonly')
        }

        return {
            headerValue,
            bodyValue,
            handleSave,
            handleCancel,
        }
    }
}
</script>

<style lang="scss">
.HomeAdd {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($background, 0.95);
    display: flex;
    align-items: center;
    z-index: 999;

    .Form {
        display: flex;
        flex-direction: column;
        background: $background-light;
        width: 90%;
        max-width: 700px;
        padding: 3em;
        border-radius: 4px;
        box-shadow: 10px 10px 100px $background;
    }

    .buttons {
        align-self: center;
        justify-content: center;
    }

    .button-wrapper {
        padding: 1em 2em 0;
    }
}
</style>