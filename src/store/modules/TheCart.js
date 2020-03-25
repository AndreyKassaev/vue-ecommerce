import api from "../api";
import axios from "axios";
import router from "../../router";

export default {
    namespaced: true,
    state: {
        totalItems: null,
        totalPrice: null,
        theCart: null,
        allCarts: null
    },
    getters: {
        getTotalItems(state) {
            return state.totalItems;
        },
        getTotalPrice(state) {
            return state.totalPrice;
        },
        getCart(state) {
            return state.theCart;
        },
        getAllCarts(state){
            return state.allCarts;
        }
    },
    mutations: {
        setTotalItems(state, data) {
            state.totalItems = data;
        },
        setTotalPrice(state, data) {
            state.totalPrice = data;
        },
        setCart(state, data) {
            state.theCart = data;
        },
        setAllCarts(state,data){
            state.allCarts = data;
        }
    },
    actions: {
        getAllCarts({commit}){
            let authToken = localStorage.getItem("authToken");
            let customHeader = {
                'Authorization': `Token ${authToken}`
            };
            axios.get(`${api.BASE_URI}cart/payment-history`, {headers: customHeader})
                .then(res=>{
                    commit('setAllCarts', res.data)
                })
                .catch(err=>console.log(err))
        },
        getTotalItems({ commit }) {
            let customHeader = {};
            let sid = localStorage.getItem("sid");
            let authToken = localStorage.getItem("authToken");
            if (authToken) {
                customHeader = {
                    Authorization: `Token ${authToken}`
                };
                axios
                    .get(`${api.BASE_URI}cart/cart-quantity`, {
                        headers: customHeader
                    })
                    .then(res => {
                        commit("setTotalItems", res.data.msg);
                    })
                    .catch(err => console.log(err));
            } else if (sid) {
                customHeader = {
                    sessionid: `${sid}`
                };
                axios
                    .get(`${api.BASE_URI}cart/cart-quantity`, {
                        headers: customHeader
                    })
                    .then(res => {
                        commit("setTotalItems", res.data.msg);
                    })
                    .catch(err => console.log(err));
            }
        },
        addToCartOrIncreaseQuantity({ commit, dispatch }, product_id) {
            let customHeader = {};
            let sid = localStorage.getItem("sid");
            let authToken = localStorage.getItem("authToken");
            if (authToken) {
                customHeader = {
                    Authorization: `Token ${authToken}`
                };
            } else if (sid) {
                customHeader = {
                    sessionid: `${sid}`
                };
            }

            axios
                .get(`${api.BASE_URI}cart/add-to-cart/${product_id}/`, {
                    headers: customHeader
                })
                .then(res => {
                    if (!sid) {
                        localStorage.setItem("sid", res.data.sid);
                    }
                    
                    commit(
                        "TheSnackBar/mutateText",
                        `${res.data.msg
                            .split(" ")
                            .slice(2)
                            .join(" ")}`,
                        { root: true }
                    );
                    dispatch("TheCart/getTotalItems", {}, { root: true });
                    dispatch("TheCart/getTotalPrice", {}, { root: true });
                    dispatch("TheCart/getCart", {}, { root: true });
                })
                .catch(err => console.log(err));
        },
        removeFromCartOrDecreaseQuantity({ commit, dispatch }, product_id) {
            let customHeader = {};
            let sid = localStorage.getItem("sid");
            let authToken = localStorage.getItem("authToken");
            if (authToken) {
                customHeader = {
                    Authorization: `Token ${authToken}`
                };
            } else if (sid) {
                customHeader = {
                    sessionid: `${sid}`
                };
            }

            axios
                .get(`${api.BASE_URI}cart/remove-from-cart/${product_id}/`, {
                    headers: customHeader
                })
                .then(res => {
                    if (res.data.msg === "Product Removed From Cart") {
                        commit("TheSnackBar/mutateText", `${res.data.msg}`, {
                            root: true
                        });
                    } else {
                        commit(
                            "TheSnackBar/mutateText",
                            `${res.data.msg
                                .split(" ")
                                .slice(2)
                                .join(" ")}`,
                            { root: true }
                        );
                    }
                    dispatch("TheCart/getTotalItems", {}, { root: true });
                    dispatch("TheCart/getTotalPrice", {}, { root: true });
                    dispatch("TheCart/getCart", {}, { root: true });
                })
                .catch(err => console.log(err));
        },
        getCart({ commit }) {
            let customHeader = {};
            let sid = localStorage.getItem("sid");
            let authToken = localStorage.getItem("authToken");
            if (authToken) {
                customHeader = {
                    Authorization: `Token ${authToken}`
                };
                axios
                    .get(`${api.BASE_URI}cart/get-cart`, {
                        headers: customHeader
                    })
                    .then(res => {
                        commit("setCart", res.data.cart);
                    })
                    .catch(err => console.log(err));
            } else if (sid) {
                customHeader = {
                    sessionid: `${sid}`
                };
                axios
                    .get(`${api.BASE_URI}cart/get-cart`, {
                        headers: customHeader
                    })
                    .then(res => {
                        commit("setCart", res.data.cart);
                    })
                    .catch(err => console.log(err));
            }
        },
        getTotalPrice({ commit }) {
            let customHeader = {};
            let sid = localStorage.getItem("sid");
            let authToken = localStorage.getItem("authToken");
            if (authToken) {
                customHeader = {
                    Authorization: `Token ${authToken}`
                };
                axios
                    .get(`${api.BASE_URI}cart/cart-total-price`, {
                        headers: customHeader
                    })
                    .then(res => {
                        commit("setTotalPrice", res.data.price);
                    })
                    .catch(err => console.log(err));
            } else if (sid) {
                customHeader = {
                    sessionid: `${sid}`
                };
                axios
                    .get(`${api.BASE_URI}cart/cart-total-price`, {
                        headers: customHeader
                    })
                    .then(res => {
                        commit("setTotalPrice", res.data.price);
                    })
                    .catch(err => console.log(err));
            }
        },
        removeFromCart({ commit, dispatch }, productId) {
            let customHeader = {};
            let sid = localStorage.getItem("sid");
            let authToken = localStorage.getItem("authToken");
            if (authToken) {
                customHeader = {
                    Authorization: `Token ${authToken}`
                };
            } else if (sid) {
                customHeader = {
                    sessionid: `${sid}`
                };
            }

            axios
                .get(`${api.BASE_URI}cart/remove-item/${productId}/`, {
                    headers: customHeader
                })
                .then(res => {
                    commit("TheSnackBar/mutateText", `${res.data.msg}`, {
                        root: true
                    });
                    dispatch("TheCart/getTotalItems", {}, { root: true });
                    dispatch("TheCart/getTotalPrice", {}, { root: true });
                    dispatch("TheCart/getCart", {}, { root: true });
                })
                .catch(err => console.log(err));
        }
    }
};
