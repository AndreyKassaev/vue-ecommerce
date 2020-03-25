<template>
 <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn to="/author" v-on="on" fab small class="ml-2" light>
                <v-icon>
                    mdi-account-plus
                </v-icon>
            </v-btn>
        </template>
        <span>Become An Author</span>
    </v-tooltip>
</template>

