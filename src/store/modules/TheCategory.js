import api from "../api";
import axios from "axios";

export default {
    namespaced: true,
    state: {
        categories:[],
        page: 1,
        pageCount: null,
        singleCategory: null
    },
    getters: {
        getCategories(state){
            return state.categories
        },
        getPage(state){
            return state.page
        },
        getPageCount(state){
            return state.pageCount
        },
        getSingleCategory(state){
            return state.singleCategory
        }
    },
    mutations: {
        mutateCategories(state, data){
            state.categories = data.results
            let numberOfPages = Math.ceil(data.count/6)
            state.pageCount = numberOfPages;
            
        },
        setAllCategoriesNoPagination(state, data){
            let categoriesArray = []
            for(let i = 0; i < data.length; i++){
                categoriesArray.push(data[i].title)
            }
            state.categories = categoriesArray
        },
        mutatePage(state,data){
            state.page = data
        },
        mutateSingleCategory(state, data){
            state.singleCategory = data
        }
    },
    actions: {
        getAllCategories({commit,state}){
            axios.get(`${api.BASE_URI}product/categories-list/?page=${state.page}`)
                .then(res=>{
                    commit('mutateCategories', res.data)
                })
                .catch(err=>console.log(err))
        },
        getAllCategoriesNoPagination({commit}){
            axios.get(`${api.BASE_URI}product/categories-list-no-pagination/`)
                .then(res=>{
                    commit('setAllCategoriesNoPagination', res.data)
                })
                .catch(err=>console.log(err))
        },
        getSingleCategory({commit,state}, title){
            axios.get(`${api.BASE_URI}product/single-category/${title}/`)
                .then(res=>{
                    commit('mutateSingleCategory', res.data)
                })
                .catch(err=>console.log(err))
        }
    }
};
