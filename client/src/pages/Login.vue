<template>
    <Card>
        <Form>
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
</template>

<script>
export default {
    name: 'Login'
}
</script>

<style lang="scss">
.Card {
    max-width: 450px;
    margin: 0 auto;
}
</style>