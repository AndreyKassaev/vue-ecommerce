<template>
    <v-container fill-height fluid>
        <v-row align="center" justify="center">
            <v-col>
                <v-card class="mx-auto" max-width="344">
                    <v-card-title>
                        <h2>
                            Reset Password
                        </h2>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                                v-model="new_password1"
                                :rules="passRules"
                                label="New Password"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="new_password2"
                                :rules="confRules"
                                label="Confirm Password"
                                required
                            ></v-text-field>

                            <v-btn
                                :disabled="!valid"
                                color="success"
                                @click="validate"
                                width="100%"
                            >
                                Reset Password
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data: function() {
        return {
            valid: false,
            new_password1: "",
            new_password2: "",
            uid: this.$route.params.uid,
            token: this.$route.params.token,

            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+\..+/.test(v) || "E-mail must be valid"
            ],
            passRules: [
                v => !!v || "Password is required",
                v =>
                    /[*@!#%&()^~{}]+/.test(v) ||
                    "Password must contain at least one non-word character",
                v =>
                    /(?=.{8,})/.test(v) ||
                    "Password must contain at least 8 characters",
                v =>
                    /\d{1}/.test(v) ||
                    "Password must contain at least one number"
            ],
            confRules: [
                v => !!v || "Confirm password is required",
                v => v === this.new_password1 || "Password must match"
            ]
        };
    },

    methods: {
        ...mapActions("TheAuth", {
            submitResetPasswordCredentials: "submitResetPasswordCredentials"
        }),
        validate() {
            if (this.$refs.form.validate()) {
                this.submitResetPasswordCredentials({
                    uid: this.uid,
                    token: this.token,
                    new_password1: this.new_password1,
                    new_password2: this.new_password2
                });
            }
        }
    }
};
</script>
