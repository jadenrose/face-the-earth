<template>
    <section class="Terms">
        <Container>
            <article class="preface">
                <Typography variant="h1">terms &amp; conditions</Typography>
                <Typography variant="p">
                    These terms and conditions (the "Terms and Conditions")
                    govern the use of <strong>facetheearth.ca</strong> (the
                    "Site"). This Site is owned and operated by Face the Earth.
                    This Site is a blog.
                </Typography>
                <Typography variant="p">
                    By using this Site, you indicate that you have read and
                    understand these Terms and Conditions and agree to abide by
                    them at all times.
                </Typography>
            </article>
            <article class="intellectual-property">
                <Typography variant="h2">Intellectual Property</Typography>
                <Typography variant="p">
                    All content published and made available on our Site is the
                    property of Face the Earth and the Site's creators. This
                    includes, but is not limited to images, text, logos,
                    documents, downloadable files and anything that contributes
                    to the composition of our Site.
                </Typography>
            </article>
            <article class="third-party">
                <Typography variant="h2"
                    >Third Party Goods and Services</Typography
                >
                <Typography variant="p">
                    Our Site may offer goods and services from third parties. We
                    cannot guarantee the quality or accuracy of goods and
                    services made available by third parties on our Site.
                </Typography>
            </article>
            <article class="liability">
                <Typography variant="h2">Limitation of Liability</Typography>
                <Typography variant="p">
                    Face the Earth and our directors, officers, agents,
                    employees, subsidiaries, and affiliates will not be liable
                    for any actions, claims, losses, damages, liabilities and
                    expenses including legal fees from your use of the Site.
                </Typography>
            </article>
            <article class="indemnity">
                <Typography variant="h2">Indemnity</Typography>
                <Typography variant="p">
                    Except where prohibited by law, by using this Site you
                    indemnify and hold harmless Face the Earth and our
                    directors, officers, agents, employees, subsidiaries, and
                    affiliates from any actions, claims, losses, damages,
                    liabilities and expenses including legal fees arising out of
                    your use of our Site or your violation of these Terms and
                    Conditions.
                </Typography>
            </article>
            <article class="applicable-law">
                <Typography variant="h2">Applicable Law</Typography>
                <Typography variant="p">
                    These Terms and Conditions are governed by the laws of the
                    Province of Alberta.
                </Typography>
            </article>
            <article class="severability">
                <Typography variant="h2">Severability</Typography>
                <Typography variant="p">
                    If at any time any of the provisions set forth in these
                    Terms and Conditions are found to be inconsistent or invalid
                    under applicable laws, those provisions will be deemed void
                    and will be removed from these Terms and Conditions. All
                    other provisions will not be affected by the removal and the
                    rest of these Terms and Conditions will still be considered
                    valid.
                </Typography>
            </article>
            <article class="changes">
                <Typography variant="h2">Changes</Typography>
                <Typography variant="p">
                    These Terms and Conditions may be amended from time to time
                    in order to maintain compliance with the law and to reflect
                    any changes to the way we operate our Site and the way we
                    expect users to behave on our Site. We will notify users by
                    email of changes to these Terms and Conditions or post a
                    notice on our Site.
                </Typography>
            </article>
            <article class="contact">
                <Typography variant="h2">Contact Details</Typography>
                <Typography variant="p">
                    Please contact us if you have any questions or concerns. Our
                    contact details are as follows:
                </Typography>

                <a href="mailto:info@facetheearth.ca">
                    <Typography variant="h5"> info@facetheearth.ca </Typography>
                </a>
            </article>
        </Container>
    </section>
</template>

<script>
export default {
    name: 'Terms'
}
</script>

<style lang="scss">
.Terms {
    margin-top: 6em;
    padding: 8em 0;

    article {
        margin-bottom: 4em;
    }

    .Typography {
        margin-bottom: 1em;

        &.h2 {
            font-size: 1.4rem;
        }
    }

    a {
        text-decoration: underline;

        .Typography {
            text-transform: unset;
        }
    }
}
</style>