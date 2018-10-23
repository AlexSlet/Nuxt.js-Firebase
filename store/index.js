import Vuex from 'vuex';
import axios from 'axios';
import Cookie from 'js-cookie';
import * as firebase from 'firebase';


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
                        imageUrl: post.imageUrl,
                        content: post.content,
                        previewText: post.previewText,
                }
                firebase.database().ref('posts/' + post.id).update(editedPost)
                .then(res => {
                    vuexContext.commit('editPost', editedPost)
                    console.log(post)
                })
                .catch(e => console.log(e))
                
            },
            addPost(vuexContext, post){
                let key
                let ext
                let imageUrl
                const storage = firebase.storage();
                const storageRef = firebase.storage().ref();
                const createdPost = {
                        author: post.author,
                        title: post.title,
                        content: post.content,
                        previewText: post.previewText,
                        updatedDate: new Date()
                }
                firebase.database().ref('posts').push(createdPost)
                .then(result => {
                    console.log(createdPost)
                    key = result.key
                    return key
                }).then(key => {
                    const filename = post.image.name
                    ext = filename.slice(filename.lastIndexOf('.'))
                    return storage.ref('postImage/' + key + ext).put(post.image)
                })
                .then((data) => {
                    return storageRef.child('postImage/' + key + ext).getDownloadURL()
                })
                .then(url => {
                    imageUrl = url
                    return firebase.database().ref('posts').child(key).update({imageUrl: imageUrl, updatedDate: new Date()})
                })
                .then(() => {
                    vuexContext.commit('addPost', {...createdPost, id: key, imageUrl: imageUrl})
                })
                .catch(e => console.log(e))
            },
            authUser(vuexContext, authData){
                if (!authData.isLogin){
                    firebase.auth().createUserWithEmailAndPassword(authData.email, authData.pass)
                    .then(result => {
                        vuexContext.commit('setToken', result.user.uid);
                        localStorage.setItem('token', result.user.uid);
                        Cookie.set('jwt', result.user.uid);
                    })
                    .catch(e => console.log(e))
                } else {
                    firebase.auth().signInWithEmailAndPassword(authData.email, authData.pass)
                    .then(result => {
                        vuexContext.commit('setToken', result.user.uid);
                        localStorage.setItem('token', result.user.uid);
                        Cookie.set('jwt', result.user.uid);
                    })
                    .catch(e => console.log(e))
                }
                    
            },
            initAuth(vuexContext, req){
                let token;
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
                } else {
                    token = localStorage.getItem('token');
                }

                vuexContext.commit('setToken', token);
            },
            logout(vuexContext){
                firebase.auth().signOut().then(() => {
                    console.log('LogOut')
                    vuexContext.commit('clearToken');
                Cookie.remove('jwt');
                if(process.client){
                    localStorage.removeItem('token');
                }
            })
            .catch(e => console.log(e))
                
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