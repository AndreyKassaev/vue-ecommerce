import api from "../api";
import axios from "axios";

export default {
    namespaced: true,
    state: {
        text: null,
       
    },

    getters: {
        getText(state){
            return state.text
        }
    },
    mutations: {
        mutateText(state, data){
            state.text = data
        },
        
    },
    actions: {
    
    }
};
