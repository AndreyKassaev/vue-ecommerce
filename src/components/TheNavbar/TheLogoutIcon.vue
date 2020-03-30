<template>
 <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn @click="goToLogout" v-on="on" fab small class="ml-2" light >
                <v-icon>
                    mdi-account-cancel
                </v-icon>
            </v-btn>
        </template>
        <span>Log Out</span>
    </v-tooltip>
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