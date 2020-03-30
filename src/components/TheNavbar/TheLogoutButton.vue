<template>
    <v-btn @click="onLogout" class="ml-2" light>
        Logout
        <v-icon right>
            mdi-account-cancel
        </v-icon>
    </v-btn>
</template>
<script>
export default {
    methods: {
        goToLogout(){
            if(this.$route.name != "Logout"){
                this.$router.push('/logout')
            }
        },
    },
}

</script>