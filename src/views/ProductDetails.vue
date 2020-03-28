<template>
    <v-container>
        
            <v-row v-if="haveProductsBoolean" key="1" class="justify-center">
                <v-col cols="12" md="8">
                    <v-card class="mx-auto">
                        <v-img
                            class="white--text align-end"
                            :src="this.product.image"
                        >
                        </v-img>

                        <v-card-title class="display-1 font-weight-bold">{{
                            this.product.title
                        }}</v-card-title>
                        <v-card-text class="text--primary">
                            <div class="headline mb-4">
                                {{( this.product.price ).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}}$
                            </div>
                            <div class="title mb-4 ">
                                Author: 
                                <span class="orange--text titlecursor" @click="onAuthor">
                                {{ this.product.author }}
                                </span>
                            </div>
                            <div class="title mb-4">
                            Category: 
                            <span class="orange--text titlecursor" @click="onCategory">
                            
                                {{ this.product.categories[0].title }}
                            </span>
                            </div>
                            <div class="body-1">
                            <span class="title">
                            Description: 
                            </span>
                                {{ this.product.description }}
                            </div>
                        </v-card-text>

                        <v-card-actions class="pa-0">
                            <v-btn color="orange" block @click="onAddToCart(product.id)">
                                Add To Cart
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>

            
       
    </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data: function() {
        return {
            haveProductsBoolean: false
        };
    },
    watch: {
        product(newVal, oldVal) {
            if (newVal != oldVal || newVal === null) {
                this.haveProducts();
            }
        }
    },
    computed: {
        ...mapGetters("TheProduct", {
            product: "getSingleProduct"
        })
    },
    mounted() {
        this.getSingleProduct(this.$route.params.product_title);
    },
    methods: {
        onAuthor(){
            this.$router.push({name: 'Selected Author', params:{name: this.product.author }})
        },
        onCategory(){
            this.$router.push({name: 'Selected Category', params:{title: this.product.categories[0].title }})
        },
        ...mapActions("TheProduct", {
            getSingleProduct: "getSingleProduct",
        }),
        ...mapActions( 'TheCart',{
            addToCart: "addToCartOrIncreaseQuantity"
        }),
        onAddToCart(productId){
            this.addToCart(productId)
        },
        haveProducts() {
            try {
                if (this.product != 0) {
                    this.haveProductsBoolean = true;
                } else {
                    this.haveProductsBoolean = false;
                }
            } catch (err) {
                this.haveProductsBoolean = false;
            }
        }
    }
};
</script>
<style scoped>
.fade-enter-active {
    transition: opacity 0.5s;
}
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}
.titlecursor {
    cursor: pointer;
}
.titlecursor:hover {
    text-shadow: 0px 0px 8px rgba(255, 179, 0, 1);
}
</style>
