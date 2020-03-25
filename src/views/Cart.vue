<template>
    <v-container>
        <v-row>
            <v-col cols="12" v-if="haveProductsBoolean">
                <TheCartTable
                    :items="
                        typeof this.$route.params.cart === 'undefined'
                            ? this.cart
                            : unhashedCart
                    "
                />
            </v-col>
            <v-col v-else>
                <h2 class="text-center">Your Cart Is Empty...</h2>
                <v-img
                    class="notfoundimg"
                    contain
                    height="440px"
                    :src="img.src"
                ></v-img>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TheCartTable from "@/components/TheCartTable";

export default {
    components: {
        TheCartTable
    },
    computed: {
        ...mapGetters("TheCart", {
            cart: "getCart"
        })
    },
    watch: {
        cart(newVal, oldVal) {
            if (newVal != oldVal || newVal === null) {
                this.haveProducts();
            }
        }
    },
    methods: {
        ...mapActions("TheCart", {
            getCart: "getCart"
        }),
        unhashParams() {
            if (typeof this.$route.params.cart != "undefined") {
                this.unhashedCart = JSON.parse(atob(this.$route.params.cart));
            }
        },
        haveProducts() {
            try {
                if (this.cart.items.length > 0 || !!this.unhashedCart) {
                    this.haveProductsBoolean = true;
                } else {
                    this.haveProductsBoolean = false;
                }
            } catch (err) {
                this.haveProductsBoolean = false;
            }
        }
    },

    mounted() {
        this.unhashParams();
        this.getCart();
    },
    data() {
        return {
            haveProductsBoolean: false,
            img: { src: require("@/assets/crying_pepe.png") },
            unhashedCart: null
        };
    }
};
</script>
<style scoped>
.notfoundimg {
    opacity: 0.05;
}
</style>
