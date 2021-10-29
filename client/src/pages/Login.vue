<template>
    <Container center>
        <Card>
            <FTE />
            <Typography center variant="h2" :sx="{ marginBottom: '1em' }"
                >Admin Login</Typography
            >
            <Form @submit="(e) => handleSubmit(e)">
                <Alert
                    v-if="error"
                    severity="danger"
                    label="login failed, please try again"
                />
                <FormGroup>
                    <FormControl
                        category="input"
                        type="email"
                        label="email address"
                        name="email"
                        v-model="emailValue"
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        category="input"
                        type="password"
                        label="password"
                        name="password"
                        v-model="passwordValue"
                    />
                </FormGroup>
                <Button>
                    <Typography>login</Typography>
                </Button>
            </Form>
        </Card>
    </Container>
</template>

<script>
import { ref, provide, computed } from 'vue'
import { useRouter } from 'vue-router'

import { login } from '../store/user'
import store from '../store/store'
import FTE from '../components/FTE.vue'

export default {
    name: 'Login',
    components: {
        FTE,
    },
    setup () {
        provide('store', store)

        const router = useRouter()
        const emailValue = ref('')
        const passwordValue = ref('')

        const handleSubmit = async (e) => {
            e.preventDefault()

            try {
                await login(emailValue.value, passwordValue.value)

                if (store.user.status === 'success') router.push('/')
            } catch (err) {
                console.error(err)
            }


        }

        const error = computed(() => store.user.error)

        return {
            emailValue,
            passwordValue,
            handleSubmit,
            error
        }
    }
}
</script>

<style lang="scss">
.Card {
    width: 100%;
    max-width: 450px;
    margin: 0 auto;
    padding: $spacing-small;
    text-align: center;
}
</style>