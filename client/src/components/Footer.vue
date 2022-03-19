<template>
    <footer class="Footer">
        <Container>
            <div class="footer-middle">
                <div class="left">
                    <div class="quick-links">
                        <Typography variant="h5">quick links</Typography>
                        <RouterLinks />
                    </div>
                    <div class="info">
                        <Typography variant="h5">contact info</Typography>
                        <ul>
                            <li>
                                <Typography>Face the Earth</Typography>
                            </li>
                            <li>
                                <Typography>Red Deer, AB, Canada</Typography>
                            </li>
                            <li>
                                <a href="mailto:info@facetheearth.ca">
                                    <Typography
                                        >info@facetheearth.ca</Typography
                                    >
                                </a>
                            </li>
                        </ul>
                        <SocialLinks />
                    </div>
                </div>

                <div class="signup">
                    <Typography variant="p">
                        Sign up for our monthly newsletter and you'll be the
                        first to know about new music releases and merch drops!
                    </Typography>
                    <div v-if="state.submitted" class="submit-message">
                        <Typography variant="p">
                            {{ state.message }}
                        </Typography>
                    </div>
                    <Form v-else @submit.prevent="handleSubmit">
                        <FormGroup>
                            <FormControl
                                type="email"
                                label="email address"
                                v-model="emailValue"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button label="sign up" />
                        </FormGroup>
                    </Form>
                </div>
            </div>
            <div class="footer-bottom">
                <cite>&copy; Copyright {{ year }} Face the Earth</cite>
                <ul class="terms-policy">
                    <li>
                        <router-link class="terms" to="/terms">
                            <Typography>terms and conditions</Typography>
                        </router-link>
                    </li>
                    <li>
                        <router-link class="policy" to="/privacy">
                            <Typography>privacy policy</Typography>
                        </router-link>
                    </li>
                </ul>
            </div>
        </Container>
    </footer>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { isEmail } from 'validator'
import axios from 'axios'

import SocialLinks from './SocialLinks.vue'
import RouterLinks from './RouterLinks.vue'

export default {
    name: "Footer",
    components: {
        SocialLinks,
        RouterLinks
    },
    setup () {
        const BASE_URL = process.env.VUE_APP_BACKEND_URI || 'http://localhost:5000'
        const year = computed(() => new Date().getFullYear())
        const emailValue = ref('')
        const state = reactive({
            message: '',
            submitted: false
        })

        const handleSubmit = async () => {
            if (isEmail(emailValue.value)) {
                try {
                    await axios.post(`${BASE_URL}/api/subscribe`, { email: emailValue.value })
                    state.message = 'Thank you! You\'ve been added to our mailing list!'
                } catch (err) {
                    state.message = 'Sorry, there was a problem adding you to our mailing list.'
                } finally {
                    state.submitted = true
                }
            }
        }

        return { year, emailValue, handleSubmit, state }
    }
}
</script>

<style lang="scss">
.Footer {
    background: $background-light;
    padding: 3em 0;
    font-size: 0.8rem;

    .Container {
        max-width: unset;
    }

    .RouterLinks {
        display: inline-block;
        margin: 0;
        padding: 0;

        a {
            padding: 0.3em 0;
            display: inline-block;

            .Typography {
                font-weight: $normal;
                text-transform: lowercase;
            }
        }
    }

    cite {
        opacity: 0.7;
        margin-bottom: 1em;

        @include tablet {
            margin-bottom: 0;
        }
    }
}

.footer-middle,
.footer-bottom {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    @include tablet {
        align-items: baseline;
        flex-direction: row;
    }
}

.footer-middle {
    margin-bottom: 2em;
}

.footer-middle {
    h5 {
        margin-bottom: 1em;
    }

    p {
        margin-bottom: 1em;
    }

    .left {
        display: flex;
        justify-content: space-between;
        flex: 1 1 50%;
        margin-bottom: 2em;

        .quick-links {
            text-align: left;
            margin-right: 2em;
            flex: 0 1 50%;
        }

        .SocialLinks {
            margin: 0;
            transform: translateX(-5px);
            justify-content: left;

            .linkImg {
                padding: 0.2em;
            }

            img {
                width: 2em;
            }
        }
    }

    .info {
        text-align: left;
        flex: 0 1 50%;

        ul {
            margin: 0 0 1em;
            padding: 0;
            list-style: none;
        }

        li {
            padding: 0.2em 0;
        }

        a {
            text-decoration: underline;
        }
    }

    .signup {
        flex: 0 1 35%;
        width: 50vw;
        max-width: 350px;
        margin: 0 auto;
        text-align: left;

        @include tablet {
            margin: 0;
        }
    }

    .FormGroup {
        justify-content: center;
        align-self: flex-start;
    }

    label {
        font-size: 0.8rem;
    }

    input[type="email"] {
        font-size: 0.8rem;
        padding: 1em;
    }

    .Button {
        padding: 0.6em;
        width: 100%;
    }
}

.terms-policy {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    transform: translateX(0.5em);

    span {
        transform: translateY(-2px);
    }

    a {
        display: flex;
        align-items: center;
        padding: 0.2em 0.5em;

        .Typography {
            @include hoverEffect;
            display: block;
        }
    }
}

.terms {
    border-right: 2px solid $color-main;
}

.footer-logo-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 2em;

    @include tablet {
        margin-bottom: 0;
    }

    img {
        width: 4em;
        margin-right: 2ch;
    }
}

.submit-message {
    margin: 2em 0;
    font-weight: 700;
}
</style>