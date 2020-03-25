<template>
    <div class="text-center">
        <v-snackbar
            v-model="snackbar"
            top
            multi-line
            :timeout="time"
        >
            <span class="title">
                {{ text }}
            </span>
            <v-btn color="black--text" @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </div>
</template>
<script>
export default {
    data: () => ({
        snackbar: false,
        text: "",
        time: 1500
    }),

    created: function() {
        this.$store.watch(
            state => state.TheSnackBar.text,
            () => {
                const text = this.$store.state.TheSnackBar.text;
                if (text !== "") {
                    this.snackbar = true;
                    this.text = this.$store.state.TheSnackBar.text;
                    this.$store.commit("TheSnackBar/mutateText", "");
                }
                
            }
        );
    }
};
</script>
<style scoped>
  .v-btn{
    height: 100px !important;
    background-color: #FFB300 !important;
    border: 1px solid black
  }
</style>