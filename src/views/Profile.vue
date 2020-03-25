<template>
    <v-container>
        <h1>Edit Profile:</h1>
        <v-sheet
            tag="div"
            class="row ml-0 mr-0"
            elevation="6"
            width="100%"
            v-if="!!this.author"
        >
            <v-col cols="12" sm="6">
                <v-img class="bg" contain :src="this.author.image"></v-img>
            </v-col>

            <v-col cols="12" sm="6">
                <p class="mb-2 font-weight-bold title">
                    {{ this.author.name }}
                </p>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-textarea
                        v-model="bio"
                        :rules="bioRules"
                        label="bio"
                        counter="1000"
                    ></v-textarea>

                    <v-btn
                        width="100%"
                        :disabled="!valid"
                        dark
                        class="mr-4"
                        @click="validate"
                    >
                        Edit
                    </v-btn>
                </v-form>
            </v-col>
        </v-sheet>
    </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data: () => ({
        valid: true,
        bio: null,
        bioRules: [
            v => !!v || "Description is required",
            v =>
                (v && v.length <= 1000) ||
                "Description must be 1000 characters or less"
        ]
    }),
    mounted() {},
    created() {
        this.getSingleAuthor(this.$route.params.name);
    },
    watch: {
        author(newVal, oldVal) {
            if (newVal != oldVal || newVal === null) {
                this.initData();
            }
        }
    },
    computed: {
        ...mapGetters("TheAuthor", {
            author: "getSingleAuthor"
        })
    },
    methods: {
        ...mapActions("TheAuthor", {
            getSingleAuthor: "getSingleAuthor",
            editProfile: "editProfile"
        }),
        initData() {
            this.bio = this.author.bio;
        },
        validate() {
            if (this.$refs.form.validate()) {
                let formData = {
                    bio: this.bio,
                    id: this.author.id
                };
                this.editProfile(formData);
            }
        }
    }
};
</script>
<style></style>
