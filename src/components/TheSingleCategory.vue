<template>
    
        <v-hover v-slot:default="{ hover }">
            <v-card
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
                :to="{ name: 'Selected Category', params: { title: category.title } }"
            >
                <v-img contain class="white--text align-end" :src="category.image">
                    <v-card-title class="text-shadow display-2">{{
                        category.title
                    }}</v-card-title>
                </v-img>

                <v-card-actions class="pa-0">
                    <v-btn color="orange" width="100%">
                        Select Category
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-hover>
</template>
<script>
export default {
    props: ["category"],

    data: function() {
        return {};
    }
};
</script>
<style>
.fade-enter-active {
    transition: opacity 1s ease;
}
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}
.text-shadow {
    text-shadow: 3px 1px 5px rgba(0, 0, 0, 0.7);
}
.v-card {
    transition: opacity;
}

.v-card:not(.on-hover) {
    opacity: 1;
}
</style>
