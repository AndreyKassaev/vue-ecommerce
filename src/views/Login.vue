<template>
    <v-container>
        <v-row class="justify-center">
            <v-col cols="12" md="6" sm="6">
                <v-card>
                    <v-card-title>
                        <h2>
                            Login
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
                                v-model="password"
                                :rules="passRules"
                                label="Password"
                                required
                            ></v-text-field>

                            <v-btn
                                :disabled="!valid"
                                color="success"
                                @click="validate"
                                width="50%"
                            >
                                Login
                            </v-btn>

                            <v-btn to="/signup" width="50%">
                                Sign Up
                            </v-btn>

                            <v-btn
                                class="mt-4"
                                to="/forgot-password"
                                width="100%"
                            >
                                Forgot Password?
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
            email: this.$route.params.email || null,
            password: null,

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
            ]
        };
    },

    methods: {
        ...mapActions( 'TheAuth',{
            submitSignInCredentials:'submitSignInCredentials',
        }),
        
        validate() {
            if (this.$refs.form.validate()) {
                this.submitSignInCredentials({
                    email: this.email,
                    password: this.password
                })
            }
        }
    }
};
</script>
