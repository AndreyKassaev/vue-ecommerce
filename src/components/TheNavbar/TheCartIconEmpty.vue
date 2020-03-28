<template>
    <div>
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                    <v-btn
                        color="#FFB300"
                        to="/cart"
                        v-on="on"
                        fab
                        small
                        light
                        class="ml-2"
                    >
                        <v-icon>mdi-cart-outline</v-icon>
                    </v-btn>
            </template>
            <span>My Cart</span>
        </v-tooltip>
    </div>
</template>