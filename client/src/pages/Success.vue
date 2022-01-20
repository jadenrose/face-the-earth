<template>
    <div class="Success">
        <h1>Thank you!</h1>
        <p>
            We appreciate your business! Someone should be in contact very soon
            to gather additional details.
        </p>
        <p>
            Click here to
            <router-link to="/"
                ><strong>go back to the home page</strong></router-link
            >
        </p>
    </div>
</template>

<script>
export default {
    name: 'Success'
}
</script>

<style lang="scss">
.Success {
    padding: 18em 0;
    font-size: 140%;

    a {
        text-decoration: underline;
    }
}
</style>