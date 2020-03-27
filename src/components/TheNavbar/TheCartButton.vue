<template>
<div>
    
    <v-badge v-if="haveProductsBoolean" color="red" :content="this.totalItems" bordered overlap class="mr-2">
        <v-btn
            color="#FFB300"
            class="text-capitalize d-none d-sm-flex ml-2 black--text"
            to="/cart"
        >
            <span>
                My Cart
            </span>
            <v-icon right>mdi-cart-outline</v-icon>
        </v-btn>
    </v-badge>
   
        <v-btn v-else
            color="#FFB300"
            class="text-capitalize d-none d-sm-flex ml-2 black--text"
            to="/cart"
        >
            <span>
                My Cart
            </span>
            <v-icon right>mdi-cart-outline</v-icon>
        </v-btn>
</div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    data() {
        return {
            haveProductsBoolean: false
        }
    },
    methods: {
        ...mapActions('TheCart',{
            getTotalItems:'getTotalItems'
        }),
        haveProducts(){
            try{
                if(this.totalItems.length != 0){
                    this.haveProductsBoolean = true
                }else{
                    this.haveProductsBoolean = false
                }
            }catch(err){
                this.haveProductsBoolean = false
            }
        }
    },
    computed: {
        ...mapGetters('TheCart',{
            totalItems:'getTotalItems'
        })
    },
    mounted() {
        this.getTotalItems()
    },
    watch: {
        totalItems(newVal, oldVal){
            if(newVal != oldVal || newVal === null){
                this.haveProducts()
            }
        }
    },
}
</script>
