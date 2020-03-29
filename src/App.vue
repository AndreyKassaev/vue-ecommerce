<template>
  <v-app>
    <TheSnackBar/>
    <TheNavbar/>
    <v-content class="maincontent">
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
    <TheFooter/>
  </v-app>
</template>

<script>
import TheNavbar from '@/components/TheNavbar/TheNavbar.vue'
import TheSnackBar from '@/components/TheSnackBar.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'App',

  components: {
    TheNavbar,
    TheSnackBar,
    TheFooter
  },
  
};
</script>
<style>
button {
    outline: none !important;
} 
.maincontent{
  background-color: #FAFAFA;
}

</style>
