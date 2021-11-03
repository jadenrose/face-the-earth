<template>
    <Container class="Login" center>
        <FTE />
        <Typography center variant="h2">Admin Login</Typography>
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
            <Button label="login" />
        </Form>
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
        const currentRoute = router.currentRoute.value.fullPath

        const routeArray = currentRoute.split('/')
        routeArray.pop()
        const redirectAfterLogin = routeArray.join('/') || '/'

        const emailValue = ref('')
        const passwordValue = ref('')

        const handleSubmit = async (e) => {
            e.preventDefault()

            try {
                await login(emailValue.value, passwordValue.value)

                if (store.user.status === 'success') router.push(redirectAfterLogin)
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
.Login {
    margin: 0 auto;
    padding: $spacing-small;
    text-align: center;

    .Form {
        width: 400px;
        align-self: stretch;
        justify-self: stretch;
    }

    .FTE {
        margin-bottom: $spacing-small;
    }

    h2 {
        margin-bottom: $spacing-small;
    }
}
</style>