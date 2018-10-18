<template>
    <div class="admin-post-page">
        <section class="update-form">
            <admin-post-form :post="loadedPost" @submit="onSubmitted"/>
        </section>
    </div>
</template>
<script>
import AdminPostForm from '~/components/Admin/AdminPostForm'
import axios from 'axios'

export default {
    layout: 'admin',
    middleware: ['check-auth','auth'],
    components: {
        AdminPostForm
    },
    asyncData(context){
        return axios.get('https://nuxt-blog-69de4.firebaseio.com/posts/' + context.params.postId + '.json')
        .then(res => {
            return {
                loadedPost: {...res.data, id: context.params.postId }
            }
        })
        .catch(e => context.error(e)
        )
    },
    methods: {
        onSubmitted(editedPost){
            this.$store.dispatch('editPost', editedPost)
            .then(() => {
                this.$router.push('/admin');
            })
        }
    }
}
</script>
<style>
.update-form{
    width: 50%;
    margin: 0 auto;
}
</style>
