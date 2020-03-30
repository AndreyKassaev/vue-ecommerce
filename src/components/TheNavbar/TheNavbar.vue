<template>
    <div>
        <v-app-bar app dark dense>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title @click="onTitleClick" class="titlecursor hidden-sm-and-down">
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

            <TheAddProductButton v-if="user === 'author'" />
            <TheBecomeAnAuthorButton v-if="user === 'auth'" />
            <ThePaymentHistoryButton
                v-if="user === 'auth' || user === 'author'"
            />
            <TheLogoutIcon
                v-if="user === 'auth' || user === 'author'"
            />
            <TheLoginIcon v-if="user === 'anon'" />
            <TheCartIcon />
            <TheCartIconEmpty v-if="emptyCartIcon" />
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" temporary app>
            <v-list nav dense>
                <v-list-item-group active-class="dark--text text--accent-4">
                    <v-list-item
                        two-line
                        @click="onProfile"
                        v-if="user === 'author'"
                    >
                        <v-list-item-avatar>
                            <img :src="profileImage" />
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>
                                {{ profileName }}
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
                    <v-list-item to="/login" v-if="user === 'anon'">
                        <v-list-item-icon>
                            <v-icon>mdi-account-key</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Login</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/logout" v-if="user === 'auth' || user === 'author'">
                        <v-list-item-icon>
                            <v-icon>mdi-account-cancel</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Log Out</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/author" v-if="user === 'auth'">
                        <v-list-item-icon>
                            <v-icon>mdi-account-plus</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Become An Author</v-list-item-title>
                    </v-list-item>

                    <v-list-item
                        to="/payment-history"
                        v-if="user === 'auth' || user === 'author'"
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-credit-card-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Payment History</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/my-art" v-if="user === 'author'">
                        <v-list-item-icon>
                            <v-icon>mdi-image-search-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>My Art</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/add-product" v-if="user === 'author'">
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

import TheCartIcon from "./TheCartIcon.vue";
import TheCartIconEmpty from "./TheCartIconEmpty.vue";
import TheLogoutIcon from "./TheLogoutIcon.vue";
import TheLoginIcon from "./TheLoginIcon.vue";
import TheSearchButton from "./TheSearchButton.vue";
import TheBecomeAnAuthorButton from "./TheBecomeAnAuthorButton.vue";
import TheAddProductButton from "./TheAddProductButton.vue";
import ThePaymentHistoryButton from "./ThePaymentHistoryButton.vue";

export default {
    components: {
        TheCartIcon,
        TheCartIconEmpty,
        TheLogoutIcon,
        TheLoginIcon,
        TheSearchButton,
        TheBecomeAnAuthorButton,
        TheAddProductButton,
        ThePaymentHistoryButton
    },
    data() {
        return {
            drawer: false,
            user: null,
            profileImage: null,
            profileName: null,
            tokenArg: "token",
            profileArg: "profile",
            emptyCartIcon: true
        };
    },
    computed: {
        ...mapGetters("TheAuth", {
            token: "getToken",
            email: "getEmail"
        }),
        ...mapGetters("TheAuthor", {
            myProile: "getMyProfile"
        }),
        ...mapGetters("TheCart", {
            totalItems: "getTotalItems"
        })
    },
    watch: {
        token(newVal, oldVal) {
            if (newVal != oldVal) {
                this.whoIsItReactive(this.tokenArg);
            }
            if(newVal === null){
                this.whoIsIt()
            }
        },
        myProile(newVal, oldVal) {
            if (newVal != oldVal) {
                this.whoIsItReactive(this.profileArg);
            }
            if(newVal === null){
                this.whoIsIt()
            }
        },
        totalItems(newVal, oldVal) {
            if (newVal != null && newVal != 0) {
                this.emptyCartIcon = false;
            } else {
                this.emptyCartIcon = true;
            }
        }
    },
    methods: {
        
        ...mapActions("TheCart", {
            getTotalItems: "getTotalItems"
        }),

        onSearchEnter() {
            this.drawer = false;
        },

        onProfile() {
            if (this.$route.name != "Profile") {
                let name = localStorage.getItem("profileName");
                this.$router.push({ name: "Profile", params: { name: name } });
            }
        },
        whoIsIt() {
            if (localStorage.getItem("profileName")) {
                this.profileImage = localStorage.getItem("profileImage");
                this.profileName = localStorage.getItem("profileName");
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
        whoIsItReactive(data) {
            if (data === "token") {
                this.user = "auth";
            } else if (data === "profile") {
                this.profileImage = localStorage.getItem("profileImage");
                this.profileName = localStorage.getItem("profileName");
                this.user = "author";
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
        ...mapMutations("TheCart", {
            setTotalItems: "setTotalItems"
        }),
        ...mapMutations("TheSnackBar", {
            mutateText:"mutateText"
        }),
        ...mapActions("TheProduct", {
            getAllProducts: "getAllProducts"
        }),
        ...mapMutations("TheAuth",{
            mutateToken:"mutateToken"
        }),
    },
    mounted() {
        this.getTotalItems();
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
