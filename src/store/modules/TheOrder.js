import api from "../api";
import axios from "axios";
import router from '../../router'

export default {
    namespaced: true,
    state: {
       clientToken:null,
       orderId:null
    },
    getters: {
        getClientToken(state){
            return state.clientToken
        },
        getOrderId(state){
            return state.orderId
        }
    },
    mutations: {
        setClientToken(state,data){
            state.clientToken = data
        },
        setOrderId(state,data){
            state.orderId = data
        }
    },
    actions: {
        createOrder({commit}, data){
            let customHeader = {};
            let sid = localStorage.getItem("sid");
            let authToken = localStorage.getItem("authToken");
            if (authToken) {
                customHeader = {
                    Authorization: `Token ${authToken}`
                };
            } else if (sid) {
                customHeader = {
                    'sessionid': `${sid}`
                };
            }
            axios.post(`${api.BASE_URI}order/create-order/`, data, {headers:customHeader})
                .then(res=>{
                    commit('setClientToken', res.data.client_token)
                    commit('setOrderId', res.data.order_id)
                    router.push({ path: "/payment" });
                    commit("TheSnackBar/mutateText", `${res.data.msg}`, {
                        root: true
                    });
                })
                .catch(err=>console.log(err))
        },
        createPayment({commit, dispatch}, data){
            axios.post(`${api.BASE_URI}order/payment/`, data)
                .then(res=>{
                    dispatch('TheCart/getTotalItems', {}, { root: true })
                    commit("TheSnackBar/mutateText", `${res.data.msg}`, {
                        root: true
                    });
                    router.push({ path: "/" });
                })
                .catch(err=>console.log(err))
        }
    }
};
