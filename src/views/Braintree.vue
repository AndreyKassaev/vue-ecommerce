<template>
    <v-container>
        <v-row class="justify-center">
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>Don't Use Real Card Credentials</v-card-title>
                    <v-card-text>
                        <p class="subtitle-1">Try The Following:</p>
                        <p>
                            <span class="font-weight-bold">Card Number:</span>
                            4111 1111 1111 1111
                        </p>
                        <p>
                            <span class="font-weight-bold"
                                >Expiration Date:</span
                            >
                            12/21
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="justify-center">
            <v-col cols="12" md="6">
                <v-braintree
                    :authorization="this.clientToken"
                    @success="onSuccess"
                    @error="onError"
                >
                    <template v-slot:button="slotProps">
                        <v-btn
                            @click="slotProps.submit"
                            color="orange"
                            width="100%"
                            >Choose Payment Methods</v-btn
                        >
                    </template></v-braintree
                >
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import Vue from "vue";
import vuebraintree from "vue-braintree";

Vue.use(vuebraintree);

import { mapGetters, mapActions } from "vuex";
export default {
    methods: {
        ...mapActions("TheOrder", {
            createPaymentAction: "createPayment"
        }),
        onSuccess(payload) {
            let data = {
                nonce: payload.nonce,
                order_id: this.orderId
            };
            this.createPaymentAction(data);
        },
        onError(error) {
            let message = error.message;
            console.log(message);
        }
    },
    computed: {
        ...mapGetters("TheOrder", {
            clientToken: "getClientToken",
            orderId: "getOrderId"
        })
    }
};
</script>
