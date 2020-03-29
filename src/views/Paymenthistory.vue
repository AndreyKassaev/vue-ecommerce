<template>
    <v-container>
        <v-row >
            <v-col cols="12" v-if="haveProductsBoolean">
                <ThePaymentTable :items="this.allCarts"/>
            </v-col>
            <v-col v-else>
                <h2 class="text-center">Your Payment History Is Empty...</h2>
                    <v-img class="notfoundimg" contain height="440px" :src="img.src"></v-img>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ThePaymentTable from '@/components/ThePaymentTable'

export default {
  components:{
    ThePaymentTable
  },
    computed: {
        ...mapGetters("TheCart", {
            allCarts: "getAllCarts"
        })
    },
    watch: {
        allCarts(newVal, oldVal) {
            if (newVal != oldVal || newVal === null) {
                this.displayOrNot();
            }
        }
    },
    methods: {
        
        ...mapActions("TheCart", {
            getAllCarts: "getAllCarts"
        }),
        displayOrNot(){
            try{
                if(this.allCarts.length > 1){
                    this.haveProductsBoolean = true
                }else{
                    if(this.allCarts[0].items.length != 0){
                        this.haveProductsBoolean = true
                    }else{
                        this.haveProductsBoolean = false
                    }
                }
            }catch (err) {
                this.haveProductsBoolean = false
            }
        },
    },
    
    
    mounted() {
        this.getAllCarts();
    },
    data() {
        return {
            haveProductsBoolean: false,
            img: { src: require("@/assets/crying_pepe.png") }
        };
    }
};
</script>
<style scoped>
.notfoundimg{
    opacity: 0.05;
}
</style>
