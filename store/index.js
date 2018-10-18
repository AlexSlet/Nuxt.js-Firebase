import Vuex from 'vuex';
import axios from 'axios';
import Cookie from 'js-cookie'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: ''
        },
        mutations: {
            setPosts(state, posts){
                state.loadedPosts = posts
            },
            addPost(state, post){
                state.loadedPosts.push(post);
            },
            editPost(state, editedPost){
                const postIndex = state.loadedPosts.findIndex(
                    post => post.id === editedPost.id
                );
                state.loadedPosts[postIndex] = editedPost;
            },
            setToken(state, token){
                state.token = token;
            },
            clearToken(state){
                state.token = '';
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context){
               return axios.get('https://nuxt-blog-69de4.firebaseio.com/posts.json')
               .then(res => {
                   let postsArray = [];
                   for (let key in res.data){
                    postsArray.push({...res.data[key], id: key})
                   }
                   vuexContext.commit('setPosts', postsArray)
               })
               .catch(e => console.log(e));
            },
            setPosts(vuexContext, posts){
                vuexContext.commit('setPosts', posts)
            },
            editPost(vuexContext, post){
                let editedPost = {
                        author: post.author,
                        title: post.title,
                        content: post.content,
                        previewText: post.previewText,
                }
                return axios.put('https://nuxt-blog-69de4.firebaseio.com/posts/' + editedPost.id + '.json?auth='
                 + vuexContext.state.token, editedPost)
                .then(res => {
                    vuexContext.commit('editPost', editedPost)
                })
                .catch(e => console.log(e))
                
            },
            addPost(vuexContext, post){
                const createdPost = {
                        author: post.author,
                        title: post.title,
                        content: post.content,
                        previewText: post.previewText,
                        updatedDate: new Date()
                }
                console.log(post);
                return axios.post('https://nuxt-blog-69de4.firebaseio.com/posts.json?auth=' + vuexContext.state.token, createdPost)
                .then(result => {
                    vuexContext.commit('addPost', {...createdPost, id: result.data.name})
                    
                })
                .catch(e => console.log(e))
            },
            authUser(vuexContext, authData){
                let authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + process.env.fbAPIKey;
                if (!authData.isLogin){
                    authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.fbAPIKey;
                }
                return axios.post( authUrl, {
                        email: authData.email,
                        password: authData.pass,
                        returnSecureToken: true
                    })
                    .then(result => {
                        vuexContext.commit('setToken', result.data.idToken);
                        localStorage.setItem('token', result.data.idToken);
                        localStorage.setItem('tokenExparation', new Date().getTime() + +result.data.expiresIn * 1000);
                        Cookie.set('jwt', result.data.idToken);
                        Cookie.set('exparationDate', new Date().getTime() + +result.data.expiresIn * 1000);
                        return axios.post('http://localhost:3000/api/track-data', {data: 'Authenticated!'})
                    })
                    .catch(e => console.log(e))
            },
            initAuth(vuexContext, req){
                let token;
                let exparationDate;
                if(req){
                    if (!req.headers.cookie){
                        return;
                    }
                    const jwtCookie = req.headers.cookie
                    .split(';')
                    .find(c => c.trim().startsWith('jwt='));
                    if(!jwtCookie){
                        return;
                    }
                    token = jwtCookie.split('=')[1];
                    exparationDate = req.headers.cookie
                    .split(';')
                    .find(c => c.trim().startsWith('exparationDate='))
                    .split('=')[1];
                } else {
                    token = localStorage.getItem('token');
                    exparationDate = localStorage.getItem('tokenExparation');
                }

                if(new Date().getTime() > +exparationDate || !token){
                    console.log('No token or invalid token');
                    vuexContext.dispatch('logout');
                    return;
                }

                vuexContext.commit('setToken', token);
            },
            logout(vuexContext){
                vuexContext.commit('clearToken');
                Cookie.remove('jwt');
                Cookie.remove('exparationDate');
                if(process.client){
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenExparation'); 
                }
            }
        },
        getters: {
            loadedPosts(state){
                return state.loadedPosts;
            },
            isAuth(state){
                return state.token != '';
            }
        }
    })
}

export default createStore