import Vue from 'vue'
import VueRouter from 'vue-router'
import ListAllProducts from '../views/ListAllProducts.vue'

Vue.use(VueRouter)

function guardMyroute(to, from, next)
{
 var isAuthenticated= false;
if(localStorage.getItem('authToken'))
  isAuthenticated = true;
 else
  isAuthenticated= false;
 if(isAuthenticated) 
 {
  next(); 
 } 
 else
 {
  next('/login'); 
 }
}
function guardPayment(to, from, next)
{
 var isAuthenticated= false;
if(localStorage.getItem('authToken') || localStorage.getItem('sid'))
  isAuthenticated = true;
 else
  isAuthenticated= false;
 if(isAuthenticated) 
 {
  next(); 
 } 
 else
 {
  next('/login'); 
 }
}

const routes = [
  {
    path: '/',
    name: 'ListAllProducts',
    component: ListAllProducts
  },
  {
    path: '*',
    name: 'Not Found',
    component: ListAllProducts
  },
  {
    path: '/login/:email?',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/logout/',
    beforeEnter : guardMyroute,
    name: 'Logout',
    component: () => import('../views/Logout.vue')
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/author',
    beforeEnter : guardMyroute,
    name: 'Author',
    component: () => import('../views/Author.vue')
  },
  {
    path: '/cart/:cart?',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/order',
    beforeEnter : guardPayment,
    name: 'Order',
    component: () => import('../views/Order.vue')
  },
  {
    path: '/payment',
    beforeEnter : guardPayment,
    name: 'Payment',
    component: () => import('../views/Braintree.vue')
  },
  {
    path: '/reset-password/api/v1/auth/reset/:uid/:token',
    name: 'Reset Password',
    component: () => import('../views/Resetpassword.vue')
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: () => import('../views/ForgotPassword.vue')
  },
  {
    path: '/details/:product_title',
    name: 'Product Details',
    component: () => import('../views/ProductDetails.vue')
  },
  {
    path: '/payment-history',
    beforeEnter : guardMyroute,
    name: 'Payment History',
    component: () => import('../views/Paymenthistory.vue')
  },
  {
    path: '/my-art',
    beforeEnter : guardMyroute,
    name: 'My Art',
    component: () => import('../views/Myart.vue')
  },
  {
    path: '/add-product/',
    beforeEnter : guardMyroute,
    name: 'Add Product',
    component: () => import('../views/AddProduct.vue')
  },
  {
    path: '/edit-art/:title',
    beforeEnter : guardMyroute,
    name: 'Edit Art',
    component: () => import('../views/Editart.vue')
  },
  {
    path: '/profile/:name?',
    beforeEnter : guardMyroute,
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/categories/',
    name: 'Categories',
    component: () => import('../views/ListAllCategories.vue')
  },
  {
    path: '/categories/:title',
    name: 'Selected Category',
    component: () => import('../views/SelectedCategory.vue')
  },
  {
    path: '/authors/',
    name: 'Authors',
    component: () => import('../views/ListAllAuthors.vue')
  },
  {
    path: '/authors/:name',
    name: 'Selected Author',
    component: () => import('../views/SelectedAuthor.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
