<template>
    <v-container>
        <div v-if="this.author === null">
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
                    :src="this.author.image"
                    height="500px"
                ></v-img>
            </v-col>

            <v-col cols="12" sm="6">
                <p class="mb-2 body-1">
                <span class="title">
                Author: 
                </span>
                    {{ this.author.name }}
                </p>
                <v-divider></v-divider>

                <p class="my-2 body-1">
                <span class="title">
                Bio: 
                </span>
                {{ this.author.bio }}
                </p>
            </v-col>
        </v-sheet>
        <div
            class="d-flex justify-space-between align-center bc mt-3"
            v-if="this.author != null"
        >
            <p class="my-2  display-1 hidden-sm-and-down">
                Art Of {{ this.author.name }}:
            </p>
            <p class="my-2  title d-none d-flex d-sm-flex d-md-none">
                Art Of {{ this.author.name }}:
            </p>
            <TheSelectedAuthorArtSortBy />
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
import TheSelectedAuthorArtSortBy from "@/components/TheSelectedAuthorArtSortBy";

export default {
    data() {
        return {
            img: { src: require("@/assets/crying_pepe.png") },
            haveProductsBoolean: false
        };
    },
    components: {
        TheSingleProduct,
        TheSelectedAuthorArtSortBy
    },
    computed: {
        ...mapGetters("TheAuthor", {
            author: "getSingleAuthor"
        }),
        ...mapGetters("TheProduct", {
            page: "getPage",
            pageCount: "getPageCount",
            products: "getSelectedAuthorProducts"
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
                this.getAllSelectedAuthorProducts(
                    (this.$route.params.name)
                );
            }
        },
    },
    watch: {
        products(newVal, oldVal){
            if(newVal != oldVal || newVal === null){
                this.haveProducts()
            }
        }
    },
    methods: {
        ...mapActions("TheAuthor", {
            getSingleAuthor: "getSingleAuthor"
        }),
        ...mapActions("TheProduct", {
            getAllSelectedAuthorProducts: "getAllSelectedAuthorProducts"
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
        this.mutatePage(1);
        this.getSingleAuthor(this.$route.params.name);
        this.getAllSelectedAuthorProducts(this.$route.params.name);
        this.haveProducts()
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
