<template>
    <v-container>
        <div v-if="this.category === null">
            loading...
        </div>
        <v-sheet
            tag="div"
            class="row ml-0 mr-0"
            elevation="6"
            width="100%"
            v-else
        >
            <v-col cols="12" sm="6">
                <v-img
                    contain
                    :src="this.category.image"
                ></v-img>
            </v-col>

            <v-col cols="12" sm="6">
                <p class="mb-2 body-1">
                <span class="title">
                Category: 
                </span>
                    {{ this.category.title }}
                </p>
                <v-divider></v-divider>

                <p class="my-2 body-1">
                <span class="title">
                Description: 
                </span>
                {{ this.category.description }}</p>
            </v-col>
        </v-sheet>
        <div
            class="d-flex justify-space-between align-center bc mt-3"
            v-if="this.category != null"
        >
            <p class="my-2  display-1 hidden-sm-and-down">
                Art Of {{ this.category.title }} Category:
            </p>
            <p class="my-2  title d-none d-flex d-sm-flex d-md-none">
                Art Of {{ this.category.title }} Category:
            </p>
            <TheSelectedCategoryArtSortBy />
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
import TheSelectedCategoryArtSortBy from '@/components/TheSelectedCategoryArtSortBy'

export default {
    data() {
        return {
            img: { src: require("@/assets/crying_pepe.png") },
            haveProductsBoolean: false
        };
    },
    components: {
        TheSingleProduct,
        TheSelectedCategoryArtSortBy
    },
    computed: {
        ...mapGetters("TheCategory", {
            category: "getSingleCategory"
        }),
        ...mapGetters("TheProduct", {
            page: "getPage",
            pageCount: "getPageCount",
            products: "getSelectedCategoryProducts"
        }),
        localPage: {
            get() {
                return this.page;
            },
            set(value) {
                this.mutatePage(value);
                this.getAllSelectedCategoryProducts(
                    (this.$route.params.title)
                );
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
        ...mapActions("TheCategory", {
            getSingleCategory: "getSingleCategory"
        }),
        ...mapActions("TheProduct", {
            getAllSelectedCategoryProducts: "getAllSelectedCategoryProducts"
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
        this.getSingleCategory(this.$route.params.title);
        this.getAllSelectedCategoryProducts(this.$route.params.title);
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
.bc {
    border-top: 2px solid grey;
    border-bottom: 2px solid grey;
}
.notfoundimg{
    opacity: 0.05;
}
</style>
