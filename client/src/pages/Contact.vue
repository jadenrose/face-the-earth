<template>
    <Container>
        <section class="Contact">
            <Form @submit.prevent="handleSubmit">
                <Typography center variant="h1" :sx="{ marginBottom: '2em' }"
                    >book us</Typography
                >
                <FormGroup>
                    <FormControl
                        label="your name"
                        name="name"
                        v-model="nameValue"
                        :error="errors.nameValue"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        label="email address"
                        name="email"
                        v-model="emailValue"
                        :error="errors.emailValue"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        label="venue type"
                        name="venueType"
                        v-model="venueTypeValue"
                        :error="errors.venueTypeValue"
                        category="select"
                        :options="[
                            {
                                label: 'Restaurant/Bar',
                                value: 'restaurant',
                            },
                            {
                                label: 'Theatre/Stage',
                                value: 'theatre',
                            },
                            {
                                label: 'Home/Private Estate',
                                value: 'home',
                            },
                            {
                                label: 'Wedding',
                                value: 'wedding',
                            },
                        ]"
                        required
                    />
                </FormGroup>
                <FormGroup v-if="venueTypeValue === 'other'">
                    <FormControl
                        label="custom venue type"
                        name="otherVenueType"
                        v-model="otherVenueTypeValue"
                        :error="errors.otherVenueTypeValue"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        label="estimated date for show"
                        type="date"
                        name="date"
                        v-model="dateValue"
                        :error="errors.dateValue"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        label="any other important information"
                        category="textarea"
                        name="otherInfo"
                        v-model="otherInfoValue"
                    />
                </FormGroup>
                <FormGroup class="button-container">
                    <FancyButton big label="book us now" />
                </FormGroup>
            </Form>
        </section>
    </Container>
</template>

<script>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { isEmail } from 'validator'

import { postBooking } from '../store/bookings'

export default {
    name: 'Contact',
    setup () {
        const router = useRouter()
        const nameValue = ref('')
        const emailValue = ref('')
        const venueTypeValue = ref('')
        const otherVenueTypeValue = ref('')
        const dateValue = ref('')
        const otherInfoValue = ref('')

        const state = reactive({
            errors: {},
        })

        const errors = computed(() => state.errors)

        const handleSubmit = async () => {
            try {
                const errors = {}

                if (!nameValue.value) errors.nameValue = 'your name is required'
                if (!emailValue.value || !isEmail(emailValue.value)) errors.emailValue = 'please enter a valid email address'
                if (!venueTypeValue.value) errors.venueTypeValue = 'please select a venue type'
                if (venueTypeValue.value === 'other' && !otherVenueTypeValue.value) errors.otherVenueTypeValue = 'if selecting "other", please enter a custom venue type'
                if (!dateValue.value) errors.dateValue = 'please enter a date'

                if (Object.entries(errors).length) throw errors

                const req = {
                    name: nameValue.value,
                    email: emailValue.value,
                    venueType: venueTypeValue.value === 'other' ? otherVenueTypeValue.value : venueTypeValue.value,
                    date: dateValue.value,
                    otherInfo: otherInfoValue.value
                }

                await postBooking(req)

                router.push('success')
            } catch (err) {
                console.error(err)
                state.errors = { ...err }
            }


        }

        return {
            nameValue,
            emailValue,
            venueTypeValue,
            otherVenueTypeValue,
            dateValue,
            otherInfoValue,
            handleSubmit,
            errors
        }
    }
}
</script>

<style lang="scss">
.Contact {
    padding: 12em 0;

    .Form {
        margin-left: auto;
        margin-right: auto;
    }

    .FormGroup {
        margin-bottom: $spacing-med;
    }

    .button-container {
        justify-content: center;
    }
}
</style>