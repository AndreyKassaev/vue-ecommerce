<template>
    <v-container>
        <v-row class="justify-center">
            <v-col cols="12" md="6" sm="6">
                <v-card>
                    <v-card-title>
                        <h2>
                            Enter Your Email:
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

                            <v-btn
                                color="success"
                                @click="validate"
                                width="100%"
                            >
                                Send Reset Link To Email
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
            email: "",

            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+\..+/.test(v) || "E-mail must be valid"
            ],
        };
    },

    methods: {
        ...mapActions( 'TheAuth',{
            submitForgotPasswordCredentials:'submitForgotPasswordCredentials'
        }),
        validate() {
            if (this.$refs.form.validate()) {
                this.submitForgotPasswordCredentials({
                    email: this.email
                })
            }
        }
    }
};
</script>
