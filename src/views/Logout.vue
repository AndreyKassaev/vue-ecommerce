<template>
    <v-container>
        <v-row class="justify-center">
            <v-col  cols="12" md="6" sm="6">
                <v-card>
                    <v-card-title>
                        Are you sure?
                    </v-card-title>
                    <v-card-actions @click="onLogoutIcon">
                        <v-btn color="success" block>
                            Logout
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import {mapMutations} from 'vuex'

export default {
    methods: {
        ...mapMutations("TheSnackBar", {
            mutateText:"mutateText"
        }),
        ...mapMutations("TheAuth",{
            mutateToken:"mutateToken"
        }),
        ...mapMutations("TheCart", {
            setTotalItems: "setTotalItems"
        }),
          onLogoutIcon() {
            localStorage.clear()
            this.$router.push("/")
            this.mutateToken(null)
            this.setTotalItems(0);
            this.mutateText("Logged Out")
        }

    },
}
</script>