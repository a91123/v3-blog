import { createStore, Commit } from 'vuex'
import axios from 'axios'
interface UsersProps {
    isLogin: boolean;
    name?: string;
    _id?: string;
    author?: string;
    column?: string;
}
export interface AuthorProps {
    avatar?: string;
    title?: string;
    description?: string;
    nickName?: string;
}
export interface PostProps {
    title: string;
    content?: string;
    image?: string;
    column?: string;
    author?: string;
    excerpt?: string;
    _key?: number;
}
export interface UserProps {
    isLogin: boolean;
    nickName?: string;
    _id?: string;
    column?: string;
    email?: string;
    avatar?: string;
    description?: string;
}
export interface PostDetailProps {
    author?: string;
    title?: string;
    _id?: string;
    _key?: number;
    excerpt?: string;
    content?: string;
    image?: string;
}
export interface ColumnProps {
    _id: string;
    title: string;
    avatar?: string;
    description: string;
    nickName: string;
    author?: string;
}
export interface GlobalDataProps {
    error: GlobalErrorProps;
    token: string;
    loading: boolean;
    columns: ColumnProps[];
    posts: PostProps[];
    user: UsersProps;
    Author: AuthorProps;
    postdetail: PostDetailProps;
}
export interface GlobalErrorProps {
    status: boolean;
    message?: string;
}
const getDataCommit = async (url: string, mutationsName: string, commit: Commit) => {
    const { data } = await axios.get(url)
    commit(mutationsName, data)
    return data
}
const PostCommit = async (url: string, mutationsName: string, commit: Commit, payload: any) => {
    const { data } = await axios.post(url, payload)
    commit(mutationsName, data)
    return data
}
const store = createStore<GlobalDataProps>({
    state: {
        error: { status: false },
        loading: false,
        columns: [],
        posts: [],
        user: { isLogin: false },
        Author: {},
        postdetail: {},
        token: localStorage.getItem('token') || ''
    },
    mutations: {
        setError (state, e: GlobalErrorProps) {
            state.error = e
        },
        login (state, data) {
            const token = data.token
            state.token = data.token
            localStorage.setItem('token', token)
            axios.defaults.headers.common.authorization = token
            state.error.status = false
        },
        logout (state) {
            state.token = ''
            state.user = { isLogin: false }
            localStorage.removeItem('token')
            delete axios.defaults.headers.common.authorization
        },
        fetchCurrentUser (state, data) {
            state.user = { isLogin: true, ...data }
            console.log(data)
        },
        createPost (state, newPost) {
            state.posts.push(newPost)
        },
        fetchPostDetail (state, data) {
            state.postdetail = data[0]
            console.log('state.postDetail', state.postdetail)
        },
        fetchColumns (state, data) {
            console.log(data, 555123)
            state.columns = data
        },
        fetchColumn (state, data) {
            state.posts = data.rows
        },
        fetchAuthor (state, data) {
            state.Author = data[0]
        },
        setLoading (state, stasus) {
            state.loading = stasus
        }
    },
    getters: {
        getAuthor: (state) => {
            return state.Author
        },
        getColumns: (state) => {
            return state.columns
        },
        getColumnById: (state) => {
            return state.posts
        }
    },
    actions: {
        fetchPostDetail ({ commit }, payload) {
            console.log(payload.key)
            return getDataCommit(`/post/${payload.id}/${payload.key}`, 'fetchPostDetail', commit)
        },
        fetchColumns ({ commit }) {
            return getDataCommit('/author', 'fetchColumns', commit)
        },
        fetchAuthor ({ commit }, cid) {
            return getDataCommit(`/author/${cid}`, 'fetchAuthor', commit)
        },
        fetchColumn ({ commit }, cid) {
            return getDataCommit(`/getdb/${cid}/post`, 'fetchColumn', commit)
        },
        login ({ commit }, payload) {
            return PostCommit('/user/login', 'login', commit, payload)
        },
        createPost ({ commit }, payload) {
            return PostCommit('/post', 'createPost', commit, payload)
        },
        fetchCurrentUser ({ commit }) {
            return getDataCommit('/user/current', 'fetchCurrentUser', commit)
        },
        loginAndFetch ({ dispatch }, loginData) {
            return dispatch('login', loginData).then(() => {
                return dispatch('fetchCurrentUser')
            })
        }
    }
})
export default store
