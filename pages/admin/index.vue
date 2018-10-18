<template>
    <div class="admin-page">
        <section class="new-post">
            <AppButton @click="$router.push('/admin/new-post')" class="">Create Post</AppButton>
            <AppButton @click="onLogout" class="">Logout</AppButton>
        </section>
        <section class="existing-posts">
            <h2>Existing post</h2>
            <post-list :posts="loadedPosts" isAdmin/>
        </section>
    </div>
</template>
<script>

export default {
  middleware: ['check-auth','auth'],
  computed: {
    loadedPosts(){
      return this.$store.getters.loadedPosts
    }
  },
  methods: {
    onLogout(){
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  }
}
</script>
<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h2 {
  text-align: center;
}
</style>
