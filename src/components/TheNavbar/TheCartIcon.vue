<template>
    <div>
        <v-tooltip bottom v-if="haveProductsBoolean">
            <template v-slot:activator="{ on }">
                <v-badge
                    color="red"
                    :content="this.totalItems"
                    bordered
                    overlap
                    class="mr-4"
                >
                    <v-btn
                        color="#FFB300"
                        to="/cart"
                        v-on="on"
                        fab
                        small
                        class="ml-2"
                        light
                    >
                        <v-icon>mdi-cart-outline</v-icon>
                    </v-btn>
                </v-badge>
            </template>
            <span>My Cart</span>
        </v-tooltip>

        <v-tooltip bottom v-else>
            <template v-slot:activator="{ on }">
                <v-btn
                    color="#FFB300"
                    to="/cart"
                    v-on="on"
                    fab
                    small
                    class="ml-2"
                    light
                >
                    <v-icon>mdi-cart-outline</v-icon>
                </v-btn>
            </template>
            <span>My Cart</span>
        </v-tooltip>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            haveProductsBoolean: false
        };
    },
    methods: {
        ...mapActions("TheCart", {
            getTotalItems: "getTotalItems"
        }),
        haveProducts() {
            try {
                if (this.totalItems.length != 0) {
                    this.haveProductsBoolean = true;
                } else {
                    this.haveProductsBoolean = false;
                }
            } catch (err) {
                this.haveProductsBoolean = false;
            }
        }
    },
    computed: {
        ...mapGetters("TheCart", {
            totalItems: "getTotalItems"
        })
    },
    mounted() {
        this.getTotalItems();
    },
    watch: {
        totalItems(newVal, oldVal) {
            if (newVal != oldVal || newVal === null) {
                this.haveProducts();
            }
        }
    }
};
</script>
