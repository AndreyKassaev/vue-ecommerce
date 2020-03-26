<template>
    <div>
        <v-app-bar app dark>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title @click="onTitleClick">
                Fictional
                <span class="font-weight-light">
                    Online
                </span>
                Art Shop
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <TheSearchButton class="hidden-sm-and-down" />
            <v-btn class="ml-2 hidden-sm-and-down" light to="/authors">
                Authors
            </v-btn>
            <v-btn class="ml-2 hidden-sm-and-down" light to="/categories">
                Categories
            </v-btn>
            <ThePaymentHistoryButton
                v-if="
                    this.token != null || user === 'auth' || user === 'author'
                "
                class="hidden-sm-and-down"
            />
            <TheBecomeAnAuthorButton
                v-if="this.token != null || user === 'auth'"
                class="hidden-sm-and-down"
            />
           
            <TheAddProductButton
                v-if="this.myProile != null || user === 'author'"
                class="hidden-sm-and-down"
            />
            <TheLoginButton
                v-if="this.token === null && user === 'anon'"
                class="hidden-sm-and-down"
            />
            <TheCartButton class="hidden-sm-and-down" />
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" temporary app>
            <v-list nav dense>
                <v-list-item-group active-class="dark--text text--accent-4">
                    <v-list-item two-line @click="onProfile" v-if="this.myProile != null || user === 'author'">
                        <v-list-item-avatar>
                            <img
                                :src="profileImage"
                            />
                        </v-list-item-avatar>

                        <v-list-item-content >
                            <v-list-item-title 
                            v-if="this.myProile != null || user === 'author'">
                            {{profileName }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list-item class="px-0">
                        <TheSearchButton @keyup.enter.native="onSearchEnter" />
                    </v-list-item>

                    <v-list-item to="/">
                        <v-list-item-icon>
                            <v-icon>mdi-image-multiple</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Gallery</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/categories">
                        <v-list-item-icon>
                            <v-icon>mdi-image-multiple</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Categories</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/authors">
                        <v-list-item-icon>
                            <v-icon>mdi-image-multiple</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Authors</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/cart">
                        <v-list-item-icon>
                            <v-icon>mdi-cart-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>My Cart</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/login" v-if="this.token === null && user === 'anon'">
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Login</v-list-item-title>
                    </v-list-item>

                    <v-list-item
                        to="/author"
                        v-if="this.token != null || user === 'auth'"
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-account-plus</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Become An Author</v-list-item-title>
                    </v-list-item>

                    <v-list-item
                        to="/payment-history"
                        v-if="
                            this.token != null ||
                                user === 'auth' ||
                                user === 'author'
                        "
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-credit-card-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Payment History</v-list-item-title>
                    </v-list-item>

                    <v-list-item
                        to="/my-art"
                        v-if="this.myProile != null || user === 'author'"
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-image-search-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>My Art</v-list-item-title>
                    </v-list-item>

                    <v-list-item
                        to="/add-product"
                        v-if="this.myProile != null || user === 'author'"
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-image-plus</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Add Art</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

import TheCartButton from "./TheCartButton.vue";
import TheLoginButton from "./TheLoginButton.vue";
import TheSearchButton from "./TheSearchButton.vue";
import TheBecomeAnAuthorButton from "./TheBecomeAnAuthorButton.vue";
import TheAddProductButton from "./TheAddProductButton.vue";
import ThePaymentHistoryButton from "./ThePaymentHistoryButton.vue";

export default {
    components: {
        TheCartButton,
        TheLoginButton,
        TheSearchButton,
        TheBecomeAnAuthorButton,
        TheAddProductButton,
        ThePaymentHistoryButton
    },
    data() {
        return {
            drawer: false,
            user: null,
            profileImage: localStorage.getItem('profileImage'),
            profileName: localStorage.getItem('profileName')
        };
    },
    computed: {
        ...mapGetters("TheAuth", {
            token: "getToken",
            email: "getEmail"
        }),
        ...mapGetters("TheAuthor", {
            myProile: "getMyProfile"
        })
    },
    methods: {
       
        onSearchEnter() {
            this.drawer = false;
        },
        onProfile(){
            if (this.$route.name != "Profile") {
                let name = localStorage.getItem('profileName')
                this.$router.push({name: 'Profile', params:{name:name}})
            }
        },
        whoIsIt() {
            if (localStorage.getItem("profileName")) {
                this.user = "author";
            } else if (
                localStorage.getItem("authToken") &&
                localStorage.getItem("profileName") === null
            ) {
                this.user = "auth";
            } else {
                this.user = "anon";
            }
        },
        onTitleClick() {
            if (this.$route.name != "ListAllProducts") {
                this.$router.push({ name: "ListAllProducts" });
            }
            this.searchValue("");
            this.getAllProducts();
        },
        ...mapMutations("TheProduct", {
            searchValue: "mutateSearchValue"
        }),
        ...mapActions("TheProduct", {
            getAllProducts: "getAllProducts"
        })
    },
    mounted() {
        this.whoIsIt();
    }
};
</script>

<style>
div .rl {
    text-decoration: none;
    cursor: pointer;
}
a {
    text-decoration: none;
    color: black !important;
}
.titlecursor {
    cursor: pointer;
}
.titlecursor:hover {
    text-shadow: 0px 0px 8px rgba(255, 179, 0, 1);
}
</style>
