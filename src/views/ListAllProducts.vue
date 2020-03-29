<template>
    <v-container>
        <div
            class="d-flex justify-space-between align-center bc"
        >
            <p class="my-2  display-1 hidden-sm-and-down">
                Art Gallery:
            </p>
            <p class="my-2  title d-none d-flex d-sm-flex d-md-none">
                Art Gallery:
            </p>
            <TheListAllProductsSortBy />
        </div>
        <v-row>
            
            <v-col
                v-for="(product, index) in this.products"
                :key="product.id"
                md="4"
                sm="6"
                cols="12"
            >
                <TheSingleProduct :product="product" />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-pagination
                    v-if="haveProductsBoolean"
                    v-model="localPage"
                    :length="this.pageCount"
                    circle
                ></v-pagination>
                <div v-else>
                    <h2 class="text-center">Nothing Found...</h2>
                    <v-img class="notfoundimg" contain height="440px" :src="img.src"></v-img>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import TheSingleProduct from "@/components/TheSingleProduct";
import TheListAllProductsSortBy from "@/components/TheListAllProductsSortBy";

export default {
    data() {
        return {
            img: { src: require("@/assets/crying_pepe.png") },
            haveProductsBoolean: false
        };
    },
    components: {
        TheSingleProduct,
        TheListAllProductsSortBy
    },
    computed: {
        ...mapGetters("TheProduct", {
            page: "getPage",
            pageCount: "getPageCount",
            products: "getProducts"
        }),
        localPage: {
            get() {
                return this.page;
            },
            set(value) {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
                this.mutatePage(value);
                this.getAllProducts();
            }
        }
    },
    watch: {
        products(newVal, oldVal){
            if(newVal != oldVal || newVal === null){
                this.haveProducts()
            }
        }
    },
    methods: {
        
        ...mapActions("TheProduct", {
            getAllProducts: "getAllProducts"
        }),
        ...mapMutations("TheProduct", {
            mutatePage: "mutatePage"
        }),
        haveProducts(){
            try{
                if(this.products.length != 0){
                    this.haveProductsBoolean = true
                }else{
                    this.haveProductsBoolean = false
                }
            }catch(err){
                this.haveProductsBoolean = false
            }
        }
    },
    mounted() {
        this.$vuetify.theme.themes.light.primary = "#212121";
        this.getAllProducts();
    }
};
</script>
<style scoped>
button {
    outline: none;
}

.v-pagination__item--active {
    background-color: #eceff1 !important;
    border-color: #eceff1 !important;
}
.notfoundimg {
    opacity: 0.05;
}
.bc {
    border-top: 2px solid grey;
    border-bottom: 2px solid grey;
}
</style>
