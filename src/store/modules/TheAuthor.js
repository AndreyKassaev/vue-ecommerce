import api from "../api";
import axios from "axios";
import router from "../../router";

export default {
    namespaced: true,
    state: {
        authors: [],
        page: 1,
        pageCount: null,
        singleAuthor: null,
        myProfile: null
    },
    getters: {
        getAuthors(state) {
            return state.authors;
        },
        getPage(state) {
            return state.page;
        },
        getPageCount(state) {
            return state.pageCount;
        },
        getSingleAuthor(state) {
            return state.singleAuthor;
        },
        getMyProfile(state) {
            return state.myProfile;
        }
    },
    mutations: {
        mutateAuthors(state, data) {
            state.authors = data.results;
            let numberOfPages = Math.ceil(data.count / 6);
            state.pageCount = numberOfPages;
        },
        mutatePage(state, data) {
            state.page = data;
        },
        mutateSingleAuthor(state, data) {
            state.singleAuthor = data;
        },
        setMyProfile(state, data) {
            state.myProfile = data;
        }
    },
    actions: {
        getAllAuthors({ commit, state }) {
            axios
                .get(`${api.BASE_URI}auth/authors-list/?page=${state.page}`)
                .then(res => {
                    commit("mutateAuthors", res.data);
                })
                .catch(err => console.log(err));
        },
        getSingleAuthor({ commit, state }, name) {
            axios
                .get(`${api.BASE_URI}auth/single-author/${name}`)
                .then(res => {
                    commit("mutateSingleAuthor", res.data);
                })
                .catch(err => console.log(err));
        },
        becomeAnAuthor({ commit }, data) {
            let authToken = localStorage.getItem("authToken");
            let customHeader = {
                Authorization: `Token ${authToken}`
            };
            axios
                .get(`${api.BASE_URI}auth/validate-name/${data.name}`)
                .then(res => {
                    if (!res.data) {
                        axios
                            .post(
                                `${api.BASE_URI}auth/become-an-author/`,
                                data.dataToPost,
                                {
                                    headers: customHeader
                                }
                            )
                            .then(res => {
                                commit("setMyProfile", res.data);
                                commit(
                                    "TheSnackBar/mutateText",
                                    `You Are An Author Now, ${res.data.name}`,
                                    { root: true }
                                );
                                localStorage.setItem(
                                    "profileImage",
                                    res.data.image
                                );
                                localStorage.setItem(
                                    "profileName",
                                    res.data.name
                                );
                                router.push({ path: "/" });
                            })
                            .catch(err => console.log(err));
                    } else {
                        commit(
                            "TheSnackBar/mutateText",
                            `Name ${data.name} Already In Use`,
                            { root: true }
                        );
                    }
                })
                .catch(err => console.log(err));
        },
        editProfile({ commit }, data) {
            let authToken = localStorage.getItem("authToken");
            let customHeader = {
                Authorization: `Token ${authToken}`
            };
            let postData = {
                bio: data.bio
            };
            axios
                .patch(
                    `${api.BASE_URI}auth/update-profile/${data.id}`,
                    postData,
                    {
                        headers: customHeader
                    }
                )
                .then(res => {
                    commit("TheSnackBar/mutateText", "Profile Updated", {
                        root: true
                    });
                })
                .catch(err => console.log(err));
        }
    }
};
