<template >
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn to="/payment-history" v-on="on" fab small class="ml-2" light>
                <v-icon>
                    mdi-credit-card-outline
                </v-icon>
            </v-btn>
        </template>
        <span>Payment History</span>
    </v-tooltip>
</template>
 
