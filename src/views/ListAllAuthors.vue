<template>
    <v-container>
        <div class="bc">
            <p class="my-2  display-2 hidden-sm-and-down">
                Authors:
            </p>
            <p class="my-1  title d-none d-flex d-sm-flex d-md-none">
                Authors:
            </p>
        </div>
        <v-row>
            <v-col
                cols="12"
                sm="6"
                md="4"
                v-for="(author, index) in this.authors"
                :key="author.id"
            >
                <TheSingleAuthor :author="author" />
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
                    <v-img
                        class="notfoundimg"
                        contain
                        height="440px"
                        :src="img.src"
                    ></v-img>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import TheSingleAuthor from "@/components/TheSingleAuthor";

export default {
    data() {
        return {
            img: { src: require("@/assets/crying_pepe.png") },
            haveProductsBoolean: false
        };
    },
    components: {
        TheSingleAuthor
    },
    computed: {
        ...mapGetters("TheAuthor", {
            page: "getPage",
            pageCount: "getPageCount",
            authors: "getAuthors"
        }),
        localPage: {
            get() {
                return this.page;
            },
            set(value) {
                this.mutatePage(value);
                this.getAllAuthors();
            }
        }
    },
    watch: {
        authors(newVal, oldVal) {
            if (newVal != oldVal || newVal === null) {
                this.haveProducts();
            }
        }
    },
    methods: {
        ...mapActions("TheAuthor", {
            getAllAuthors: "getAllAuthors"
        }),
        ...mapMutations("TheAuthor", {
            mutatePage: "mutatePage"
        }),
        haveProducts() {
            try {
                if (this.authors.length != 0) {
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
        this.$vuetify.theme.themes.light.primary = "#212121";
        this.getAllAuthors();
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
