<template>
    <Navlist class="SocialLinks" :items="socialLinks" />
</template>

<script>
import { ref } from 'vue'

import Navlist from './Navlist.vue'

export default {
    name: 'SocialLinks',
    components: {
        Navlist
    },
    setup () {
        const socialLinks = ref([
            {
                img: 'facebook.png',
                href: 'https://www.facebook.com/FacetheEarth'
            },
            {
                img: 'insta.png',
                href: 'https://www.instagram.com/facetheearth'
            },
            {
                img: 'youtube.png',
                href: 'https://www.youtube.com/channel/UCynYkCrwJCfNNLc7Z03yhKA/featured'
            },
            {
                img: 'spotify.png',
                href: 'https://open.spotify.com/artist/3B8dM8jspZ4ADCUXvVszi6'
            },
        ])

        return {
            socialLinks
        }
    }
}
</script>

<style>
</style>