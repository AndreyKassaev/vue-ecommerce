<template>
    <div>
        <v-text-field
            color="dark"
            placeholder="Search..."
            hide-details
            outlined
            dense
            append-icon="mdi-magnify"
            v-model="searchInput"
        ></v-text-field>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
    computed: {
        ...mapGetters("TheProduct", {
            searchValue: "getSearchValue"
        }),
        searchInput: {
            get() {
                return this.searchValue;
            },
            set(value) {
                this.mutatePage(1)
                this.mutateSearchValue(value);
                this.getAllProducts()
                if(this.$router.currentRoute.name != 'ListAllProducts'){
                    this.$router.push({name:'ListAllProducts'});
                }
            }
        }
    },
    methods: {
        ...mapMutations("TheProduct", {
            mutateSearchValue: "mutateSearchValue",
            mutatePage: 'mutatePage'
        }),
        ...mapActions('TheProduct',{
            getAllProducts:'getAllProducts'
        })
    }
};
</script>
