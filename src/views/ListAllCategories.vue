<template>
    <v-container>
        <div class="bc">
            <p class="my-2  display-2">
                Categories:
            </p>
        </div>
        <v-row>
            <v-col
                cols="12"
                sm="6"
                md="4"
                v-for="(category, index) in this.categories"
                :key="category.id"
            >
                <TheSingleCategory :category="category" />
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
import TheSingleCategory from "@/components/TheSingleCategory";

export default {
    data() {
        return {
            img: { src: require("@/assets/crying_pepe.png") },
            haveProductsBoolean: false
        };
    },
    components: {
        TheSingleCategory
    },
    computed: {
        ...mapGetters("TheCategory", {
            page: "getPage",
            pageCount: "getPageCount",
            categories: "getCategories"
        }),
        localPage: {
            get() {
                return this.page;
            },
            set(value) {
                this.mutatePage(value);
                this.getAllCategories();
            }
        }
    },
    watch: {
        categories(newVal, oldVal){
            if(newVal != oldVal || newVal === null){
                this.haveProducts()
            }
        }
    },
    methods: {
        ...mapActions("TheCategory", {
            getAllCategories: "getAllCategories"
        }),
        ...mapMutations("TheCategory", {
            mutatePage: "mutatePage"
        }),
        haveProducts(){
            try{
                if(this.categories.length != 0){
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
        this.getAllCategories();
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
