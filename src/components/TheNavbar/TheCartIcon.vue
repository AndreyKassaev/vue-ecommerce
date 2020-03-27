<template>
    <div>
        <v-tooltip bottom v-if="haveProductsBoolean">
            <template v-slot:activator="{ on }">
                <v-badge
                    color="red"
                    :content="badgeContent"
                    bordered
                    overlap
                    class="mr-2 mt-2"
                >
                    <v-icon class="ml-2" @click="onIcon" v-on="on">mdi-cart-outline</v-icon>
                </v-badge>
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
            haveProductsBoolean: false,
            badgeContent: null
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
                    this.badgeContent = this.totalItems;
                } else {
                    this.haveProductsBoolean = false;
                }
            } catch (err) {
                this.haveProductsBoolean = false;
            }
        },
        onIcon(){
            if(this.$route.name != "cart"){
                this.$router.push("/cart")
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
