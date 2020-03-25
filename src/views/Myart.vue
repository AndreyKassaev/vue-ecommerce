<template>
    <v-container>
        <v-row >
            <v-col cols="12" v-if="haveProductsBoolean">
                <TheArtTable :items="this.myArt"/>
            </v-col>
            <v-col v-else>
                <h2 class="text-center">You Have No Art Yet...</h2>
                    <v-img class="notfoundimg" contain height="440px" :src="img.src"></v-img>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TheArtTable from '@/components/TheArtTable'

export default {
  components:{
    TheArtTable
  },
    computed: {
        ...mapGetters("TheProduct", {
            myArt: "getMyArt"
        })
    },
    watch: {
        myArt(newVal, oldVal) {
            if (newVal != oldVal || newVal === null || oldVal === null) {
                this.haveProducts();
            }
        }
    },
    methods: {
        
        ...mapActions("TheProduct", {
            getAllMyArt: "getAllMyArt"
        }),
        haveProducts() {
            try {
                if (!!this.myArt && this.myArt.length > 0) {
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
        this.getAllMyArt();
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
