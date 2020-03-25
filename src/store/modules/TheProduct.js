import api from "../api";
import axios from "axios";
import router from "../../router";

export default {
    namespaced: true,
    state: {
        products: [],
        page: 1,
        pageCount: null,
        orderingType: "date_created",
        searchValue: "",
        selectedAuthorProducts: null,
        selectedCategoryProducts: null,
        singleProduct: null,
        myArt: null
    },
    getters: {
        getProducts(state) {
            return state.products;
        },
        getPage(state) {
            return state.page;
        },
        getPageCount(state) {
            return state.pageCount;
        },
        getSearchValue(state) {
            return state.searchValue;
        },
        getSelectedAuthorProducts(state) {
            return state.selectedAuthorProducts;
        },
        getSelectedCategoryProducts(state) {
            return state.selectedCategoryProducts;
        },
        getSingleProduct(state) {
            return state.singleProduct;
        },
        getMyArt(state){
            return state.myArt
        }
    },
    mutations: {
        mutateProducts(state, data) {
            state.products = data.results;
            state.pageCount = data.count;
        },
        mutatePage(state, data) {
            state.page = data;
        },
        mutateOrderingType(state, data) {
            state.orderingType = data;
        },
        mutateSearchValue(state, data) {
            state.searchValue = data;
        },
        mutateSelectedAuthorProducts(state, data) {
            state.selectedAuthorProducts = data.results;
            state.pageCount = data.count;
        },
        mutateSelectedCategoryProducts(state, data) {
            state.selectedCategoryProducts = data.results;
            state.pageCount = data.count;
        },
        mutateSingleProduct(state, data) {
            state.singleProduct = data;
        },
        setMyArt(state, data){
            state.myArt = data
        }
    },
    actions: {
        getAllProducts({ commit, state }) {
            axios
                .get(
                    `${api.BASE_URI}product/list/?search=${state.searchValue}&ordering=${state.orderingType}&page=${state.page}`
                )
                .then(res => {
                    commit("mutateProducts", res.data);
                })
                .catch(err => console.log(err));
        },
        getAllSelectedAuthorProducts({ commit, state }, name) {
            axios
                .get(
                    `${api.BASE_URI}product/list/author/${name}/?ordering=${state.orderingType}&page=${state.page}`
                )
                .then(res => {
                    commit("mutateSelectedAuthorProducts", res.data);
                })
                .catch(err => console.log(err));
        },
        getAllSelectedCategoryProducts({ commit, state }, title) {
            axios
                .get(
                    `${api.BASE_URI}product/list/category/${title}/?ordering=${state.orderingType}&page=${state.page}`
                )
                .then(res => {
                    commit("mutateSelectedCategoryProducts", res.data);
                })
                .catch(err => console.log(err));
        },
        getSingleProduct({ commit }, product_title) {
            axios
                .get(`${api.BASE_URI}product/detail/${product_title}`)
                .then(res => {
                    commit("mutateSingleProduct", res.data);
                })
                .catch(err => console.log(err));
        },
        productTitleUniqueCheck() {
            axios
                .get(`${api.BASE_URI}product/title-unique/`)
                .then(res => {
                    if (res.data) {

                    } else {
                        commit("TheSnackBar/mutateText", "This Art Title Already In Use", {
                            root: true
                        });
                    }
                })
                .catch(err => console.log(err));
        },
        createProduct({ commit }, obj) {
            axios
                .get(`${api.BASE_URI}product/title-unique/${obj.title}`)
                .then(res => {
                    if (!res.data) {
                        let authToken = localStorage.getItem("authToken");
                        let customHeader = {
                            Authorization: `Token ${authToken}`
                        };
            
                        axios
                            .post(`${api.BASE_URI}product/create/`, obj.data, {
                                headers: customHeader
                            })
                            .then(res => {
                                commit("TheSnackBar/mutateText", "Art Published", {
                                    root: true
                                });
                                router.push({ path: "/" });
                            })
                            .catch(err => console.log(err));
                    } else {
                        commit("TheSnackBar/mutateText", "This Art Title Already In Use", {
                            root: true
                        });
                    }
                })
                .catch(err => console.log(err));
        },
        getAllMyArt({commit}){
            let authToken = localStorage.getItem("authToken");
            let customHeader = {
                Authorization: `Token ${authToken}`
            };
            axios.get(`${api.BASE_URI}product/my-art/`, {headers:customHeader})
                .then(res=>{
                    commit('setMyArt', res.data)
                })
                .catch(err=>console.log(err))
        },
        editArt({commit}, data){
            let authToken = localStorage.getItem("authToken");
            let customHeader = {
                Authorization: `Token ${authToken}`
            };
            let postData = {
                price: data.price,
                description: data.description
            }
            axios.patch(`${api.BASE_URI}product/update/${data.id}/`, postData, {headers:customHeader})
                .then(res=>{
                    commit("TheSnackBar/mutateText", "Art Is Updated", {
                        root: true
                    });
                })
                .catch(err=>console.log(err))
        }
    }
};
