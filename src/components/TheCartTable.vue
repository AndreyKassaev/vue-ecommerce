<template>
    <v-card class="mx-auto " elevation="24">
        <v-card-text>
            <v-simple-table >
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left title font-weight-bold">
                            <div class="d-flex align-center">
                                <p>
                                Art_
                                </p>
                                
                                <p>
                                Item
                                </p>
                            </div>
                            </th>
                            <th class="text-left title font-weight-bold">
                                Price
                            </th>
                            <th class="text-left title font-weight-bold">
                                Quantity
                            </th>
                            <th class="text-left title font-weight-bold">
                              <div class="d-flex align-center">
                                <p>
                                Total_
                                </p>
                                
                                <p>
                                Price
                                </p>
                            </div>
                            </th>
                            <th v-if="items.is_active" class="text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in items.items" :key="index">
                            <td
                                class="font-weight-medium subtitle-1 pt"
                                @click="productDetail(item)"
                            >
                                {{
                                    item
                                        .split(" ")
                                        .slice(4)
                                        .join(" ")
                                }}
                            </td>
                            <td>
                            {{ item.split(" ")[1] }}$
                            </td>
                            <td>
                            <div class="d-flex">
                            
                                <v-icon
                                    v-if="items.is_active"
                                    left
                                    @click="decreaseQuantity(item)"
                                >
                                    mdi-minus
                                </v-icon>
                                {{ item.split(" ")[2] }}
                                <v-icon
                                    v-if="items.is_active"
                                    right
                                    @click="increaseQuantity(item)"
                                >
                                    mdi-plus
                                </v-icon>
                            </div>
                            </td>

                            <td>
                                {{ item.split(" ")[1] * item.split(" ")[2] }}
                            </td>
                            <td v-if="items.is_active">
                                <v-icon
                                    color="red"
                                    large
                                    @click="removeItem(item)"
                                >
                                    mdi-close-circle
                                </v-icon>
                            </td>
                        </tr>
                        <tr></tr>
                    </tbody>
                </template>
            </v-simple-table>
            <p class="text-right display-1 mt-4 mb-0 ult">
                Total:
                <strong color="black--text">{{ items.total_price }}$</strong>
            </p>
        </v-card-text>
        <v-card-actions v-if="items.is_active" class="pa-0">
            <v-btn color="orange" width="100%" to="/order">
                Checkout
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
    props: ["items"],
    methods: {
        ...mapActions("TheCart", {
            addToCart: "addToCartOrIncreaseQuantity",
            minusQuantity: "removeFromCartOrDecreaseQuantity",
            removeItemAction: "removeFromCart"
        }),
        decreaseQuantity(item) {
            if (!!this.$route.params.cart) {
                this.$router.push({ name: "Cart" });
            }

            let productId = item.split(" ")[0];
            this.minusQuantity(productId);
        },
        increaseQuantity(item) {
            if (!!this.$route.params.cart) {
                this.$router.push({ name: "Cart" });
            }
            let productId = item.split(" ")[0];
            this.addToCart(productId);
        },
        removeItem(item) {
            if (!!this.$route.params.cart) {
                this.$router.push({ name: "Cart" });
            }

            let productId = item.split(" ")[0];
            this.removeItemAction(productId);
        },
        productDetail(item) {
            let productTitle = item
                .split(" ")
                .slice(4)
                .join(" ");
            this.$router.push({
                name: "Product Details",
                params: { product_title: productTitle }
            });
        }
    },
    computed: {},
    data() {
        return {};
    },
    mounted() {}
};
</script>
<style scoped>
.ult {
    text-decoration: underline;
}
.pt:hover {
    cursor: pointer;
}
.v-application p {
    margin-bottom: 0px !important; 
}
</style>
