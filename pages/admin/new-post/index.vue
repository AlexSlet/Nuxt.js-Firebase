<template>
    <div class="admin-new-post-page container">
        <section class="new-post-form">
            <admin-post-form @submit="onSubmitted"/>
        </section>
    </div>
</template>
<script>
import axios from 'axios';
import AdminPostForm from '~/components/Admin/AdminPostForm';
 
export default {
    layout: 'admin',
    middleware: ['check-auth','auth'],
    components: {
        AdminPostForm
    },
    methods: {
        onSubmitted(postData){
            this.$store.dispatch('addPost', postData)
            .then(() => {
                this.$router.push('/admin');
            })
        }
    }
}
</script>
<style scoped>

.container{
    max-width: 1200px;
    margin: 0 auto;
}
.new-post-form{
    display: flex;
    justify-content: center;
}
form{
    width: 50%;
}

</style>
