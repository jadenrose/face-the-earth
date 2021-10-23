<template>
    <Container center>
        <Card>
            <FTE />
            <Typography center variant="h2" :sx="{ marginBottom: '1em' }"
                >Admin Login</Typography
            >
            <Form @submit="(e) => handleSubmit(e)">
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import store from '../store/store'
import FTE from '../components/FTE.vue'

export default {
    name: 'Login',
    components: {
        FTE,
    },
    setup () {
        const router = useRouter()
        const emailValue = ref('')
        const passwordValue = ref('')

        const handleSubmit = async (e) => {
            e.preventDefault()

            try {
                await store.login(emailValue.value, passwordValue.value)

                router.push('/')
            } catch (err) {
                console.error(err)
            }


        }

        return {
            emailValue,
            passwordValue,
            handleSubmit
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