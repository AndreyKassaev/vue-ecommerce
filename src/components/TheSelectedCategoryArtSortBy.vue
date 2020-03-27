<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on }">
            <v-btn class="ml-4" light v-on="on">
                Sort By
            </v-btn>
        </template>
        <v-list class="py-0">
            <v-list-item @click="onSort('price')">
                <v-list-item-title>price(low to high)</v-list-item-title>
                <v-icon right v-if="clickedOne">
                    mdi-check
                </v-icon>
            </v-list-item>
            <v-list-item @click="onSort('-price')">
                <v-list-item-title>price(high to low)</v-list-item-title>
                <v-icon right v-if="clickedTwo">
                    mdi-check
                </v-icon>
            </v-list-item>
        </v-list>
    </v-menu>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
export default {
    data() {
        return {
            clickedOne: false,
            clickedTwo: false
        };
    },
    methods: {
        ...mapMutations("TheProduct", {
            mutateOrderingType: "mutateOrderingType",
            mutatePage:"mutatePage"
        }),
        ...mapActions("TheProduct", {
            getAllSelectedCategoryProducts: "getAllSelectedCategoryProducts"
        }),
        onSort(data) {
            if (data === "price") {
                this.clickedOne = true;
                this.clickedTwo = false;
            } else if (data === "-price") {
                this.clickedOne = false;
                this.clickedTwo = true;
            }
            let firstPage = 1
            this.mutateOrderingType(data);
            this.mutatePage(firstPage)
            this.getAllSelectedCategoryProducts(this.$route.params.title);
        }
    }
};
</script>
<style>
.v-list-item:hover {
    background-color: #bdbdbd;
}
</style>
