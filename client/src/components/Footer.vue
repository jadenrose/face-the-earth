<template>
    <footer class="Footer">
        <Container>
            <div class="footer-top">
                <div class="footer-logo-wrapper">
                    <FTE />
                    <Typography variant="h2">Face the Earth</Typography>
                </div>
                <SocialLinks />
            </div>
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
                    </div>
                </div>

                <div class="signup">
                    <Typography variant="p">
                        Sign up for our monthly newsletter and you'll be the
                        first to know about new music releases and merch drops!
                    </Typography>
                    <Form>
                        <FormGroup>
                            <FormControl type="email" label="email address" />
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
import { computed } from 'vue'

import FTE from './FTE.vue'
import SocialLinks from './SocialLinks.vue'
import RouterLinks from './RouterLinks.vue'

export default {
    name: "Footer",
    components: {
        FTE,
        SocialLinks,
        RouterLinks
    },
    setup () {
        const year = computed(() => new Date().getFullYear())

        return { year }
    }
}
</script>

<style lang="scss">
.Footer {
    background: $background-light;
    padding: 4em 0;

    .Container {
        max-width: unset;
    }

    .quick-links {
        text-align: left;
    }

    .RouterLinks {
        display: inline-block;
        margin: 0;
        padding: 0;

        a {
            padding: 0.5em 0;
            display: inline-block;

            .Typography {
                font-weight: $normal;
                text-transform: lowercase;
            }
        }
    }

    .SocialLinks {
        margin: 0;
    }

    cite {
        opacity: 0.7;
        margin-bottom: 1em;

        @include tablet {
            margin-bottom: 0;
        }
    }
}

.footer-top,
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

.footer-top,
.footer-middle {
    margin-bottom: 4em;
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
        flex: 0 1 40%;
        margin-bottom: 4em;

        .quick-links {
            margin-right: 4em;
        }
    }

    .info {
        text-align: left;

        ul {
            margin: 0;
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
        max-width: 50vw;
        margin: 0 auto;
        text-align: left;

        p {
            margin-bottom: 2em;
        }

        @include tablet {
            margin: 0;
        }
    }

    .FormGroup {
        justify-content: center;
        align-self: flex-start;
        max-width: 300px;
    }

    label {
        font-size: 0.8rem;
    }

    input[type="email"] {
        padding: 0.6em;
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
</style>