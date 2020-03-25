import api from "../api";
import axios from "axios";
import router from "../../router";

export default {
    namespaced: true,
    state: {
        token: null,
        email: null
    },
    getters: {
        getToken(state) {
            return state.token;
        },
        getEmail(state) {
            return state.email;
        }
    },
    mutations: {
        mutateToken(state, data) {
            state.token = data;
        },
        mutateEmail(state, data) {
            state.email = data;
        }
    },
    actions: {
        areYouAuthor({ commit }) {
            let authToken = localStorage.getItem("authToken");
            let customHeader = {
                Authorization: `Token ${authToken}`
            };
            axios
                .get(`${api.BASE_URI}auth/are-you-author/`, {
                    headers: customHeader
                })
                .then(res => {
                    localStorage.setItem("authorImage", res.data.image);
                    localStorage.setItem("authorName", res.data.name);
                    commit("TheAuthor/setMyProfile", res.data, { root: true });
                })
                .catch(err => console.log(err));
        },
        submitSignUpCredentials({ commit, state }, credentials) {
            let customHeader = {};
            let sid = localStorage.getItem("sid");
            if (sid) {
                customHeader = {
                    sessionid: `${sid}`
                };
            }
            axios
                .get(`${api.BASE_URI}auth/validate-email/${credentials.email}`)
                .then(res => {
                    if (!res.data) {
                        axios
                            .post(
                                `${api.BASE_URI}auth/rest-auth/registration/`,
                                credentials,
                                { headers: customHeader }
                            )
                            .then(res => {
                                localStorage.clear();
                                commit("mutateToken", res.data.key);
                                localStorage.setItem("authToken", res.data.key);
                                commit(
                                    "TheSnackBar/mutateText",
                                    `Successfully Signed Up with ${credentials.email}. 
                                `,
                                    { root: true }
                                );
                                
                                router.push({ path: "/" });
                            })
                            .catch(err => {
                                commit(
                                    "TheSnackBar/mutateText",
                                    "Wrong Credentials",
                                    { root: true }
                                );
                                console.log(`store error ${err}`);
                            });
                    } else {
                        commit(
                            "TheSnackBar/mutateText",
                            "Email Already In Use",
                            { root: true }
                        );
                    }
                })
                .catch(err => console.log(err));
        },
        submitSignInCredentials({ commit, state }, credentials) {
            let customHeader = {};
            let sid = localStorage.getItem("sid");
            if (sid) {
                customHeader = {
                    sessionid: `${sid}`
                };
            }
            axios
                .post(`${api.BASE_URI}auth/rest-auth/login/`, credentials, {
                    headers: customHeader
                })
                .then(res => {
                    axios
                        .get(`${api.BASE_URI}auth/are-you-author/`, {
                            headers: customHeader
                        })
                        .then(res => {
                            if(res.data){
                                localStorage.setItem("profileImage", res.data.image);
                                localStorage.setItem("profileName", res.data.name);
                                commit("TheAuthor/setMyProfile", res.data, {
                                    root: true
                                });
                            }
                        })
                        .catch(err => console.log(err));
                            
                    commit("mutateToken", res.data.key);
                    localStorage.setItem("authToken", res.data.key);
                    commit(
                        "TheSnackBar/mutateText",
                        `Successfully Signed In With ${credentials.email}`,
                        { root: true }
                    );
                    router.push({ path: "/" });
                })
                .catch(err => {
                    commit("TheSnackBar/mutateText", "Wrong Credentials", {
                        root: true
                    });
                    console.log(`store error ${err}`);
                });
        },
        submitForgotPasswordCredentials({ commit, state }, credentials) {
            axios
                .get(`${api.BASE_URI}auth/validate-email/${credentials.email}`)
                .then(res => {
                    if (res.data) {
                        axios
                            .post(
                                `${api.BASE_URI}auth/rest-auth/password/reset/`,
                                credentials
                            )
                            .then(res => {
                                commit("mutateEmail", credentials.email);
                                localStorage.setItem("email", state.email);
                                commit(
                                    "TheSnackBar/mutateText",
                                    `Check Inbox Of ${credentials.email}`,
                                    { root: true }
                                );
                                router.push({ path: "/" });
                            })
                            .catch(err => {
                                commit(
                                    "TheSnackBar/mutateText",
                                    "Wrong Credentials",
                                    { root: true }
                                );
                                console.log(`store error ${err}`);
                            });
                    } else {
                        commit("TheSnackBar/mutateText", "Email Not Found", {
                            root: true
                        });
                    }
                })
                .catch(err => console.log(err));
        },
        submitResetPasswordCredentials({ commit, state }, credentials) {
            axios
                .post(
                    `${api.BASE_URI}auth/rest-auth/password/reset/confirm/`,
                    credentials
                )
                .then(res => {
                    commit(
                        "TheSnackBar/mutateText",
                        `Password Reset Successfully For ${localStorage.email}`,
                        { root: true }
                    );
                    router.push({
                        name: "Login",
                        params: { email: localStorage.email }
                    });
                    localStorage.removeItem("email");
                })
                .catch(err => {
                    commit("TheSnackBar/mutateText", "Wrong Credentials", {
                        root: true
                    });
                    console.log(`store error ${err}`);
                });
        }
    }
};
