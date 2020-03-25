<template>
    <v-container fill-height fluid>
        <v-row align="center" justify="center">
            <v-col>
                <v-card class="mx-auto" max-width="344">
                    <v-card-title>
                        <h2>
                            Sign Up
                        </h2>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="password1"
                                :rules="passRules"
                                label="Password"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="password2"
                                :rules="confRules"
                                label="Confirm Password"
                                required
                            ></v-text-field>

                            <v-btn
                                :disabled="!valid"
                                color="success"
                                width="50%"
                                @click="validate"
                            >
                                Register
                            </v-btn>

                            <v-btn width="50%" to="/login">
                                Login
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
            valid: true,
            email: null,
            password1: null,
            password2: null,

            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+\..+/.test(v) || "E-mail must be valid"
            ],
            passRules: [
                v => !!v || "Password is required",
                v =>
                    /[*@$!#%&()^~{},.:;<>-_?'"]+/.test(v) ||
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
                v => v === this.password1 || "Password must match"
            ]
        };
    },

    methods: {
        ...mapActions("TheAuth", {
            submitSignUpCredentials: "submitSignUpCredentials"
        }),
        validate() {
            if (this.$refs.form.validate()) {
                this.submitSignUpCredentials({
                    email: this.email,
                    password1: this.password1,
                    password2: this.password2
                })
            }
        }
    }
};
</script>
