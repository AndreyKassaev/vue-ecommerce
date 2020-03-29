<template>
 <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn @click="onLogout" v-on="on" fab small class="ml-2 d-none d-flex d-sm-flex d-md-none" light >
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
        onLogout(){
            localStorage.clear()
            this.$emit('logOut')
        }
    },
}
</script>