import Vue from 'vue'
import Vuex from 'vuex'

import TheProduct from './modules/TheProduct'
import TheCategory from './modules/TheCategory'
import TheAuthor from './modules/TheAuthor'
import TheAuth from './modules/TheAuth'
import TheSnackBar from './modules/TheSnackBar'
import TheCart from './modules/TheCart'
import TheOrder from './modules/TheOrder'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    TheProduct,
    TheCategory,
    TheAuthor,
    TheAuth,
    TheSnackBar,
    TheCart,
    TheOrder
  }
})
