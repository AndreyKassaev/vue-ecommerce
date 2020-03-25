<template>
<v-tooltip bottom>
        <template v-slot:activator="{ on }">
    <v-btn to="/add-product" fab small v-on="on" class="ml-2" light>
        <v-icon>
            mdi-image-plus
        </v-icon>
    </v-btn>
        </template>
        <span>Add Art</span>
</v-tooltip>
</template>
